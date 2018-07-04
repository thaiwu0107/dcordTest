"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
const crypto = require("crypto");
const findUp = require("find-up");
const _ = require("lodash");
const moment = require("moment");
const GamaConstant_1 = require("../config/GamaConstant");
const GamaHttpStatusCode_1 = require("../config/GamaHttpStatusCode");
const LibsExceptions_1 = require("../models/LibsExceptions");
class GamaUtils {
    // NOTE:一個Loop => 造array順序,一個Fun執行再執行一個Fun
    // NOTE:結果會是造array順序出來
    /* istanbul ignore next */
    static async loopSyncAsyncFun(array, asyncFun) {
        const newArray = [];
        for (const adata of array) {
            const getData = await asyncFun(adata);
            newArray.push(getData);
        }
        return newArray;
    }
    // NOTE:一個Loop => 不造array順序,所有Fun同時併發執行
    // NOTE:結果會是不造array順序出來
    /* istanbul ignore next */
    static async loopAsyncAsyncFun(array, asyncFun) {
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
    static async getPath(fileName, filedir, filePath) {
        const toFiledir = _.isUndefined(filedir) ? 'sqlTemplate/' : filedir;
        return findUp(toFiledir + fileName, {
            cwd: _.isUndefined(filePath) ? __filename : filePath
        });
    }
    static isNumber(x) {
        return typeof x === 'number';
    }
    static isString(x) {
        return typeof x === 'string';
    }
    /**
     * 併發處理
     * @param {(Array<Promise<any>> | Array<Promise<any[]>>)} arrayPromise 可以塞一起併發的Promise
     * @returns 一起解決的(Array<Promise<any>> | Array<Promise<any[]>>)
     * @memberof Utils
     */
    /* istanbul ignore next */
    static async AsyncAll(arrayPromise) {
        return Promise.all(arrayPromise);
    }
    static BuffArrayToBase64(data) {
        return new Buffer(data, 'binary').toString('base64');
    }
    static Base64ToBuffArray(data) {
        return new Buffer(data, 'base64');
    }
    static SQLBinary(data) {
        return new Buffer(data, 'binary');
    }
    static EmptyBase64ToBuffArray() {
        return new Buffer(' ');
    }
    static EmptyBuffArrayToBase64() {
        return GamaConstant_1.GamaConstant.NO_IMAGE;
    }
    /**
     * 解析物件陣列，將物件內all value組成以空白組成字串
     * 再將上述之字串以逗號相連接
     * @param any[]
     * @returns string
     * @memberof Utils
     */
    static objToString(objs) {
        return _.join(_.map(objs, (obj) => {
            return _.join(_.values(obj), ' ');
        }), ',');
    }
    /**
     * memberId to MemberSerial And SectionSerial
     * @param string
     * @returns string
     * @memberof Utils
     */
    static MemberIdToMemberSerialAndSectionSerial(memberId) {
        if (_.size(memberId) !== 8) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'MemberId Size Must to be 8');
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
    static validateString(value, paramName) {
        if (_.isUndefined(value) || _.isString(value)) {
            return value;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate number
     * @param number
     * @returns number
     * @memberof Utils
     */
    static validateNumber(value, paramName) {
        if (_.isNaN(value)) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
        else if (_.isNumber(value)) {
            return value;
        }
        else if (_.isUndefined(value)) {
            return undefined;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate boolean
     * @param boolean
     * @returns boolean
     * @memberof Utils
     */
    static validateBoolean(value, paramName) {
        if (_.isBoolean(value)) {
            return value;
        }
        else if (_.isUndefined(value)) {
            return undefined;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    /**
     * Validate Date
     * @param Date
     * @returns Date
     * @memberof Utils
     */
    static validateDate(value, paramName) {
        const momentObj = moment(value, moment.ISO_8601, true);
        if (momentObj.isValid()) {
            return momentObj.toDate();
        }
        else if (_.isUndefined(value)) {
            return undefined;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, this.constructor.name + ' : data format error, field: ' + paramName);
        }
    }
    static resultMessage(msg) {
        return { message: msg };
    }
    static DBTimeFormat(time) {
        return moment(time).format(GamaConstant_1.GamaConstant.DB_TIME_FORMAT);
    }
    static DateTimeFormat(time) {
        return moment(time).format(GamaConstant_1.GamaConstant.DATE_TIME_FORMAT);
    }
    static PDFTimeFormat(time) {
        return moment(time).format(GamaConstant_1.GamaConstant.PDF_TIME_FORMAT);
    }
    static BirthdayTimeFormat(time) {
        return moment(time).format(GamaConstant_1.GamaConstant.BIRTHDAY_TIME_FORMAT);
    }
    static PDFHoursTimeFormat(time) {
        return moment(time).format(GamaConstant_1.GamaConstant.PDF_HOURS_TIME_FORMAT);
    }
    static TakeFirstOrEmpty(anyThing) {
        return anyThing[0] || {};
    }
    static GetCheckSum(sASCIICardSerial) {
        const stringArray = _.map(sASCIICardSerial, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'Have To All Number In Strings');
        });
        if (_.size(stringArray) !== 12) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'Have To Equal 12 size');
        }
        const iSum = _.reduce(stringArray, (sum, n) => {
            return n + sum;
        }, 0);
        const iRemainder = iSum % 10;
        return iRemainder === 0 ? 0 : (10 - iRemainder);
    }
    static toASCIICodeArray(toASCII) {
        return _.map(toASCII, (char) => {
            return char.charCodeAt(0);
        });
    }
    static toASCIICodeString(toASCII) {
        return this.JoinArray(this.toASCIICodeArray(toASCII));
    }
    static fromASCIICodeArray(fromASCII) {
        return _.map(fromASCII, (char) => {
            return String.fromCharCode(_.toSafeInteger(char));
        });
    }
    static fromASCIICodeString(fromASCII) {
        const chunkArray = _.map(_.chunk(fromASCII, 2), (pair) => {
            return this.JoinArray(pair);
        });
        return this.JoinArray(this.fromASCIICodeArray(chunkArray));
    }
    static EncryptCard(card) {
        const stringArray = _.map(card, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, `Have To All Number In Strings(${card})`);
        });
        if (_.size(stringArray) !== 8) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'Have To Equal 8 size');
        }
        const addMagic = _.toString(_.toInteger(card) + GamaConstant_1.GamaConstant.OPCARD_MAGIC_NUMBER);
        const strMagicOpCardArray = _.map(_.padStart(addMagic, 8, '0'));
        const magicArray = [
            strMagicOpCardArray[4], strMagicOpCardArray[0],
            strMagicOpCardArray[2], strMagicOpCardArray[6],
            strMagicOpCardArray[1], strMagicOpCardArray[3],
            strMagicOpCardArray[5], strMagicOpCardArray[7]
        ];
        return this.JoinArray(_.map(_.chunk(magicArray, 2), (magicPair) => {
            const magicPairNumber = _.toInteger(this.JoinArray(magicPair)) + GamaConstant_1.GamaConstant.OPCARD_MAGIC_PAIR_NUMBER;
            const magicPairString = magicPairNumber >= 100 ?
                _.toString(magicPairNumber - 100) : _.toString(magicPairNumber);
            return _.padStart(magicPairString, 2, '0');
        }));
    }
    static DecryptCard(card) {
        const stringArray = _.map(card, (data) => {
            const aNumber = _.toNumber(data);
            if (!_.isNaN(aNumber)) {
                return aNumber;
            }
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'Have To All Number In Strings');
        });
        if (_.size(stringArray) !== 8) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'Have To Equal 8 size');
        }
        const magicArray = [];
        _.forEach(_.chunk(card, 2), (magicPair) => {
            const magicPairNumber = _.toInteger(this.JoinArray(magicPair)) - GamaConstant_1.GamaConstant.OPCARD_MAGIC_PAIR_NUMBER;
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
        ])) - GamaConstant_1.GamaConstant.OPCARD_MAGIC_NUMBER), 8, '0');
    }
    static JoinArray(anyThing) {
        return _.join(anyThing, '');
    }
    static EncryptAlgorithmCard(card) {
        const cardArray = _.map(card);
        const first2ToASCII = this.JoinArray(_.take(cardArray, 2));
        const last8ToEncrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.toASCIICodeString(first2ToASCII);
        const encryptCardString = this.EncryptCard(last8ToEncrypt);
        const aSCIICard = aSCIICodeString + encryptCardString;
        const checkSum = this.GetCheckSum(aSCIICard);
        return aSCIICard + checkSum;
    }
    static DecryptAlgorithmCard(card) {
        const cardArray = _.take(_.map(card), 12);
        const first2FromASCII = this.JoinArray(_.take(cardArray, 4));
        const last8ToDecrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.fromASCIICodeString(first2FromASCII);
        const decryptCardCardString = this.DecryptCard(last8ToDecrypt);
        return aSCIICodeString + decryptCardCardString;
    }
    static EncryptOriginalCard(card) {
        const cardArray = _.map(card);
        const first2ToASCII = this.JoinArray(_.take(cardArray, 2));
        const last8ToEncrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.toASCIICodeString(first2ToASCII);
        const aSCIICard = aSCIICodeString + last8ToEncrypt;
        const checkSum = this.GetCheckSum(aSCIICard);
        return aSCIICard + checkSum;
    }
    static DecryptOriginalCard(card) {
        const cardArray = _.take(_.map(card), 12);
        const first2FromASCII = this.JoinArray(_.take(cardArray, 4));
        const last8ToDecrypt = this.JoinArray(_.takeRight(cardArray, 8));
        const aSCIICodeString = this.fromASCIICodeString(first2FromASCII);
        return aSCIICodeString + last8ToDecrypt;
    }
    static getShortCardSerialPrintFormat(card, algorit = false) {
        const encryptCard = algorit ? this.EncryptAlgorithmCard(card) : this.EncryptOriginalCard(card);
        return GamaConstant_1.GamaConstant.OPCARD_PRINTER_HEAD_EMPTY + encryptCard + GamaConstant_1.GamaConstant.OPCARD_PRINTER_SHORTEND;
    }
    static getLongCardSerialPrintFormat(card, algorit = false) {
        const encryptCard = algorit ? this.EncryptAlgorithmCard(card) : this.EncryptOriginalCard(card);
        const magicString = GamaConstant_1.GamaConstant.OPCARD_PRINTER_HEAD_EMPTY + encryptCard + GamaConstant_1.GamaConstant.OPCARD_LONG_PRINTER_MAGICSTRING1;
        const magneticStripeCode = GamaConstant_1.GamaConstant.OPCARD_LONG_PRINTER_MAGICSTRING2 + encryptCard;
        const iChecksum = this.CardSerialCheckSum(magneticStripeCode);
        if (iChecksum <= 9) {
            return magicString + magneticStripeCode + _.toString(iChecksum) + GamaConstant_1.GamaConstant.OPCARD_PRINTER_AFTER9END;
        }
        else if (iChecksum === 10) {
            return magicString + magneticStripeCode + GamaConstant_1.GamaConstant.OPCARD_PRINTER_BE10END;
        }
        else if (iChecksum === 11) {
            return magicString + magneticStripeCode + GamaConstant_1.GamaConstant.OPCARD_PRINTER_BE11END;
        }
        else if (iChecksum === 12) {
            return magicString + magneticStripeCode + GamaConstant_1.GamaConstant.OPCARD_PRINTER_BE12END;
        }
        else if (iChecksum === 13) {
            return magicString + magneticStripeCode + GamaConstant_1.GamaConstant.OPCARD_PRINTER_BE13END;
        }
        else if (iChecksum === 14) {
            return magicString + magneticStripeCode + GamaConstant_1.GamaConstant.OPCARD_PRINTER_BE14END;
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'Long CardSerial Print Format Fail');
        }
        // 原始的code有這個判斷,但是....目前看起來是永遠跑不到這個15
        // else if (iChecksum === 15) {
        //     return magicString + magneticStripeCode + Constant.OPCARD_PRINTER_BE15END;
        // }
    }
    static CardSerialCheckSum(card) {
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
    static getMagneticStripeCode(card) {
        const cardArray = _.map(card);
        const cardSize = _.size(cardArray);
        let takeCardCode;
        if (cardSize > 16) {
            takeCardCode = _.takeRight(cardArray, 15);
            takeCardCode = _.take(takeCardCode, 12);
        }
        else {
            takeCardCode = _.takeRight(cardArray, 14);
            takeCardCode = _.take(takeCardCode, 12);
        }
        return this.JoinArray(takeCardCode);
    }
    static dollarToCent(value) {
        return new bignumber_js_1.BigNumber(value).shiftedBy(2).toNumber();
    }
    static centToDollar(value) {
        return new bignumber_js_1.BigNumber(value).div(100).toNumber();
    }
    /**
     * 變數key命名use _.camelCase
     * @static
     * @param {any} obj
     * @returns
     * @author Mikeli
     * @memberOf Utils
     */
    static deeplyToCamelCase(obj) {
        if (!_.isObject(obj) || obj instanceof Date) {
            return obj;
        }
        else if (Array.isArray(obj)) {
            return obj.map((v) => GamaUtils.deeplyToCamelCase(v));
        }
        return _.reduce(obj, (r, v, k) => {
            return Object.assign({}, r, { [_.lowerFirst(k)]: GamaUtils.deeplyToCamelCase(v) });
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
    static deeplyToUpperCamelCase(obj) {
        if (!_.isObject(obj) || obj instanceof Date) {
            return obj;
        }
        else if (Array.isArray(obj)) {
            return obj.map((v) => GamaUtils.deeplyToUpperCamelCase(v));
        }
        return _.reduce(obj, (r, v, k) => {
            return Object.assign({}, r, { [_.upperFirst(k)]: GamaUtils.deeplyToUpperCamelCase(v) });
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
    static Encryption_AES_ECB_128(data, ecbKey = GamaConstant_1.GamaConstant.AES_128_ECB_KEY) {
        const cipherChunks = [];
        const cipher = crypto.createCipheriv(GamaConstant_1.GamaConstant.AES_CIPHER, new Buffer(ecbKey), GamaConstant_1.GamaConstant.AES_CIPHER_IV);
        cipher.setAutoPadding(true);
        cipherChunks.push(cipher.update(data, GamaConstant_1.GamaConstant.AES_CLEAR_ENCODING, GamaConstant_1.GamaConstant.AES_CIPHER_ENCODING));
        cipherChunks.push(cipher.final(GamaConstant_1.GamaConstant.AES_CIPHER_ENCODING));
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
    static Decryption_AES_ECB_128(data, ecbKey = GamaConstant_1.GamaConstant.AES_128_ECB_KEY) {
        const cipherChunks = [];
        const decipher = crypto.createDecipheriv(GamaConstant_1.GamaConstant.AES_CIPHER, new Buffer(ecbKey), GamaConstant_1.GamaConstant.AES_CIPHER_IV);
        decipher.setAutoPadding(true);
        cipherChunks.push(decipher.update(data, GamaConstant_1.GamaConstant.AES_CIPHER_ENCODING, GamaConstant_1.GamaConstant.AES_CLEAR_ENCODING));
        cipherChunks.push(decipher.final(GamaConstant_1.GamaConstant.AES_CLEAR_ENCODING));
        return cipherChunks.join('');
    }
    /**
     * 判斷是偶數還是奇數
     * @static
     * @param {number} 需要整數
     * @returns
     * @memberOf Utils
     */
    static checkNumber(value) {
        if (!Number.isInteger(value)) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'checkNumber() must have to integer');
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
    static countOccurrences(arr, value) {
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
    static addArray(array) {
        let final = new bignumber_js_1.BigNumber(0);
        for (let n of array) {
            n = new bignumber_js_1.BigNumber(n);
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
    static addArrayReduce(array) {
        return array.reduce((pre, cur) => {
            return new bignumber_js_1.BigNumber(pre).plus(new bignumber_js_1.BigNumber(cur).isNaN() ? 0 : cur);
        }, new bignumber_js_1.BigNumber(0));
    }
    /**
     * 這個方法主要是取出一個物件陣列內指定的field來做加總
     * @param array
     * @param field
     * @returns {BigNumber}
     */
    static addThisField(array, field) {
        if (_.size(array) === 0) {
            return new bignumber_js_1.BigNumber(0);
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
    static addThisField1xField2(array, field1, field2) {
        if (_.size(array) === 0) {
            return new bignumber_js_1.BigNumber(0);
        }
        return this.addArray(_.map(array, (aData) => {
            const nField1 = _.toNumber(aData[field1]);
            const nField2 = _.toNumber(aData[field2]);
            return new bignumber_js_1.BigNumber(_.isNaN(nField1) ? 0 : nField1).times(_.isNaN(nField2) ? 0 : nField2);
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
    static addThisFieldAutoFilter(array, filterCondition, field) {
        if (_.size(array) === 0) {
            return new bignumber_js_1.BigNumber(0);
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
    static addField1xField2AutoFilter(array, filterCondition, field1, field2) {
        if (_.size(array) === 0) {
            return new bignumber_js_1.BigNumber(0);
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
    static TwoArrayToObj(keys, values) {
        if (_.size(keys) !== _.size(values)) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'GamaUtils.TwoArrayToObj() keys and values size not equal');
        }
        return _.omitBy(_.zipObject(keys, values), _.isUndefined);
    }
    /**
     * 這個方法主要是要產生新的Object
     * array: [['a', 1], ['b', 2], ['c', Undefined], ['d', 'ff']]
     * returns: {a: 1, b: 2, c: Undefined, d: 'ff'}
     * @param array 這個array 需要每個組都是一個對應的陣列組
     * @returns {Object | any}
     * @memberof GamaUtils
     */
    static OneArrayToObj(array) {
        return _.fromPairs(array);
    }
    /**
     * 這個方法主要是產生新票的時候要給的對應數字
     * @static
     * @param {number} ticketValidationId
     * @param {number} ticketSeedSeqNum
     * @returns {string} 產生完的數字
     * @memberof GamaUtils
     */
    static getTicketSEValidNum(ticketValidationId, ticketSeedSeqNum) {
        if (!Number.isInteger(ticketValidationId) || !Number.isInteger(ticketSeedSeqNum)) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'GamaUtils.geTicketSEValidNum() ticketValidationId || ticketSeedSeqNum have to be Integer');
        }
        const _EGMValidIDBuffer = Buffer.allocUnsafe(4).fill(0);
        const currentSeqNumBuffer = Buffer.allocUnsafe(4).fill(0);
        _EGMValidIDBuffer.writeInt32LE(ticketValidationId, 0);
        currentSeqNumBuffer.writeInt32LE(ticketSeedSeqNum, 0);
        const buffArray = [];
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
        for (let i1 = 0, i2 = 8; i1 < 8; i1++, i2++) {
            sum1 += temp4[i1];
            sum2 += temp4[i2];
        }
        temp4[0] |= sum1 % 5 << 1;
        temp4[8] |= sum2 % 5 << 1;
        return temp4.reduce((previousValue, currentValue, index, array) => {
            return previousValue + currentValue.toString();
        }, '00');
    }
    static decimalDigits(n) {
        const digits = [];
        for (let i = 7; i >= 0; i--) {
            if (n > 0) {
                digits[i] = n % 10;
                n = Math.floor(n / 10);
            }
            else {
                digits[i] = 0;
            }
        }
        return digits;
    }
    static computeCRC16CCITT(bytesBuffer, seed) {
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
exports.default = GamaUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtYVV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nZ3R0b280NC9EZXNrdG9wL2Jhc2VBUEkvc3JjLyIsInNvdXJjZXMiOlsidXRpbHMvR2FtYVV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQXlDO0FBQ3pDLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsNEJBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyx5REFBc0Q7QUFDdEQscUVBQWtFO0FBS2xFLDZEQUEwRDtBQVUxRDtJQUNJLDBDQUEwQztJQUMxQyxzQkFBc0I7SUFDdEIsMEJBQTBCO0lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUksS0FBWSxFQUFFLFFBQVc7UUFDN0QsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ3pCLEtBQUssTUFBTSxLQUFLLElBQUksS0FBSyxFQUFFO1lBQ3ZCLE1BQU0sT0FBTyxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDMUI7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0QsdUNBQXVDO0lBQ3ZDLHVCQUF1QjtJQUN2QiwwQkFBMEI7SUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBSSxLQUFZLEVBQUUsUUFBVztRQUM5RCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDekMsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFRLEVBQUUsUUFBUztRQUNyRCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLE9B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TSxDQUFDO0lBQ2xCLENBQUM7SUFDTyxNQUFNLENBQUMsaUJBQWlCLENBQUMsV0FBbUIsRUFBRSxJQUFZO1FBQzlELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQztRQUN0QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFFekIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEQsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQzlCLFFBQVEsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUM1QyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7WUFDckMsUUFBUSxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKO0FBM3NCRCw0QkEyc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmlnTnVtYmVyIH0gZnJvbSAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0ICogYXMgZmluZFVwIGZyb20gJ2ZpbmQtdXAnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyBHYW1hQ29uc3RhbnQgfSBmcm9tICcuLi9jb25maWcvR2FtYUNvbnN0YW50JztcbmltcG9ydCB7IEdhbWFIdHRwU3RhdHVzQ29kZSB9IGZyb20gJy4uL2NvbmZpZy9HYW1hSHR0cFN0YXR1c0NvZGUnO1xuaW1wb3J0IEFueUVudGl0eSBmcm9tICcuLi9tb2RlbHMvQW55RW50aXR5JztcbmltcG9ydCBHYW1hRW50aXR5IGZyb20gJy4uL21vZGVscy9HYW1hRW50aXR5JztcbmltcG9ydCBHYW1hRXhjZXB0aW9ucyBmcm9tICcuLi9tb2RlbHMvR2FtYUV4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgSVN0cmluZyB9IGZyb20gJy4uL21vZGVscy9JR2FtYUNvbnRleHQnO1xuaW1wb3J0IHsgTGlic0V4Y2VwdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvTGlic0V4Y2VwdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBGID0gKGRhdGE6IGFueSkgPT4gYW55O1xuZXhwb3J0IHR5cGUgQSA9IGFueVtdIHwgYW55O1xuaW50ZXJmYWNlIElDbGFzcyB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24uIEZ1bmN0aW9uIG5hbWVzIGFyZSByZWFkLW9ubHkgYW5kIGNhbiBub3QgYmUgY2hhbmdlZC5cbiAgICAgKi9cbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1hVXRpbHMge1xuICAgIC8vIE5PVEU65LiA5YCLTG9vcCA9PiDpgKBhcnJheemghuW6jyzkuIDlgItGdW7ln7fooYzlho3ln7fooYzkuIDlgItGdW5cbiAgICAvLyBOT1RFOue1kOaenOacg+aYr+mAoGFycmF56aCG5bqP5Ye65L6GXG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGxvb3BTeW5jQXN5bmNGdW48VD4oYXJyYXk6IGFueVtdLCBhc3luY0Z1bjogRik6IFByb21pc2U8VFtdPiB7XG4gICAgICAgIGNvbnN0IG5ld0FycmF5OiBUW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBhZGF0YSBvZiBhcnJheSkge1xuICAgICAgICAgICAgY29uc3QgZ2V0RGF0YSA9IGF3YWl0IGFzeW5jRnVuKGFkYXRhKTtcbiAgICAgICAgICAgIG5ld0FycmF5LnB1c2goZ2V0RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH1cbiAgICAvLyBOT1RFOuS4gOWAi0xvb3AgPT4g5LiN6YCgYXJyYXnpoIbluo8s5omA5pyJRnVu5ZCM5pmC5L2155m85Z+36KGMXG4gICAgLy8gTk9URTrntZDmnpzmnIPmmK/kuI3pgKBhcnJheemghuW6j+WHuuS+hlxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBsb29wQXN5bmNBc3luY0Z1bjxUPihhcnJheTogYW55W10sIGFzeW5jRnVuOiBGKTogUHJvbWlzZTxUW10+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGFycmF5Lm1hcChhc3luYyAoYURhdGEpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBhc3luY0Z1bihhRGF0YSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlsIvmib7mqpTmoYjkvY3lrZBcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHthbnl9IGZpbGVOYW1lIOaqlOahiOWQjeeosVxuICAgICAqIEBwYXJhbSB7YW55fSBmaWxlZGlyIOaykuacieaMh+WumuWwseaYr+mgkOiorSdzcWxUZW1wbGF0ZS8gIOW6leS4iydcbiAgICAgKiBAcGFyYW0ge2FueX0gW2ZpbGVQYXRoXSDnnJ/lr6bmqpTmoYjkvY3lrZDlj6/og73ngrpsaWJz5oiW5pivc3JjL2Rpc3TnrYnnrYnkvb/nlKjnmoTkvY3lrZBcbiAgICAgKiBAcmV0dXJucyDnnJ/mraPmqpTmoYjnmoTkvY3lrZBcbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldFBhdGgoZmlsZU5hbWUsIGZpbGVkaXI/LCBmaWxlUGF0aD8pIHtcbiAgICAgICAgY29uc3QgdG9GaWxlZGlyID0gXy5pc1VuZGVmaW5lZChmaWxlZGlyKSA/ICdzcWxUZW1wbGF0ZS8nIDogZmlsZWRpcjtcbiAgICAgICAgcmV0dXJuIGZpbmRVcCh0b0ZpbGVkaXIgKyBmaWxlTmFtZSwge1xuICAgICAgICAgICAgY3dkOiBfLmlzVW5kZWZpbmVkKGZpbGVQYXRoKSA/IF9fZmlsZW5hbWUgOiBmaWxlUGF0aFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBpc051bWJlcih4OiBhbnkpOiB4IGlzIG51bWJlciB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ251bWJlcic7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgaXNTdHJpbmcoeDogYW55KTogeCBpcyBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdzdHJpbmcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkvbXnmbzomZXnkIZcbiAgICAgKiBAcGFyYW0geyhBcnJheTxQcm9taXNlPGFueT4+IHwgQXJyYXk8UHJvbWlzZTxhbnlbXT4+KX0gYXJyYXlQcm9taXNlIOWPr+S7peWhnuS4gOi1t+S9teeZvOeahFByb21pc2VcbiAgICAgKiBAcmV0dXJucyDkuIDotbfop6PmsbrnmoQoQXJyYXk8UHJvbWlzZTxhbnk+PiB8IEFycmF5PFByb21pc2U8YW55W10+PilcbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYXN5bmMgQXN5bmNBbGwoYXJyYXlQcm9taXNlOiBBcnJheTxQcm9taXNlPEE+Pik6IFByb21pc2U8QT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoYXJyYXlQcm9taXNlKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBCdWZmQXJyYXlUb0Jhc2U2NChkYXRhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoZGF0YSwgJ2JpbmFyeScpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBCYXNlNjRUb0J1ZmZBcnJheShkYXRhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoZGF0YSwgJ2Jhc2U2NCcpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIFNRTEJpbmFyeShkYXRhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCdWZmZXIoZGF0YSwgJ2JpbmFyeScpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEVtcHR5QmFzZTY0VG9CdWZmQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQnVmZmVyKCcgJyk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRW1wdHlCdWZmQXJyYXlUb0Jhc2U2NCgpIHtcbiAgICAgICAgcmV0dXJuIEdhbWFDb25zdGFudC5OT19JTUFHRTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6Kej5p6Q54mp5Lu26Zmj5YiX77yM5bCH54mp5Lu25YWnYWxsIHZhbHVl57WE5oiQ5Lul56m655m957WE5oiQ5a2X5LiyXG4gICAgICog5YaN5bCH5LiK6L+w5LmL5a2X5Liy5Lul6YCX6Jmf55u46YCj5o6lXG4gICAgICogQHBhcmFtIGFueVtdXG4gICAgICogQHJldHVybnMgc3RyaW5nXG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBvYmpUb1N0cmluZyhvYmpzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gXy5qb2luKF8ubWFwKG9ianMsIChvYmo6IGFueSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIF8uam9pbihfLnZhbHVlcyhvYmopLCAnICcpO1xuICAgICAgICB9KSwgJywnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogbWVtYmVySWQgdG8gTWVtYmVyU2VyaWFsIEFuZCBTZWN0aW9uU2VyaWFsXG4gICAgICogQHBhcmFtIHN0cmluZ1xuICAgICAqIEByZXR1cm5zIHN0cmluZ1xuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTWVtYmVySWRUb01lbWJlclNlcmlhbEFuZFNlY3Rpb25TZXJpYWwobWVtYmVySWQ6IElTdHJpbmcgfCBzdHJpbmcpIHtcbiAgICAgICAgaWYgKF8uc2l6ZShtZW1iZXJJZCkgIT09IDgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhHYW1hSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdNZW1iZXJJZCBTaXplIE11c3QgdG8gYmUgOCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNNZW1iZXJJZCA9IF8udG9TdHJpbmcobWVtYmVySWQpO1xuICAgICAgICBjb25zdCBtZW1iZXJTZXJpYWwgPSBzTWVtYmVySWQuc2xpY2UoLTYpO1xuICAgICAgICBjb25zdCBzZWN0aW9uU2VyaWFsID0gXy5yZXBsYWNlKHNNZW1iZXJJZCwgbWVtYmVyU2VyaWFsLCAnJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZW1iZXJTZXJpYWwsXG4gICAgICAgICAgICBzZWN0aW9uU2VyaWFsXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIHN0cmluZ1xuICAgICAqIEBwYXJhbSBzdHJpbmdcbiAgICAgKiBAcmV0dXJucyBzdHJpbmdcbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHZhbGlkYXRlU3RyaW5nKHZhbHVlOiBhbnksIHBhcmFtTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChfLmlzVW5kZWZpbmVkKHZhbHVlKSB8fCBfLmlzU3RyaW5nKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlIGFzIGFueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhHYW1hSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJyA6IGRhdGEgZm9ybWF0IGVycm9yLCBmaWVsZDogJyArIHBhcmFtTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgbnVtYmVyXG4gICAgICogQHBhcmFtIG51bWJlclxuICAgICAqIEByZXR1cm5zIG51bWJlclxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdmFsaWRhdGVOdW1iZXIodmFsdWU6IGFueSwgcGFyYW1OYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKF8uaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoR2FtYUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLFxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcgOiBkYXRhIGZvcm1hdCBlcnJvciwgZmllbGQ6ICcgKyBwYXJhbU5hbWUpO1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgYXMgYW55O1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkIGFzIGFueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhHYW1hSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJyA6IGRhdGEgZm9ybWF0IGVycm9yLCBmaWVsZDogJyArIHBhcmFtTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgYm9vbGVhblxuICAgICAqIEBwYXJhbSBib29sZWFuXG4gICAgICogQHJldHVybnMgYm9vbGVhblxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdmFsaWRhdGVCb29sZWFuKHZhbHVlOiBhbnksIHBhcmFtTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChfLmlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSBhcyBhbnk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQgYXMgYW55O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEdhbWFIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIDogZGF0YSBmb3JtYXQgZXJyb3IsIGZpZWxkOiAnICsgcGFyYW1OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBEYXRlXG4gICAgICogQHBhcmFtIERhdGVcbiAgICAgKiBAcmV0dXJucyBEYXRlXG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB2YWxpZGF0ZURhdGUodmFsdWU6IGFueSwgcGFyYW1OYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbW9tZW50T2JqID0gbW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEsIHRydWUpO1xuICAgICAgICBpZiAobW9tZW50T2JqLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG1vbWVudE9iai50b0RhdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZCBhcyBhbnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoR2FtYUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLFxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcgOiBkYXRhIGZvcm1hdCBlcnJvciwgZmllbGQ6ICcgKyBwYXJhbU5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgcmVzdWx0TWVzc2FnZShtc2c6IHN0cmluZykge1xuICAgICAgICByZXR1cm4geyBtZXNzYWdlOiBtc2cgfTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBEQlRpbWVGb3JtYXQodGltZTogRGF0ZSB8IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRpbWUpLmZvcm1hdChHYW1hQ29uc3RhbnQuREJfVElNRV9GT1JNQVQpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIERhdGVUaW1lRm9ybWF0KHRpbWU6IERhdGUgfCBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCh0aW1lKS5mb3JtYXQoR2FtYUNvbnN0YW50LkRBVEVfVElNRV9GT1JNQVQpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIFBERlRpbWVGb3JtYXQodGltZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlcikge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRpbWUpLmZvcm1hdChHYW1hQ29uc3RhbnQuUERGX1RJTUVfRk9STUFUKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBCaXJ0aGRheVRpbWVGb3JtYXQodGltZTogRGF0ZSB8IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbW9tZW50KHRpbWUpLmZvcm1hdChHYW1hQ29uc3RhbnQuQklSVEhEQVlfVElNRV9GT1JNQVQpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIFBERkhvdXJzVGltZUZvcm1hdCh0aW1lOiBEYXRlIHwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBtb21lbnQodGltZSkuZm9ybWF0KEdhbWFDb25zdGFudC5QREZfSE9VUlNfVElNRV9GT1JNQVQpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIFRha2VGaXJzdE9yRW1wdHkoYW55VGhpbmc6IGFueVtdKSB7XG4gICAgICAgIHJldHVybiBhbnlUaGluZ1swXSB8fCB7fTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBHZXRDaGVja1N1bShzQVNDSUlDYXJkU2VyaWFsOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nQXJyYXkgPSBfLm1hcChzQVNDSUlDYXJkU2VyaWFsLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYU51bWJlciA9IF8udG9OdW1iZXIoZGF0YSk7XG4gICAgICAgICAgICBpZiAoIV8uaXNOYU4oYU51bWJlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYU51bWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhHYW1hSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdIYXZlIFRvIEFsbCBOdW1iZXIgSW4gU3RyaW5ncycpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKF8uc2l6ZShzdHJpbmdBcnJheSkgIT09IDEyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoR2FtYUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCAnSGF2ZSBUbyBFcXVhbCAxMiBzaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaVN1bSA9IF8ucmVkdWNlKHN0cmluZ0FycmF5LCAoc3VtLCBuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbiArIHN1bTtcbiAgICAgICAgfSwgMCk7XG4gICAgICAgIGNvbnN0IGlSZW1haW5kZXIgPSBpU3VtICUgMTA7XG4gICAgICAgIHJldHVybiBpUmVtYWluZGVyID09PSAwID8gMCA6ICgxMCAtIGlSZW1haW5kZXIpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIHRvQVNDSUlDb2RlQXJyYXkodG9BU0NJSTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBfLm1hcCh0b0FTQ0lJLCAoY2hhcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNoYXIuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgdG9BU0NJSUNvZGVTdHJpbmcodG9BU0NJSTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkpvaW5BcnJheSh0aGlzLnRvQVNDSUlDb2RlQXJyYXkodG9BU0NJSSkpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGZyb21BU0NJSUNvZGVBcnJheShmcm9tQVNDSUk6IHN0cmluZ1tdKSB7XG4gICAgICAgIHJldHVybiBfLm1hcChmcm9tQVNDSUksIChjaGFyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKF8udG9TYWZlSW50ZWdlcihjaGFyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGZyb21BU0NJSUNvZGVTdHJpbmcoZnJvbUFTQ0lJOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2h1bmtBcnJheSA9IF8ubWFwKF8uY2h1bmsoZnJvbUFTQ0lJLCAyKSwgKHBhaXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkpvaW5BcnJheShwYWlyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLkpvaW5BcnJheSh0aGlzLmZyb21BU0NJSUNvZGVBcnJheShjaHVua0FycmF5KSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRW5jcnlwdENhcmQoY2FyZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ0FycmF5ID0gXy5tYXAoY2FyZCwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFOdW1iZXIgPSBfLnRvTnVtYmVyKGRhdGEpO1xuICAgICAgICAgICAgaWYgKCFfLmlzTmFOKGFOdW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFOdW1iZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoR2FtYUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCBgSGF2ZSBUbyBBbGwgTnVtYmVyIEluIFN0cmluZ3MoJHtjYXJkfSlgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChfLnNpemUoc3RyaW5nQXJyYXkpICE9PSA4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoR2FtYUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCAnSGF2ZSBUbyBFcXVhbCA4IHNpemUnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhZGRNYWdpYyA9IF8udG9TdHJpbmcoXy50b0ludGVnZXIoY2FyZCkgKyBHYW1hQ29uc3RhbnQuT1BDQVJEX01BR0lDX05VTUJFUik7XG4gICAgICAgIGNvbnN0IHN0ck1hZ2ljT3BDYXJkQXJyYXkgPSBfLm1hcChfLnBhZFN0YXJ0KGFkZE1hZ2ljLCA4LCAnMCcpKTtcbiAgICAgICAgY29uc3QgbWFnaWNBcnJheSA9IFtcbiAgICAgICAgICAgIHN0ck1hZ2ljT3BDYXJkQXJyYXlbNF0sIHN0ck1hZ2ljT3BDYXJkQXJyYXlbMF0sXG4gICAgICAgICAgICBzdHJNYWdpY09wQ2FyZEFycmF5WzJdLCBzdHJNYWdpY09wQ2FyZEFycmF5WzZdLFxuICAgICAgICAgICAgc3RyTWFnaWNPcENhcmRBcnJheVsxXSwgc3RyTWFnaWNPcENhcmRBcnJheVszXSxcbiAgICAgICAgICAgIHN0ck1hZ2ljT3BDYXJkQXJyYXlbNV0sIHN0ck1hZ2ljT3BDYXJkQXJyYXlbN11cbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4gdGhpcy5Kb2luQXJyYXkoXG4gICAgICAgICAgICBfLm1hcChfLmNodW5rKG1hZ2ljQXJyYXksIDIpLCAobWFnaWNQYWlyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWFnaWNQYWlyTnVtYmVyID0gXy50b0ludGVnZXIodGhpcy5Kb2luQXJyYXkobWFnaWNQYWlyKSkgKyBHYW1hQ29uc3RhbnQuT1BDQVJEX01BR0lDX1BBSVJfTlVNQkVSO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hZ2ljUGFpclN0cmluZyA9IG1hZ2ljUGFpck51bWJlciA+PSAxMDAgP1xuICAgICAgICAgICAgICAgICAgICBfLnRvU3RyaW5nKG1hZ2ljUGFpck51bWJlciAtIDEwMCkgOiBfLnRvU3RyaW5nKG1hZ2ljUGFpck51bWJlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ucGFkU3RhcnQobWFnaWNQYWlyU3RyaW5nLCAyLCAnMCcpO1xuICAgICAgICAgICAgfSkpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIERlY3J5cHRDYXJkKGNhcmQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzdHJpbmdBcnJheSA9IF8ubWFwKGNhcmQsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhTnVtYmVyID0gXy50b051bWJlcihkYXRhKTtcbiAgICAgICAgICAgIGlmICghXy5pc05hTihhTnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhTnVtYmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEdhbWFIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ0hhdmUgVG8gQWxsIE51bWJlciBJbiBTdHJpbmdzJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoXy5zaXplKHN0cmluZ0FycmF5KSAhPT0gOCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEdhbWFIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ0hhdmUgVG8gRXF1YWwgOCBzaXplJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFnaWNBcnJheTogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgXy5mb3JFYWNoKF8uY2h1bmsoY2FyZCwgMiksIChtYWdpY1BhaXIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hZ2ljUGFpck51bWJlciA9IF8udG9JbnRlZ2VyKHRoaXMuSm9pbkFycmF5KG1hZ2ljUGFpcikpIC0gR2FtYUNvbnN0YW50Lk9QQ0FSRF9NQUdJQ19QQUlSX05VTUJFUjtcbiAgICAgICAgICAgIGNvbnN0IG1hZ2ljUGFpclN0cmluZyA9IG1hZ2ljUGFpck51bWJlciA8IDAgP1xuICAgICAgICAgICAgICAgIF8udG9TdHJpbmcobWFnaWNQYWlyTnVtYmVyICsgMTAwKSA6IF8udG9TdHJpbmcobWFnaWNQYWlyTnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IHBhZFN0YXJ0U3RyaW5nQXJyYXkgPSBfLm1hcChfLnBhZFN0YXJ0KG1hZ2ljUGFpclN0cmluZywgMiwgJzAnKSk7XG4gICAgICAgICAgICBtYWdpY0FycmF5LnB1c2gocGFkU3RhcnRTdHJpbmdBcnJheVswXSk7XG4gICAgICAgICAgICBtYWdpY0FycmF5LnB1c2gocGFkU3RhcnRTdHJpbmdBcnJheVsxXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gXy5wYWRTdGFydChfLnRvU3RyaW5nKF8udG9JbnRlZ2VyKHRoaXMuSm9pbkFycmF5KFtcbiAgICAgICAgICAgIG1hZ2ljQXJyYXlbMV0sIG1hZ2ljQXJyYXlbNF0sXG4gICAgICAgICAgICBtYWdpY0FycmF5WzJdLCBtYWdpY0FycmF5WzVdLFxuICAgICAgICAgICAgbWFnaWNBcnJheVswXSwgbWFnaWNBcnJheVs2XSxcbiAgICAgICAgICAgIG1hZ2ljQXJyYXlbM10sIG1hZ2ljQXJyYXlbN11cbiAgICAgICAgXSkpIC0gR2FtYUNvbnN0YW50Lk9QQ0FSRF9NQUdJQ19OVU1CRVIpLCA4LCAnMCcpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEpvaW5BcnJheShhbnlUaGluZzogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIF8uam9pbihhbnlUaGluZywgJycpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIEVuY3J5cHRBbGdvcml0aG1DYXJkKGNhcmQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjYXJkQXJyYXkgPSBfLm1hcChjYXJkKTtcbiAgICAgICAgY29uc3QgZmlyc3QyVG9BU0NJSSA9IHRoaXMuSm9pbkFycmF5KF8udGFrZShjYXJkQXJyYXksIDIpKTtcbiAgICAgICAgY29uc3QgbGFzdDhUb0VuY3J5cHQgPSB0aGlzLkpvaW5BcnJheShfLnRha2VSaWdodChjYXJkQXJyYXksIDgpKTtcbiAgICAgICAgY29uc3QgYVNDSUlDb2RlU3RyaW5nID0gdGhpcy50b0FTQ0lJQ29kZVN0cmluZyhmaXJzdDJUb0FTQ0lJKTtcbiAgICAgICAgY29uc3QgZW5jcnlwdENhcmRTdHJpbmcgPSB0aGlzLkVuY3J5cHRDYXJkKGxhc3Q4VG9FbmNyeXB0KTtcbiAgICAgICAgY29uc3QgYVNDSUlDYXJkID0gYVNDSUlDb2RlU3RyaW5nICsgZW5jcnlwdENhcmRTdHJpbmc7XG4gICAgICAgIGNvbnN0IGNoZWNrU3VtID0gdGhpcy5HZXRDaGVja1N1bShhU0NJSUNhcmQpO1xuICAgICAgICByZXR1cm4gYVNDSUlDYXJkICsgY2hlY2tTdW07XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRGVjcnlwdEFsZ29yaXRobUNhcmQoY2FyZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNhcmRBcnJheSA9IF8udGFrZShfLm1hcChjYXJkKSwgMTIpO1xuICAgICAgICBjb25zdCBmaXJzdDJGcm9tQVNDSUkgPSB0aGlzLkpvaW5BcnJheShfLnRha2UoY2FyZEFycmF5LCA0KSk7XG4gICAgICAgIGNvbnN0IGxhc3Q4VG9EZWNyeXB0ID0gdGhpcy5Kb2luQXJyYXkoXy50YWtlUmlnaHQoY2FyZEFycmF5LCA4KSk7XG4gICAgICAgIGNvbnN0IGFTQ0lJQ29kZVN0cmluZyA9IHRoaXMuZnJvbUFTQ0lJQ29kZVN0cmluZyhmaXJzdDJGcm9tQVNDSUkpO1xuICAgICAgICBjb25zdCBkZWNyeXB0Q2FyZENhcmRTdHJpbmcgPSB0aGlzLkRlY3J5cHRDYXJkKGxhc3Q4VG9EZWNyeXB0KTtcbiAgICAgICAgcmV0dXJuIGFTQ0lJQ29kZVN0cmluZyArIGRlY3J5cHRDYXJkQ2FyZFN0cmluZztcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBFbmNyeXB0T3JpZ2luYWxDYXJkKGNhcmQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjYXJkQXJyYXkgPSBfLm1hcChjYXJkKTtcbiAgICAgICAgY29uc3QgZmlyc3QyVG9BU0NJSSA9IHRoaXMuSm9pbkFycmF5KF8udGFrZShjYXJkQXJyYXksIDIpKTtcbiAgICAgICAgY29uc3QgbGFzdDhUb0VuY3J5cHQgPSB0aGlzLkpvaW5BcnJheShfLnRha2VSaWdodChjYXJkQXJyYXksIDgpKTtcbiAgICAgICAgY29uc3QgYVNDSUlDb2RlU3RyaW5nID0gdGhpcy50b0FTQ0lJQ29kZVN0cmluZyhmaXJzdDJUb0FTQ0lJKTtcbiAgICAgICAgY29uc3QgYVNDSUlDYXJkID0gYVNDSUlDb2RlU3RyaW5nICsgbGFzdDhUb0VuY3J5cHQ7XG4gICAgICAgIGNvbnN0IGNoZWNrU3VtID0gdGhpcy5HZXRDaGVja1N1bShhU0NJSUNhcmQpO1xuICAgICAgICByZXR1cm4gYVNDSUlDYXJkICsgY2hlY2tTdW07XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgRGVjcnlwdE9yaWdpbmFsQ2FyZChjYXJkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2FyZEFycmF5ID0gXy50YWtlKF8ubWFwKGNhcmQpLCAxMik7XG4gICAgICAgIGNvbnN0IGZpcnN0MkZyb21BU0NJSSA9IHRoaXMuSm9pbkFycmF5KF8udGFrZShjYXJkQXJyYXksIDQpKTtcbiAgICAgICAgY29uc3QgbGFzdDhUb0RlY3J5cHQgPSB0aGlzLkpvaW5BcnJheShfLnRha2VSaWdodChjYXJkQXJyYXksIDgpKTtcbiAgICAgICAgY29uc3QgYVNDSUlDb2RlU3RyaW5nID0gdGhpcy5mcm9tQVNDSUlDb2RlU3RyaW5nKGZpcnN0MkZyb21BU0NJSSk7XG4gICAgICAgIHJldHVybiBhU0NJSUNvZGVTdHJpbmcgKyBsYXN0OFRvRGVjcnlwdDtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnZXRTaG9ydENhcmRTZXJpYWxQcmludEZvcm1hdChjYXJkOiBzdHJpbmcsIGFsZ29yaXQ6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBlbmNyeXB0Q2FyZCA9IGFsZ29yaXQgPyB0aGlzLkVuY3J5cHRBbGdvcml0aG1DYXJkKGNhcmQpIDogdGhpcy5FbmNyeXB0T3JpZ2luYWxDYXJkKGNhcmQpO1xuICAgICAgICByZXR1cm4gR2FtYUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0hFQURfRU1QVFkgKyBlbmNyeXB0Q2FyZCArIEdhbWFDb25zdGFudC5PUENBUkRfUFJJTlRFUl9TSE9SVEVORDtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnZXRMb25nQ2FyZFNlcmlhbFByaW50Rm9ybWF0KGNhcmQ6IHN0cmluZywgYWxnb3JpdDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRDYXJkID0gYWxnb3JpdCA/IHRoaXMuRW5jcnlwdEFsZ29yaXRobUNhcmQoY2FyZCkgOiB0aGlzLkVuY3J5cHRPcmlnaW5hbENhcmQoY2FyZCk7XG4gICAgICAgIGNvbnN0IG1hZ2ljU3RyaW5nID1cbiAgICAgICAgICAgIEdhbWFDb25zdGFudC5PUENBUkRfUFJJTlRFUl9IRUFEX0VNUFRZICsgZW5jcnlwdENhcmQgKyBHYW1hQ29uc3RhbnQuT1BDQVJEX0xPTkdfUFJJTlRFUl9NQUdJQ1NUUklORzE7XG4gICAgICAgIGNvbnN0IG1hZ25ldGljU3RyaXBlQ29kZSA9IEdhbWFDb25zdGFudC5PUENBUkRfTE9OR19QUklOVEVSX01BR0lDU1RSSU5HMiArIGVuY3J5cHRDYXJkO1xuICAgICAgICBjb25zdCBpQ2hlY2tzdW0gPSB0aGlzLkNhcmRTZXJpYWxDaGVja1N1bShtYWduZXRpY1N0cmlwZUNvZGUpO1xuICAgICAgICBpZiAoaUNoZWNrc3VtIDw9IDkpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWdpY1N0cmluZyArIG1hZ25ldGljU3RyaXBlQ29kZSArIF8udG9TdHJpbmcoaUNoZWNrc3VtKSArIEdhbWFDb25zdGFudC5PUENBUkRfUFJJTlRFUl9BRlRFUjlFTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaUNoZWNrc3VtID09PSAxMCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hZ2ljU3RyaW5nICsgbWFnbmV0aWNTdHJpcGVDb2RlICsgR2FtYUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0JFMTBFTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaUNoZWNrc3VtID09PSAxMSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hZ2ljU3RyaW5nICsgbWFnbmV0aWNTdHJpcGVDb2RlICsgR2FtYUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0JFMTFFTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaUNoZWNrc3VtID09PSAxMikge1xuICAgICAgICAgICAgcmV0dXJuIG1hZ2ljU3RyaW5nICsgbWFnbmV0aWNTdHJpcGVDb2RlICsgR2FtYUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0JFMTJFTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaUNoZWNrc3VtID09PSAxMykge1xuICAgICAgICAgICAgcmV0dXJuIG1hZ2ljU3RyaW5nICsgbWFnbmV0aWNTdHJpcGVDb2RlICsgR2FtYUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0JFMTNFTkQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaUNoZWNrc3VtID09PSAxNCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hZ2ljU3RyaW5nICsgbWFnbmV0aWNTdHJpcGVDb2RlICsgR2FtYUNvbnN0YW50Lk9QQ0FSRF9QUklOVEVSX0JFMTRFTkQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTGlic0V4Y2VwdGlvbnMoR2FtYUh0dHBTdGF0dXNDb2RlLlNUQVRVU19GQUlMLCAnTG9uZyBDYXJkU2VyaWFsIFByaW50IEZvcm1hdCBGYWlsJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Y6f5aeL55qEY29kZeaciemAmeWAi+WIpOaWtyzkvYbmmK8uLi4u55uu5YmN55yL6LW35L6G5piv5rC46YGg6LeR5LiN5Yiw6YCZ5YCLMTVcbiAgICAgICAgLy8gZWxzZSBpZiAoaUNoZWNrc3VtID09PSAxNSkge1xuICAgICAgICAvLyAgICAgcmV0dXJuIG1hZ2ljU3RyaW5nICsgbWFnbmV0aWNTdHJpcGVDb2RlICsgQ29uc3RhbnQuT1BDQVJEX1BSSU5URVJfQkUxNUVORDtcbiAgICAgICAgLy8gfVxuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIENhcmRTZXJpYWxDaGVja1N1bShjYXJkOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgY2FyZEFycmF5ID0gXy5tYXAoY2FyZCk7XG4gICAgICAgIGNvbnN0IHRha2VjYXJkU2l6ZSA9IF8uc2l6ZShjYXJkQXJyYXkpIC0gMjtcbiAgICAgICAgY29uc3Qgd2l0aG91dEZyaXN0MkNhcmRBcnJheSA9IF8udGFrZVJpZ2h0KGNhcmRBcnJheSwgdGFrZWNhcmRTaXplKTtcbiAgICAgICAgbGV0IHRlbXAxID0gY2FyZEFycmF5WzBdLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgIGxldCB0ZW1wMiA9IGNhcmRBcnJheVsxXS5jaGFyQ29kZUF0KDApO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxuICAgICAgICBsZXQgY2hlY2tzdW0gPSB0ZW1wMSBeIHRlbXAyO1xuICAgICAgICBfLmZvckVhY2god2l0aG91dEZyaXN0MkNhcmRBcnJheSwgKHN0ckNoYXIpID0+IHtcbiAgICAgICAgICAgIHRlbXAxID0gY2hlY2tzdW07XG4gICAgICAgICAgICB0ZW1wMiA9IHN0ckNoYXIuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1iaXR3aXNlXG4gICAgICAgICAgICBjaGVja3N1bSA9IHRlbXAxIF4gdGVtcDI7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYml0d2lzZVxuICAgICAgICBjaGVja3N1bSA9IGNoZWNrc3VtICYgMTU7XG4gICAgICAgIGlmIChjaGVja3N1bSA9PT0gMTUpIHtcbiAgICAgICAgICAgIGNoZWNrc3VtID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hlY2tzdW07XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TWFnbmV0aWNTdHJpcGVDb2RlKGNhcmQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjYXJkQXJyYXkgPSBfLm1hcChjYXJkKTtcbiAgICAgICAgY29uc3QgY2FyZFNpemUgPSBfLnNpemUoY2FyZEFycmF5KTtcbiAgICAgICAgbGV0IHRha2VDYXJkQ29kZTtcbiAgICAgICAgaWYgKGNhcmRTaXplID4gMTYpIHtcbiAgICAgICAgICAgIHRha2VDYXJkQ29kZSA9IF8udGFrZVJpZ2h0KGNhcmRBcnJheSwgMTUpO1xuICAgICAgICAgICAgdGFrZUNhcmRDb2RlID0gXy50YWtlKHRha2VDYXJkQ29kZSwgMTIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFrZUNhcmRDb2RlID0gXy50YWtlUmlnaHQoY2FyZEFycmF5LCAxNCk7XG4gICAgICAgICAgICB0YWtlQ2FyZENvZGUgPSBfLnRha2UodGFrZUNhcmRDb2RlLCAxMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuSm9pbkFycmF5KHRha2VDYXJkQ29kZSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZG9sbGFyVG9DZW50KHZhbHVlOiBudW1iZXIgfCBCaWdOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIodmFsdWUpLnNoaWZ0ZWRCeSgyKS50b051bWJlcigpO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGNlbnRUb0RvbGxhcih2YWx1ZTogbnVtYmVyIHwgQmlnTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQmlnTnVtYmVyKHZhbHVlKS5kaXYoMTAwKS50b051bWJlcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorormlbhrZXnlkb3lkI11c2UgXy5jYW1lbENhc2VcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHthbnl9IG9ialxuICAgICAqIEByZXR1cm5zXG4gICAgICogQGF1dGhvciBNaWtlbGlcbiAgICAgKiBAbWVtYmVyT2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRlZXBseVRvQ2FtZWxDYXNlKG9iaikge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iai5tYXAoKHYpID0+IEdhbWFVdGlscy5kZWVwbHlUb0NhbWVsQ2FzZSh2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8ucmVkdWNlKG9iaiwgKHIsIHYsIGspID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ucixcbiAgICAgICAgICAgICAgICBbXy5sb3dlckZpcnN0KGspXTogR2FtYVV0aWxzLmRlZXBseVRvQ2FtZWxDYXNlKHYpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuiuaVuGtleeWRveWQjXVzZSBfLnVwcGVyQ2FtZWxDYXNlXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7YW55fSBvYmpcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBhdXRob3IgTWlrZWxpXG4gICAgICogQG1lbWJlck9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkZWVwbHlUb1VwcGVyQ2FtZWxDYXNlKG9iaikge1xuICAgICAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSB8fCBvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9iai5tYXAoKHYpID0+IEdhbWFVdGlscy5kZWVwbHlUb1VwcGVyQ2FtZWxDYXNlKHYpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5yZWR1Y2Uob2JqLCAociwgdiwgaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5yLFxuICAgICAgICAgICAgICAgIFtfLnVwcGVyRmlyc3QoayldOiBHYW1hVXRpbHMuZGVlcGx5VG9VcHBlckNhbWVsQ2FzZSh2KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwge30pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDkvb/nlKhBRVNfMTI4X0VDQiDliqDlr4ZcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEg6KaB5Yqg5a+G55qE6LOH5paZIOWPquiDvXN0cmluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlY2JLZXkg6aCQ6Kit5piv5oiR5YCR55qE5a+G56K8LOeVtueEtuWPr+S7pei8uOWFpeiHquW3seaDs+imgeS9v+eUqOeahOWvhueivFxuICAgICAqIEByZXR1cm5zIOWKoOWvhuW+jOeahHN0cmluZ1xuICAgICAqIEBtZW1iZXJPZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgRW5jcnlwdGlvbl9BRVNfRUNCXzEyOChkYXRhOiBzdHJpbmcsIGVjYktleTogc3RyaW5nID0gR2FtYUNvbnN0YW50LkFFU18xMjhfRUNCX0tFWSkge1xuICAgICAgICBjb25zdCBjaXBoZXJDaHVua3M6IGFueVtdID0gW107XG4gICAgICAgIGNvbnN0IGNpcGhlciA9IGNyeXB0by5jcmVhdGVDaXBoZXJpdihcbiAgICAgICAgICAgIEdhbWFDb25zdGFudC5BRVNfQ0lQSEVSLFxuICAgICAgICAgICAgbmV3IEJ1ZmZlcihlY2JLZXkpLFxuICAgICAgICAgICAgR2FtYUNvbnN0YW50LkFFU19DSVBIRVJfSVYpO1xuICAgICAgICBjaXBoZXIuc2V0QXV0b1BhZGRpbmcodHJ1ZSk7XG4gICAgICAgIGNpcGhlckNodW5rcy5wdXNoKFxuICAgICAgICAgICAgY2lwaGVyLnVwZGF0ZShkYXRhLCBHYW1hQ29uc3RhbnQuQUVTX0NMRUFSX0VOQ09ESU5HLCBHYW1hQ29uc3RhbnQuQUVTX0NJUEhFUl9FTkNPRElORylcbiAgICAgICAgKTtcbiAgICAgICAgY2lwaGVyQ2h1bmtzLnB1c2goXG4gICAgICAgICAgICBjaXBoZXIuZmluYWwoR2FtYUNvbnN0YW50LkFFU19DSVBIRVJfRU5DT0RJTkcpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBjaXBoZXJDaHVua3Muam9pbignJykudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5L2/55SoQUVTXzEyOF9FQ0Ig6Kej5a+GXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIOimgeino+WvhueahOizh+aWmSBzdHJpbmdcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZWNiS2V5IOmgkOioreaYr+aIkeWAkeeahOWvhueivCznlbbnhLblj6/ku6XovLjlhaXoh6rlt7Hmg7PopoHkvb/nlKjnmoTlr4bnorxcbiAgICAgKiBAcmV0dXJucyDop6Plr4blvoznmoRzdHJpbmdcbiAgICAgKiBAbWVtYmVyT2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIERlY3J5cHRpb25fQUVTX0VDQl8xMjgoZGF0YTogc3RyaW5nLCBlY2JLZXk6IHN0cmluZyA9IEdhbWFDb25zdGFudC5BRVNfMTI4X0VDQl9LRVkpIHtcbiAgICAgICAgY29uc3QgY2lwaGVyQ2h1bmtzOiBhbnlbXSA9IFtdO1xuICAgICAgICBjb25zdCBkZWNpcGhlciA9IGNyeXB0by5jcmVhdGVEZWNpcGhlcml2KFxuICAgICAgICAgICAgR2FtYUNvbnN0YW50LkFFU19DSVBIRVIsXG4gICAgICAgICAgICBuZXcgQnVmZmVyKGVjYktleSksXG4gICAgICAgICAgICBHYW1hQ29uc3RhbnQuQUVTX0NJUEhFUl9JVik7XG4gICAgICAgIGRlY2lwaGVyLnNldEF1dG9QYWRkaW5nKHRydWUpO1xuXG4gICAgICAgIGNpcGhlckNodW5rcy5wdXNoKFxuICAgICAgICAgICAgZGVjaXBoZXIudXBkYXRlKGRhdGEsIEdhbWFDb25zdGFudC5BRVNfQ0lQSEVSX0VOQ09ESU5HLCBHYW1hQ29uc3RhbnQuQUVTX0NMRUFSX0VOQ09ESU5HKVxuICAgICAgICApO1xuICAgICAgICBjaXBoZXJDaHVua3MucHVzaChcbiAgICAgICAgICAgIGRlY2lwaGVyLmZpbmFsKEdhbWFDb25zdGFudC5BRVNfQ0xFQVJfRU5DT0RJTkcpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBjaXBoZXJDaHVua3Muam9pbignJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWIpOaWt+aYr+WBtuaVuOmChOaYr+Wlh+aVuFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0g6ZyA6KaB5pW05pW4XG4gICAgICogQHJldHVybnNcbiAgICAgKiBAbWVtYmVyT2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNoZWNrTnVtYmVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEdhbWFIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ2NoZWNrTnVtYmVyKCkgbXVzdCBoYXZlIHRvIGludGVnZXInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHZhbHVlICYgMSkgPT09IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvdW50IG9jY3VycmVuY2VzIG9mIGEgdmFsdWUgaW4gYXJyYXlcbiAgICAgKiDlj5blh7rmlbjntYTkuK3mjIflrprnmoTmlbjlgLws6YeN6KSH55qE5qyh5pW4XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IOaVuOWtl+mZo+WIl1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSDmlbjlrZdcbiAgICAgKiBAcmV0dXJuc1xuICAgICAqIEBtZW1iZXJPZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY291bnRPY2N1cnJlbmNlcyhhcnI6IG51bWJlcltdLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBhcnIucmVkdWNlKChhLCB2KSA9PiB2ID09PSB2YWx1ZSA/IGEgKyAxIDogYSArIDAsIDApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDoqIjnrpfpmaPliJflhafnmoTntJTmlbjntYTmnIDlvozovYnmj5vmiJBCaWdOdW1iZXJcbiAgICAgKiDmnKzkvobmmK/nm7TmjqXkvb/nlKhyZWR1Y2VcbiAgICAgKiDkvYbmmK/ml6LnhLbmmK/lsIHoo53pgY7lvoznmoTmlrnlvI/lsLHmjqHnlKjmnIDljp/lp4vlv6vpgJ/nmoRmb3LkvoboqIjnrpdcbiAgICAgKiDmuKzoqabnlKjkvovmnInkvb/nlKjkuIDlgIszMDDokKznmoTntJTmlbjntYTkvobmuKzoqaZcbiAgICAgKiDntJTmlbjlrZfkuI3nlKjpmrHlvI/ovYnlnovkuItyZWR1Y2Xmr5TovIPlv6tcbiAgICAgKiDopoHpmrHlvI/ovYnlnovljp/lp4tmb3Lmr5TovIPlv6tcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHsobnVtYmVyW10gfCBzdHJpbmdbXSB8IEJpZ051bWJlcltdKX0gYXJyYXlcbiAgICAgKiBAcmV0dXJucyB7QmlnTnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkQXJyYXkoYXJyYXk6IG51bWJlcltdIHwgc3RyaW5nW10gfCBCaWdOdW1iZXJbXSk6IEJpZ051bWJlciB7XG4gICAgICAgIGxldCBmaW5hbCA9IG5ldyBCaWdOdW1iZXIoMCk7XG4gICAgICAgIGZvciAobGV0IG4gb2YgYXJyYXkpIHtcbiAgICAgICAgICAgIG4gPSBuZXcgQmlnTnVtYmVyKG4pO1xuICAgICAgICAgICAgZmluYWwgPSBmaW5hbC5wbHVzKG4uaXNOYU4oKSA/IDAgOiBuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmluYWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmeWAi+aYr+WBmnJlZHVjZeeahOaWueW8j+S+humBlOWIsOi3n2FkZEFycmF56KOh6Z2iZm9y5LiA5qij55qE5oiQ5p6cXG4gICAgICog5Zyo5Zau5YWD5ris6Kmm55qE5pmC5YCZ5Y+v5Lul55yL5Yiw5beu55WwXG4gICAgICog5Y+m5aSW5ZyoYXJyYXkucmVkdWNl55qE5o6l5Y+j5LiK5LiN6IO95YWB6Kixc3RyaW5nIHRvIG51bWJlcueahOmZo+WIl1xuICAgICAqIOWPpuWkluWcqOepuumWk+S4iueahOWvq+azleS4iuW/hemgiG5ld+WFqeasoUJpZ051bWJlcuS5n+acg+WwjuiHtOepuumWk+eahOa1quiyu1xuICAgICAqIOW8leeZvOS4jeW/heimgeeahEdD5b2x6Z+/5pWI6IO9XG4gICAgICog57SU5pW45a2X5LiN55So6Zqx5byP6L2J5Z6L5LiLcmVkdWNl5q+U6LyD5b+rXG4gICAgICog6KaB6Zqx5byP6L2J5Z6L5Y6f5aeLZm9y5q+U6LyD5b+rXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwYXJhbSB7KG51bWJlcltdIHwgc3RyaW5nW10gfCBCaWdOdW1iZXJbXSl9IGFycmF5XG4gICAgICogQHJldHVybnMge0JpZ051bWJlcn1cbiAgICAgKiBAbWVtYmVyb2YgVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEFycmF5UmVkdWNlKGFycmF5OiBhbnlbXSk6IEJpZ051bWJlciB7XG4gICAgICAgIHJldHVybiBhcnJheS5yZWR1Y2UoKHByZSwgY3VyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihwcmUpLnBsdXMobmV3IEJpZ051bWJlcihjdXIpLmlzTmFOKCkgPyAwIDogY3VyKTtcbiAgICAgICAgfSwgbmV3IEJpZ051bWJlcigwKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmeWAi+aWueazleS4u+imgeaYr+WPluWHuuS4gOWAi+eJqeS7tumZo+WIl+WFp+aMh+WumueahGZpZWxk5L6G5YGa5Yqg57i9XG4gICAgICogQHBhcmFtIGFycmF5XG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHJldHVybnMge0JpZ051bWJlcn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZFRoaXNGaWVsZChhcnJheTogYW55W10sIGZpZWxkOiBzdHJpbmcpOiBCaWdOdW1iZXIge1xuICAgICAgICBpZiAoXy5zaXplKGFycmF5KSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkQXJyYXkoXy5tYXAoYXJyYXksIGZpZWxkKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmeWAi+aWueazleaYr+eCuuS6huimgeWBmuWIsOS4gOWAi+eJqeS7tumZo+WIl+ijoemdolxuICAgICAqIOaKiumAmeWAi+eJqeS7tueahGZpZWxkMSB4IGZpZWxkMiDmnIDlvozlnKjmiorpgJnlgIvnm7jkuZjlvoznmoTmlbjlrZfnm7jliqBcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJyYXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGQxXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkMlxuICAgICAqIEByZXR1cm5zIHtCaWdOdW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRUaGlzRmllbGQxeEZpZWxkMihhcnJheTogYW55W10sIGZpZWxkMTogc3RyaW5nLCBmaWVsZDI6IHN0cmluZyk6IEJpZ051bWJlciB7XG4gICAgICAgIGlmIChfLnNpemUoYXJyYXkpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcigwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hZGRBcnJheShfLm1hcChhcnJheSwgKGFEYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5GaWVsZDEgPSBfLnRvTnVtYmVyKGFEYXRhW2ZpZWxkMV0pO1xuICAgICAgICAgICAgY29uc3QgbkZpZWxkMiA9IF8udG9OdW1iZXIoYURhdGFbZmllbGQyXSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcihfLmlzTmFOKG5GaWVsZDEpID8gMCA6IG5GaWVsZDEpLnRpbWVzKF8uaXNOYU4obkZpZWxkMikgPyAwIDogbkZpZWxkMik7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5YCL5pa55rOV5piv54K65LqG6Ieq5YuV5Y+W5Ye65LiA5YCL54mp5Lu26Zmj5YiX5YWn56ym5ZCI5qKd5Lu255qE54mp5Lu2XG4gICAgICog6YeN57WE6YCZ5YCL6Zmj5YiX5YaN5Y+W5Ye65oOz6KaB6KiI566X5Yqg57i955qEZmllbGRcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJyYXlcbiAgICAgKiBAcGFyYW0geyp9IGZpbHRlckNvbmRpdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICAgICAqIEByZXR1cm5zIHtCaWdOdW1iZXJ9XG4gICAgICogQG1lbWJlcm9mIFV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhZGRUaGlzRmllbGRBdXRvRmlsdGVyKGFycmF5OiBhbnlbXSwgZmlsdGVyQ29uZGl0aW9uOiBhbnksIGZpZWxkOiBzdHJpbmcpOiBCaWdOdW1iZXIge1xuICAgICAgICBpZiAoXy5zaXplKGFycmF5KSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCaWdOdW1iZXIoMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkVGhpc0ZpZWxkKF8uZmlsdGVyKGFycmF5LCBmaWx0ZXJDb25kaXRpb24pLCBmaWVsZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmeWAi+aWueazleaYr+eCuuS6huiHquWLleWPluWHuuS4gOWAi+eJqeS7tumZo+WIl+WFp+espuWQiOaineS7tueahOeJqeS7tlxuICAgICAqIOmHjee1hOmAmeWAi+mZo+WIl+WGjeWPluWHuuavj+WAi+eJqeS7tuWFp2ZpZWxkMSB4IGZpZWxkMlxuICAgICAqIOWGjei/lOWbnuaWsOeahOebuOS5mOmBjueahOe0lOaVuOe1hOacgOW+jOWGjeaKiuebuOS5mOeahOaVuOe1hOWKoOe4vVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcnJheVxuICAgICAqIEBwYXJhbSB7Kn0gZmlsdGVyQ29uZGl0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkMVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZDJcbiAgICAgKiBAcmV0dXJucyB7QmlnTnVtYmVyfVxuICAgICAqIEBtZW1iZXJvZiBVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkRmllbGQxeEZpZWxkMkF1dG9GaWx0ZXIoXG4gICAgICAgIGFycmF5OiBhbnlbXSwgZmlsdGVyQ29uZGl0aW9uOiBhbnksIGZpZWxkMTogc3RyaW5nLCBmaWVsZDI6IHN0cmluZyk6IEJpZ051bWJlciB7XG4gICAgICAgIGlmIChfLnNpemUoYXJyYXkpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJpZ051bWJlcigwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hZGRUaGlzRmllbGQxeEZpZWxkMihfLmZpbHRlcihhcnJheSwgZmlsdGVyQ29uZGl0aW9uKSwgZmllbGQxLCBmaWVsZDIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlgIvmlrnms5XkuLvopoHmmK/opoHnlKLnlJ/mlrDnmoRPYmplY3RcbiAgICAgKiDlhanlgIvpmaPliJfplbfluqbopoHkuIDmqKPkuI3nhLbmnIPloLHpjK9cbiAgICAgKiDmnIDlvoznlKLlh7rnmoRPYmplY3TmnIPmiopVbmRlZmluZWTlsI3mh4nnmoTmiJDlk6HliZTpmaTmjolcbiAgICAgKiBrZXlzOiBbJ2EnLCAnYicsICdjJywgJ2QnXVxuICAgICAqIHZhbHVlczogWzEsICdmZicsIDIsIFVuZGVmaW5lZF1cbiAgICAgKiByZXR1cm5zOiB7YTogMSwgYjogJ2ZmJywgYzogMn1cbiAgICAgKiDmnKzkvoYgIGQ6IFVuZGVmaW5lZCAg6YCZ5YCL5bGs5oCn5pyD6KKr5YmD6Zmk5o6JXG4gICAgICogQHBhcmFtIHsoc3RyaW5nIHwgc3RyaW5nW10pfSBrZXlzIOmAmeijoeaYr2tleXPnmoTpmaPliJdcbiAgICAgKiBAcGFyYW0geyhhbnkgfCBhbnlbXSl9IHZhbHVlcyDpgJnoo6HmmK92YWx1ZXPnmoTpmaPliJdcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0IHwgYW55fVxuICAgICAqIEBtZW1iZXJvZiBHYW1hVXRpbHNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFR3b0FycmF5VG9PYmooa2V5czogc3RyaW5nIHwgc3RyaW5nW10sIHZhbHVlczogYW55IHwgYW55W10pOiBhbnkge1xuICAgICAgICBpZiAoXy5zaXplKGtleXMpICE9PSBfLnNpemUodmFsdWVzKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEdhbWFIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCxcbiAgICAgICAgICAgICAgICAnR2FtYVV0aWxzLlR3b0FycmF5VG9PYmooKSBrZXlzIGFuZCB2YWx1ZXMgc2l6ZSBub3QgZXF1YWwnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5vbWl0QnkoXy56aXBPYmplY3Qoa2V5cywgdmFsdWVzKSwgXy5pc1VuZGVmaW5lZCkgYXMgYW55O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlgIvmlrnms5XkuLvopoHmmK/opoHnlKLnlJ/mlrDnmoRPYmplY3RcbiAgICAgKiBhcnJheTogW1snYScsIDFdLCBbJ2InLCAyXSwgWydjJywgVW5kZWZpbmVkXSwgWydkJywgJ2ZmJ11dXG4gICAgICogcmV0dXJuczoge2E6IDEsIGI6IDIsIGM6IFVuZGVmaW5lZCwgZDogJ2ZmJ31cbiAgICAgKiBAcGFyYW0gYXJyYXkg6YCZ5YCLYXJyYXkg6ZyA6KaB5q+P5YCL57WE6YO95piv5LiA5YCL5bCN5oeJ55qE6Zmj5YiX57WEXG4gICAgICogQHJldHVybnMge09iamVjdCB8IGFueX1cbiAgICAgKiBAbWVtYmVyb2YgR2FtYVV0aWxzXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBPbmVBcnJheVRvT2JqKGFycmF5OiBhbnlbXSk6IGFueSB7XG4gICAgICAgIHJldHVybiBfLmZyb21QYWlycyhhcnJheSkgYXMgYW55O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDpgJnlgIvmlrnms5XkuLvopoHmmK/nlKLnlJ/mlrDnpajnmoTmmYLlgJnopoHntabnmoTlsI3mh4nmlbjlrZdcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRpY2tldFZhbGlkYXRpb25JZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aWNrZXRTZWVkU2VxTnVtXG4gICAgICogQHJldHVybnMge3N0cmluZ30g55Si55Sf5a6M55qE5pW45a2XXG4gICAgICogQG1lbWJlcm9mIEdhbWFVdGlsc1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VGlja2V0U0VWYWxpZE51bSh0aWNrZXRWYWxpZGF0aW9uSWQ6IG51bWJlciwgdGlja2V0U2VlZFNlcU51bTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHRpY2tldFZhbGlkYXRpb25JZCkgfHwgIU51bWJlci5pc0ludGVnZXIodGlja2V0U2VlZFNlcU51bSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhHYW1hSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsXG4gICAgICAgICAgICAgICAgJ0dhbWFVdGlscy5nZVRpY2tldFNFVmFsaWROdW0oKSB0aWNrZXRWYWxpZGF0aW9uSWQgfHwgdGlja2V0U2VlZFNlcU51bSBoYXZlIHRvIGJlIEludGVnZXInKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBfRUdNVmFsaWRJREJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSg0KS5maWxsKDApO1xuICAgICAgICBjb25zdCBjdXJyZW50U2VxTnVtQnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKDQpLmZpbGwoMCk7XG4gICAgICAgIF9FR01WYWxpZElEQnVmZmVyLndyaXRlSW50MzJMRSh0aWNrZXRWYWxpZGF0aW9uSWQsIDApO1xuICAgICAgICBjdXJyZW50U2VxTnVtQnVmZmVyLndyaXRlSW50MzJMRSh0aWNrZXRTZWVkU2VxTnVtLCAwKTtcbiAgICAgICAgY29uc3QgYnVmZkFycmF5OiBCdWZmZXJbXSA9IFtdO1xuICAgICAgICAvLyBbMF1bMF0sIFswXVsxXVxuICAgICAgICBidWZmQXJyYXkucHVzaCh0aGlzLmNvbXB1dGVDUkMxNkNDSVRUKEJ1ZmZlci5mcm9tKFtcbiAgICAgICAgICAgIF9FR01WYWxpZElEQnVmZmVyWzFdIF4gY3VycmVudFNlcU51bUJ1ZmZlclswXSxcbiAgICAgICAgICAgIF9FR01WYWxpZElEQnVmZmVyWzJdIF4gY3VycmVudFNlcU51bUJ1ZmZlclsxXVxuICAgICAgICBdKSwgMCkpO1xuICAgICAgICAvLyBbMV1bMF0sIFsxXVsxXVxuICAgICAgICBidWZmQXJyYXkucHVzaCh0aGlzLmNvbXB1dGVDUkMxNkNDSVRUKEJ1ZmZlci5mcm9tKFtcbiAgICAgICAgICAgIGN1cnJlbnRTZXFOdW1CdWZmZXJbMl0gXiBjdXJyZW50U2VxTnVtQnVmZmVyWzBdLFxuICAgICAgICAgICAgX0VHTVZhbGlkSURCdWZmZXJbMF0gXiBjdXJyZW50U2VxTnVtQnVmZmVyWzFdXG4gICAgICAgIF0pLCAwKSk7XG4gICAgICAgIC8vIFsyXVswXSwgWzJdWzFdXG4gICAgICAgIGJ1ZmZBcnJheS5wdXNoKHRoaXMuY29tcHV0ZUNSQzE2Q0NJVFQoQnVmZmVyLmZyb20oW1xuICAgICAgICAgICAgY3VycmVudFNlcU51bUJ1ZmZlclswXSxcbiAgICAgICAgICAgIGN1cnJlbnRTZXFOdW1CdWZmZXJbMV1cbiAgICAgICAgXSksIDApKTtcbiAgICAgICAgbGV0IGludEJ5dGVCdWZmZXIgPSBCdWZmZXIuZnJvbShbMCwgYnVmZkFycmF5WzBdWzBdLCBidWZmQXJyYXlbMF1bMV0sIGJ1ZmZBcnJheVsxXVswXV0pO1xuICAgICAgICBsZXQgdGVtcDQgPSB0aGlzLmRlY2ltYWxEaWdpdHMoaW50Qnl0ZUJ1ZmZlci5yZWFkSW50MzJCRSgwKSk7XG4gICAgICAgIGludEJ5dGVCdWZmZXIgPSBCdWZmZXIuZnJvbShbMCwgYnVmZkFycmF5WzFdWzFdLCBidWZmQXJyYXlbMl1bMF0sIGJ1ZmZBcnJheVsyXVsxXV0pO1xuICAgICAgICB0ZW1wNCA9IHRlbXA0LmNvbmNhdCh0aGlzLmRlY2ltYWxEaWdpdHMoaW50Qnl0ZUJ1ZmZlci5yZWFkSW50MzJCRSgwKSkpO1xuICAgICAgICBsZXQgc3VtMSA9IDA7XG4gICAgICAgIGxldCBzdW0yID0gMDtcbiAgICAgICAgZm9yIChsZXQgaTEgPSAwLCBpMiA9IDg7IGkxIDwgODsgaTErKyAsIGkyKyspIHtcbiAgICAgICAgICAgIHN1bTEgKz0gdGVtcDRbaTFdO1xuICAgICAgICAgICAgc3VtMiArPSB0ZW1wNFtpMl07XG4gICAgICAgIH1cbiAgICAgICAgdGVtcDRbMF0gfD0gc3VtMSAlIDUgPDwgMTtcbiAgICAgICAgdGVtcDRbOF0gfD0gc3VtMiAlIDUgPDwgMTtcbiAgICAgICAgcmV0dXJuIHRlbXA0LnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlICsgY3VycmVudFZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH0sICcwMCcpO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBkZWNpbWFsRGlnaXRzKG46IG51bWJlcik6IG51bWJlcltdIHtcbiAgICAgICAgY29uc3QgZGlnaXRzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSA3OyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKG4gPiAwKSB7XG4gICAgICAgICAgICAgICAgZGlnaXRzW2ldID0gbiAlIDEwO1xuICAgICAgICAgICAgICAgIG4gPSBNYXRoLmZsb29yKG4gLyAxMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpZ2l0c1tpXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlnaXRzO1xuICAgIH1cbiAgICBwcml2YXRlIHN0YXRpYyBjb21wdXRlQ1JDMTZDQ0lUVChieXRlc0J1ZmZlcjogQnVmZmVyLCBzZWVkOiBudW1iZXIpOiBCdWZmZXIge1xuICAgICAgICBjb25zdCBDUkNfS0VZMSA9IDBvMTc7XG4gICAgICAgIGNvbnN0IENSQ19LRVkyID0gMG8xMDIwMTtcblxuICAgICAgICBsZXQgYyA9IHNlZWQ7XG4gICAgICAgIGxldCBxID0gc2VlZDtcbiAgICAgICAgbGV0IGNyY1ZhbHVlID0gc2VlZDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIpLmZpbGwoMCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBieXRlc0J1ZmZlci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGMgPSBieXRlc0J1ZmZlcltpXTtcbiAgICAgICAgICAgIHEgPSAoY3JjVmFsdWUgXiBjKSAmIENSQ19LRVkxO1xuICAgICAgICAgICAgY3JjVmFsdWUgPSAoY3JjVmFsdWUgPj4gNCkgXiAocSAqIENSQ19LRVkyKTtcbiAgICAgICAgICAgIHEgPSAoY3JjVmFsdWUgXiAoYyA+PiA0KSkgJiBDUkNfS0VZMTtcbiAgICAgICAgICAgIGNyY1ZhbHVlID0gKGNyY1ZhbHVlID4+IDQpIF4gKHEgKiBDUkNfS0VZMik7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQud3JpdGVVSW50MTZCRShjcmNWYWx1ZSwgMCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIl19