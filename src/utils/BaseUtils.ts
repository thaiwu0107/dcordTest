import { BigNumber } from 'bignumber.js';
import * as crypto from 'crypto';
import * as findUp from 'find-up';
import * as _ from 'lodash';
import * as moment from 'moment';
import { BaseConstant } from '../config/BaseConstant';
import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
import { IString } from '../models/IContext';
import { LibsExceptions } from '../models/LibsExceptions';

export type F = (data: any) => any;
export type A = any[] | any;
interface IClass {
    /**
     * Returns the name of the function. Function names are read-only and can not be changed.
     */
    readonly name: string;
}
export default class GamaUtils {
    // NOTE:一個Loop => 造array順序,一個Fun執行再執行一個Fun
    // NOTE:結果會是造array順序出來
    /* istanbul ignore next */
    public static async loopSyncAsyncFun<T>(array: any[], asyncFun: F): Promise<T[]> {
        const newArray: T[] = [];
        for (const adata of array) {
            const getData = await asyncFun(adata);
            newArray.push(getData);
        }
        return newArray;
    }
    // NOTE:一個Loop => 不造array順序,所有Fun同時併發執行
    // NOTE:結果會是不造array順序出來
    /* istanbul ignore next */
    public static async loopAsyncAsyncFun<T>(array: any[], asyncFun: F): Promise<T[]> {
        return Promise.all(array.map(async (aData) => {
            return asyncFun(aData);
        }));
    }

    /**
     * 尋找檔案位子
     * @static
     * @param {any} fileName 檔案名稱
     * @param {any} filedir 沒有指定就是預設'sqlTemplate/  底下'
     * @param {any} [filePath] 真實檔案位子可能為libs或是src/dist等等使用的位子
     * @returns 真正檔案的位子
     * @memberof Utils
     */
    public static async getPath(fileName, filedir?, filePath?) {
        const toFiledir = _.isUndefined(filedir) ? 'sqlTemplate/' : filedir;
        return findUp(toFiledir + fileName, {
            cwd: _.isUndefined(filePath) ? __filename : filePath
        });
    }
    public static isNumber(x: any): x is number {
        return typeof x === 'number';
    }
    public static isString(x: any): x is string {
        return typeof x === 'string';
    }
    /**
     * 併發處理
     * @param {(Array<Promise<any>> | Array<Promise<any[]>>)} arrayPromise 可以塞一起併發的Promise
     * @returns 一起解決的(Array<Promise<any>> | Array<Promise<any[]>>)
     * @memberof Utils
     */
    /* istanbul ignore next */
    public static async AsyncAll(arrayPromise: Array<Promise<A>>): Promise<A> {
        return Promise.all(arrayPromise);
    }
    public static BuffArrayToBase64(data: any) {
        return new Buffer(data, 'binary').toString('base64');
    }
    public static Base64ToBuffArray(data: any) {
        return new Buffer(data, 'base64');
    }
    public static SQLBinary(data: any) {
        return new Buffer(data, 'binary');
    }
    public static EmptyBase64ToBuffArray() {
        return new Buffer(' ');
    }
    public static EmptyBuffArrayToBase64() {
        return BaseConstant.NO_IMAGE;
    }
    /**
     * 解析物件陣列，將物件內all value組成以空白組成字串
     * 再將上述之字串以逗號相連接
     * @param any[]
     * @returns string
     * @memberof Utils
     */
    public static objToString(objs: any[]) {
        return _.join(_.map(objs, (obj: any) => {
            return _.join(_.values(obj), ' ');
        }), ',');
    }
    /**
     * memberId to MemberSerial And SectionSerial
     * @param string
     * @returns string
     * @memberof Utils
     */
    public static MemberIdToMemberSerialAndSectionSerial(memberId: IString | string) {
        if (_.size(memberId) !== 8) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'MemberId Size Must to be 8');
        }
        const sMemberId = _.toString(memberId);
        const memberSerial = sMemberId.slice(-6);
        const sectionSerial = _.replace(sMemberId, memberSerial, '');
        return {
            memberSerial,
            sectionSerial
        };
    }
    /**
     * Validate string
     * @param string
     * @returns string
     * @memberof Utils
     */
    public static validateString(value: any, paramName: string) {
        if (_.isUndefined(value) || _.isString(value)) {
            return value as any;
        } else {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate number
     * @param number
     * @returns number
     * @memberof Utils
     */
    public static validateNumber(value: any, paramName: string) {
        if (_.isNaN(value)) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                this.constructor.name + ' : data format error, field: ' + paramName);
        } else if (_.isNumber(value)) {
            return value as any;
        } else if (_.isUndefined(value)) {
            return undefined as any;
        } else {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate boolean
     * @param boolean
     * @returns boolean
     * @memberof Utils
     */
    public static validateBoolean(value: any, paramName: string) {
        if (_.isBoolean(value)) {
            return value as any;
        } else if (_.isUndefined(value)) {
            return undefined as any;
        } else {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate Date
     * @param Date
     * @returns Date
     * @memberof Utils
     */
    public static validateDate(value: any, paramName: string) {
        const momentObj = moment(value, moment.ISO_8601, true);
        if (momentObj.isValid()) {
            return momentObj.toDate();
        } else if (_.isUndefined(value)) {
            return undefined as any;
        } else {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    public static resultMessage(msg: string) {
        return { message: msg };
    }
    public static DBTimeFormat(time: Date | string) {
        return moment(time).format(BaseConstant.DB_TIME_FORMAT);
    }
    public static DateTimeFormat(time: Date | string) {
        return moment(time).format(BaseConstant.DATE_TIME_FORMAT);
    }
    public static PDFTimeFormat(time: Date | string | number) {
        return moment(time).format(BaseConstant.PDF_TIME_FORMAT);
    }
    public static BirthdayTimeFormat(time: Date | string) {
        return moment(time).format(BaseConstant.BIRTHDAY_TIME_FORMAT);
    }
    public static PDFHoursTimeFormat(time: Date | string) {
        return moment(time).format(BaseConstant.PDF_HOURS_TIME_FORMAT);
    }
    public static TakeFirstOrEmpty(anyThing: any[]) {
        return anyThing[0] || {};
    }
    public static GetCheckSum(sASCIICardSerial: string) {
        const stringArray = _.map(sASCIICardSerial, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'Have To All Number In Strings');
        });
        if (_.size(stringArray) !== 12) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'Have To Equal 12 size');
        }
        const iSum = _.reduce(stringArray, (sum, n) => {
            return n + sum;
        }, 0);
        const iRemainder = iSum % 10;
        return iRemainder === 0 ? 0 : (10 - iRemainder);
    }
    public static toASCIICodeArray(toASCII: string) {
        return _.map(toASCII, (char) => {
            return char.charCodeAt(0);
        });
    }
    public static toASCIICodeString(toASCII: string) {
        return this.JoinArray(this.toASCIICodeArray(toASCII));
    }
    public static fromASCIICodeArray(fromASCII: string[]) {
        return _.map(fromASCII, (char: any) => {
            return String.fromCharCode(_.toSafeInteger(char));
        });
    }
    public static fromASCIICodeString(fromASCII: string) {
        const chunkArray = _.map(_.chunk(fromASCII, 2), (pair) => {
            return this.JoinArray(pair);
        });
        return this.JoinArray(this.fromASCIICodeArray(chunkArray));
    }
    public static EncryptCard(card: string) {
        const stringArray = _.map(card, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, `Have To All Number In Strings(${card})`);
        });
        if (_.size(stringArray) !== 8) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'Have To Equal 8 size');
        }
        const addMagic = _.toString(_.toInteger(card) + BaseConstant.OPCARD_MAGIC_NUMBER);
        const strMagicOpCardArray = _.map(_.padStart(addMagic, 8, '0'));
        const magicArray = [
            strMagicOpCardArray[4], strMagicOpCardArray[0],
            strMagicOpCardArray[2], strMagicOpCardArray[6],
            strMagicOpCardArray[1], strMagicOpCardArray[3],
            strMagicOpCardArray[5], strMagicOpCardArray[7]
        ];

        return this.JoinArray(
            _.map(_.chunk(magicArray, 2), (magicPair) => {
                const magicPairNumber = _.toInteger(this.JoinArray(magicPair)) + BaseConstant.OPCARD_MAGIC_PAIR_NUMBER;
                const magicPairString = magicPairNumber >= 100 ?
                    _.toString(magicPairNumber - 100) : _.toString(magicPairNumber);
                return _.padStart(magicPairString, 2, '0');
            }));
    }
    public static DecryptCard(card: string) {
        const stringArray = _.map(card, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'Have To All Number In Strings');
        });
        if (_.size(stringArray) !== 8) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'Have To Equal 8 size');
        }
        const magicArray: string[] = [];
        _.forEach(_.chunk(card, 2), (magicPair) => {
            const magicPairNumber = _.toInteger(this.JoinArray(magicPair)) - BaseConstant.OPCARD_MAGIC_PAIR_NUMBER;
            const magicPairString = magicPairNumber < 0 ?
                _.toString(magicPairNumber + 100) : _.toString(magicPairNumber);
            const padStartStringArray = _.map(_.padStart(magicPairString, 2, '0'));
            magicArray.push(padStartStringArray[0]);
            magicArray.push(padStartStringArray[1]);
        });
        return _.padStart(_.toString(_.toInteger(this.JoinArray([
            magicArray[1], magicArray[4],
            magicArray[2], magicArray[5],
            magicArray[0], magicArray[6],
            magicArray[3], magicArray[7]
        ])) - BaseConstant.OPCARD_MAGIC_NUMBER), 8, '0');
    }
    public static JoinArray(anyThing: any[]) {
        return _.join(anyThing, '');
    }
    public static EncryptAlgorithmCard(card: string) {
        const cardArray = _.map(card);
        const first2ToASCII = this.JoinArray(_.take(cardArray, 2));
        const last8ToEncrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.toASCIICodeString(first2ToASCII);
        const encryptCardString = this.EncryptCard(last8ToEncrypt);
        const aSCIICard = aSCIICodeString + encryptCardString;
        const checkSum = this.GetCheckSum(aSCIICard);
        return aSCIICard + checkSum;
    }
    public static DecryptAlgorithmCard(card: string) {
        const cardArray = _.take(_.map(card), 12);
        const first2FromASCII = this.JoinArray(_.take(cardArray, 4));
        const last8ToDecrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.fromASCIICodeString(first2FromASCII);
        const decryptCardCardString = this.DecryptCard(last8ToDecrypt);
        return aSCIICodeString + decryptCardCardString;
    }
    public static EncryptOriginalCard(card: string) {
        const cardArray = _.map(card);
        const first2ToASCII = this.JoinArray(_.take(cardArray, 2));
        const last8ToEncrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.toASCIICodeString(first2ToASCII);
        const aSCIICard = aSCIICodeString + last8ToEncrypt;
        const checkSum = this.GetCheckSum(aSCIICard);
        return aSCIICard + checkSum;
    }
    public static DecryptOriginalCard(card: string) {
        const cardArray = _.take(_.map(card), 12);
        const first2FromASCII = this.JoinArray(_.take(cardArray, 4));
        const last8ToDecrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.fromASCIICodeString(first2FromASCII);
        return aSCIICodeString + last8ToDecrypt;
    }
    public static getShortCardSerialPrintFormat(card: string, algorit: boolean = false) {
        const encryptCard = algorit ? this.EncryptAlgorithmCard(card) : this.EncryptOriginalCard(card);
        return BaseConstant.OPCARD_PRINTER_HEAD_EMPTY + encryptCard + BaseConstant.OPCARD_PRINTER_SHORTEND;
    }
    public static getLongCardSerialPrintFormat(card: string, algorit: boolean = false) {
        const encryptCard = algorit ? this.EncryptAlgorithmCard(card) : this.EncryptOriginalCard(card);
        const magicString =
            BaseConstant.OPCARD_PRINTER_HEAD_EMPTY + encryptCard + BaseConstant.OPCARD_LONG_PRINTER_MAGICSTRING1;
        const magneticStripeCode = BaseConstant.OPCARD_LONG_PRINTER_MAGICSTRING2 + encryptCard;
        const iChecksum = this.CardSerialCheckSum(magneticStripeCode);
        if (iChecksum <= 9) {
            return magicString + magneticStripeCode + _.toString(iChecksum) + BaseConstant.OPCARD_PRINTER_AFTER9END;
        } else if (iChecksum === 10) {
            return magicString + magneticStripeCode + BaseConstant.OPCARD_PRINTER_BE10END;
        } else if (iChecksum === 11) {
            return magicString + magneticStripeCode + BaseConstant.OPCARD_PRINTER_BE11END;
        } else if (iChecksum === 12) {
            return magicString + magneticStripeCode + BaseConstant.OPCARD_PRINTER_BE12END;
        } else if (iChecksum === 13) {
            return magicString + magneticStripeCode + BaseConstant.OPCARD_PRINTER_BE13END;
        } else if (iChecksum === 14) {
            return magicString + magneticStripeCode + BaseConstant.OPCARD_PRINTER_BE14END;
        } else {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'Long CardSerial Print Format Fail');
        }
        // 原始的code有這個判斷,但是....目前看起來是永遠跑不到這個15
        // else if (iChecksum === 15) {
        //     return magicString + magneticStripeCode + Constant.OPCARD_PRINTER_BE15END;
        // }
    }
    public static CardSerialCheckSum(card: string) {
        const cardArray = _.map(card);
        const takecardSize = _.size(cardArray) - 2;
        const withoutFrist2CardArray = _.takeRight(cardArray, takecardSize);
        let temp1 = cardArray[0].charCodeAt(0);
        let temp2 = cardArray[1].charCodeAt(0);
        // tslint:disable-next-line:no-bitwise
        let checksum = temp1 ^ temp2;
        _.forEach(withoutFrist2CardArray, (strChar) => {
            temp1 = checksum;
            temp2 = strChar.charCodeAt(0);
            // tslint:disable-next-line:no-bitwise
            checksum = temp1 ^ temp2;
        });
        // tslint:disable-next-line:no-bitwise
        checksum = checksum & 15;
        if (checksum === 15) {
            checksum = 0;
        }
        return checksum;
    }
    public static getMagneticStripeCode(card: string) {
        const cardArray = _.map(card);
        const cardSize = _.size(cardArray);
        let takeCardCode;
        if (cardSize > 16) {
            takeCardCode = _.takeRight(cardArray, 15);
            takeCardCode = _.take(takeCardCode, 12);
        } else {
            takeCardCode = _.takeRight(cardArray, 14);
            takeCardCode = _.take(takeCardCode, 12);
        }
        return this.JoinArray(takeCardCode);
    }
    public static dollarToCent(value: number | BigNumber) {
        return new BigNumber(value).shiftedBy(2).toNumber();
    }
    public static centToDollar(value: number | BigNumber) {
        return new BigNumber(value).div(100).toNumber();
    }
    /**
     * 變數key命名use _.camelCase
     * @static
     * @param {any} obj
     * @returns
     * @author Mikeli
     * @memberOf Utils
     */
    public static deeplyToCamelCase(obj) {
        if (!_.isObject(obj) || obj instanceof Date) {
            return obj;
        } else if (Array.isArray(obj)) {
            return obj.map((v) => GamaUtils.deeplyToCamelCase(v));
        }
        return _.reduce(obj, (r, v, k) => {
            return {
                ...r,
                [_.lowerFirst(k)]: GamaUtils.deeplyToCamelCase(v)
            };
        }, {});
    }
    /**
     * 變數key命名use _.upperCamelCase
     * @static
     * @param {any} obj
     * @returns
     * @author Mikeli
     * @memberOf Utils
     */
    public static deeplyToUpperCamelCase(obj) {
        if (!_.isObject(obj) || obj instanceof Date) {
            return obj;
        } else if (Array.isArray(obj)) {
            return obj.map((v) => GamaUtils.deeplyToUpperCamelCase(v));
        }
        return _.reduce(obj, (r, v, k) => {
            return {
                ...r,
                [_.upperFirst(k)]: GamaUtils.deeplyToUpperCamelCase(v)
            };
        }, {});
    }
    /**
     * 使用AES_128_ECB 加密
     * @static
     * @param {string} data 要加密的資料 只能string
     * @param {string} ecbKey 預設是我們的密碼,當然可以輸入自己想要使用的密碼
     * @returns 加密後的string
     * @memberOf Utils
     */
    public static Encryption_AES_ECB_128(data: string, ecbKey: string = BaseConstant.AES_128_ECB_KEY) {
        const cipherChunks: any[] = [];
        const cipher = crypto.createCipheriv(
            BaseConstant.AES_CIPHER,
            new Buffer(ecbKey),
            BaseConstant.AES_CIPHER_IV);
        cipher.setAutoPadding(true);
        cipherChunks.push(
            cipher.update(data, BaseConstant.AES_CLEAR_ENCODING, BaseConstant.AES_CIPHER_ENCODING)
        );
        cipherChunks.push(
            cipher.final(BaseConstant.AES_CIPHER_ENCODING)
        );
        return cipherChunks.join('').toUpperCase();
    }
    /**
     * 使用AES_128_ECB 解密
     * @static
     * @param {string} data 要解密的資料 string
     * @param {string} ecbKey 預設是我們的密碼,當然可以輸入自己想要使用的密碼
     * @returns 解密後的string
     * @memberOf Utils
     */
    public static Decryption_AES_ECB_128(data: string, ecbKey: string = BaseConstant.AES_128_ECB_KEY) {
        const cipherChunks: any[] = [];
        const decipher = crypto.createDecipheriv(
            BaseConstant.AES_CIPHER,
            new Buffer(ecbKey),
            BaseConstant.AES_CIPHER_IV);
        decipher.setAutoPadding(true);

        cipherChunks.push(
            decipher.update(data, BaseConstant.AES_CIPHER_ENCODING, BaseConstant.AES_CLEAR_ENCODING)
        );
        cipherChunks.push(
            decipher.final(BaseConstant.AES_CLEAR_ENCODING)
        );
        return cipherChunks.join('');
    }
    /**
     * 判斷是偶數還是奇數
     * @static
     * @param {number} 需要整數
     * @returns
     * @memberOf Utils
     */
    public static checkNumber(value: number) {
        if (!Number.isInteger(value)) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'checkNumber() must have to integer');
        }
        return (value & 1) === 0;
    }
    /**
     * Count occurrences of a value in array
     * 取出數組中指定的數值,重複的次數
     * @static
     * @param {number[]} 數字陣列
     * @param {number} 數字
     * @returns
     * @memberOf Utils
     */
    public static countOccurrences(arr: number[], value: number) {
        return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
    }
    /**
     * 計算陣列內的純數組最後轉換成BigNumber
     * 本來是直接使用reduce
     * 但是既然是封裝過後的方式就採用最原始快速的for來計算
     * 測試用例有使用一個300萬的純數組來測試
     * 純數字不用隱式轉型下reduce比較快
     * 要隱式轉型原始for比較快
     * @static
     * @param {(number[] | string[] | BigNumber[])} array
     * @returns {BigNumber}
     * @memberof Utils
     */
    public static addArray(array: number[] | string[] | BigNumber[]): BigNumber {
        let final = new BigNumber(0);
        for (let n of array) {
            n = new BigNumber(n);
            final = final.plus(n.isNaN() ? 0 : n);
        }
        return final;
    }
    /**
     * 這個是做reduce的方式來達到跟addArray裡面for一樣的成果
     * 在單元測試的時候可以看到差異
     * 另外在array.reduce的接口上不能允許string to number的陣列
     * 另外在空間上的寫法上必須new兩次BigNumber也會導致空間的浪費
     * 引發不必要的GC影響效能
     * 純數字不用隱式轉型下reduce比較快
     * 要隱式轉型原始for比較快
     * @static
     * @param {(number[] | string[] | BigNumber[])} array
     * @returns {BigNumber}
     * @memberof Utils
     */
    public static addArrayReduce(array: any[]): BigNumber {
        return array.reduce((pre, cur) => {
            return new BigNumber(pre).plus(new BigNumber(cur).isNaN() ? 0 : cur);
        }, new BigNumber(0));
    }
    /**
     * 這個方法主要是取出一個物件陣列內指定的field來做加總
     * @param array
     * @param field
     * @returns {BigNumber}
     */
    public static addThisField(array: any[], field: string): BigNumber {
        if (_.size(array) === 0) {
            return new BigNumber(0);
        }
        return this.addArray(_.map(array, field));
    }
    /**
     * 這個方法是為了要做到一個物件陣列裡面
     * 把這個物件的field1 x field2 最後在把這個相乘後的數字相加
     * @static
     * @param {any[]} array
     * @param {string} field1
     * @param {string} field2
     * @returns {BigNumber}
     * @memberof Utils
     */
    public static addThisField1xField2(array: any[], field1: string, field2: string): BigNumber {
        if (_.size(array) === 0) {
            return new BigNumber(0);
        }
        return this.addArray(_.map(array, (aData: any) => {
            const nField1 = _.toNumber(aData[field1]);
            const nField2 = _.toNumber(aData[field2]);
            return new BigNumber(_.isNaN(nField1) ? 0 : nField1).times(_.isNaN(nField2) ? 0 : nField2);
        }));
    }
    /**
     * 這個方法是為了自動取出一個物件陣列內符合條件的物件
     * 重組這個陣列再取出想要計算加總的field
     * @static
     * @param {any[]} array
     * @param {*} filterCondition
     * @param {string} field
     * @returns {BigNumber}
     * @memberof Utils
     */
    public static addThisFieldAutoFilter(array: any[], filterCondition: any, field: string): BigNumber {
        if (_.size(array) === 0) {
            return new BigNumber(0);
        }
        return this.addThisField(_.filter(array, filterCondition), field);
    }
    /**
     * 這個方法是為了自動取出一個物件陣列內符合條件的物件
     * 重組這個陣列再取出每個物件內field1 x field2
     * 再返回新的相乘過的純數組最後再把相乘的數組加總
     * @static
     * @param {any[]} array
     * @param {*} filterCondition
     * @param {string} field1
     * @param {string} field2
     * @returns {BigNumber}
     * @memberof Utils
     */
    public static addField1xField2AutoFilter(
        array: any[], filterCondition: any, field1: string, field2: string): BigNumber {
        if (_.size(array) === 0) {
            return new BigNumber(0);
        }
        return this.addThisField1xField2(_.filter(array, filterCondition), field1, field2);
    }
    /**
     * 這個方法主要是要產生新的Object
     * 兩個陣列長度要一樣不然會報錯
     * 最後產出的Object會把Undefined對應的成員剔除掉
     * keys: ['a', 'b', 'c', 'd']
     * values: [1, 'ff', 2, Undefined]
     * returns: {a: 1, b: 'ff', c: 2}
     * 本來  d: Undefined  這個屬性會被剃除掉
     * @param {(string | string[])} keys 這裡是keys的陣列
     * @param {(any | any[])} values 這裡是values的陣列
     * @returns {Object | any}
     * @memberof GamaUtils
     */
    public static TwoArrayToObj(keys: string | string[], values: any | any[]): any {
        if (_.size(keys) !== _.size(values)) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                'GamaUtils.TwoArrayToObj() keys and values size not equal');
        }
        return _.omitBy(_.zipObject(keys, values), _.isUndefined) as any;
    }
    /**
     * 這個方法主要是要產生新的Object
     * array: [['a', 1], ['b', 2], ['c', Undefined], ['d', 'ff']]
     * returns: {a: 1, b: 2, c: Undefined, d: 'ff'}
     * @param array 這個array 需要每個組都是一個對應的陣列組
     * @returns {Object | any}
     * @memberof GamaUtils
     */
    public static OneArrayToObj(array: any[]): any {
        return _.fromPairs(array) as any;
    }
    /**
     * 這個方法主要是產生新票的時候要給的對應數字
     * @static
     * @param {number} ticketValidationId
     * @param {number} ticketSeedSeqNum
     * @returns {string} 產生完的數字
     * @memberof GamaUtils
     */
    public static getTicketSEValidNum(ticketValidationId: number, ticketSeedSeqNum: number): string {
        if (!Number.isInteger(ticketValidationId) || !Number.isInteger(ticketSeedSeqNum)) {
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                'GamaUtils.geTicketSEValidNum() ticketValidationId || ticketSeedSeqNum have to be Integer');
        }
        const _EGMValidIDBuffer = Buffer.allocUnsafe(4).fill(0);
        const currentSeqNumBuffer = Buffer.allocUnsafe(4).fill(0);
        _EGMValidIDBuffer.writeInt32LE(ticketValidationId, 0);
        currentSeqNumBuffer.writeInt32LE(ticketSeedSeqNum, 0);
        const buffArray: Buffer[] = [];
        // [0][0], [0][1]
        buffArray.push(this.computeCRC16CCITT(Buffer.from([
            _EGMValidIDBuffer[1] ^ currentSeqNumBuffer[0],
            _EGMValidIDBuffer[2] ^ currentSeqNumBuffer[1]
        ]), 0));
        // [1][0], [1][1]
        buffArray.push(this.computeCRC16CCITT(Buffer.from([
            currentSeqNumBuffer[2] ^ currentSeqNumBuffer[0],
            _EGMValidIDBuffer[0] ^ currentSeqNumBuffer[1]
        ]), 0));
        // [2][0], [2][1]
        buffArray.push(this.computeCRC16CCITT(Buffer.from([
            currentSeqNumBuffer[0],
            currentSeqNumBuffer[1]
        ]), 0));
        let intByteBuffer = Buffer.from([0, buffArray[0][0], buffArray[0][1], buffArray[1][0]]);
        let temp4 = this.decimalDigits(intByteBuffer.readInt32BE(0));
        intByteBuffer = Buffer.from([0, buffArray[1][1], buffArray[2][0], buffArray[2][1]]);
        temp4 = temp4.concat(this.decimalDigits(intByteBuffer.readInt32BE(0)));
        let sum1 = 0;
        let sum2 = 0;
        for (let i1 = 0, i2 = 8; i1 < 8; i1++ , i2++) {
            sum1 += temp4[i1];
            sum2 += temp4[i2];
        }
        temp4[0] |= sum1 % 5 << 1;
        temp4[8] |= sum2 % 5 << 1;
        return temp4.reduce((previousValue, currentValue, index, array) => {
            return previousValue + currentValue.toString();
        }, '00');
    }
    private static decimalDigits(n: number): number[] {
        const digits: number[] = [];

        for (let i = 7; i >= 0; i--) {
            if (n > 0) {
                digits[i] = n % 10;
                n = Math.floor(n / 10);
            } else {
                digits[i] = 0;
            }
        }

        return digits;
    }
    private static computeCRC16CCITT(bytesBuffer: Buffer, seed: number): Buffer {
        const CRC_KEY1 = 0o17;
        const CRC_KEY2 = 0o10201;

        let c = seed;
        let q = seed;
        let crcValue = seed;
        const result = Buffer.allocUnsafe(2).fill(0);

        for (let i = 0, l = bytesBuffer.length; i < l; i++) {
            c = bytesBuffer[i];
            q = (crcValue ^ c) & CRC_KEY1;
            crcValue = (crcValue >> 4) ^ (q * CRC_KEY2);
            q = (crcValue ^ (c >> 4)) & CRC_KEY1;
            crcValue = (crcValue >> 4) ^ (q * CRC_KEY2);
        }

        result.writeUInt16BE(crcValue, 0);
        return result;
    }
}
