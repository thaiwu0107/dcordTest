/// <reference types="node" />
import { BigNumber } from 'bignumber.js';
import { GamaConstant } from '../config/GamaConstant';
import { IString } from '../models/IGamaContext';
export declare type F = (data: any) => any;
export declare type A = any[] | any;
export default class GamaUtils {
    static loopSyncAsyncFun<T>(array: any[], asyncFun: F): Promise<T[]>;
    static loopAsyncAsyncFun<T>(array: any[], asyncFun: F): Promise<T[]>;
    /**
     * 尋找檔案位子
     * @static
     * @param {any} fileName 檔案名稱
     * @param {any} filedir 沒有指定就是預設'sqlTemplate/  底下'
     * @param {any} [filePath] 真實檔案位子可能為libs或是src/dist等等使用的位子
     * @returns 真正檔案的位子
     * @memberof Utils
     */
    static getPath(fileName: any, filedir?: any, filePath?: any): Promise<any>;
    static isNumber(x: any): x is number;
    static isString(x: any): x is string;
    /**
     * 併發處理
     * @param {(Array<Promise<any>> | Array<Promise<any[]>>)} arrayPromise 可以塞一起併發的Promise
     * @returns 一起解決的(Array<Promise<any>> | Array<Promise<any[]>>)
     * @memberof Utils
     */
    static AsyncAll(arrayPromise: Array<Promise<A>>): Promise<A>;
    static BuffArrayToBase64(data: any): string;
    static Base64ToBuffArray(data: any): Buffer;
    static SQLBinary(data: any): Buffer;
    static EmptyBase64ToBuffArray(): Buffer;
    static EmptyBuffArrayToBase64(): GamaConstant;
    /**
     * 解析物件陣列，將物件內all value組成以空白組成字串
     * 再將上述之字串以逗號相連接
     * @param any[]
     * @returns string
     * @memberof Utils
     */
    static objToString(objs: any[]): string;
    /**
     * memberId to MemberSerial And SectionSerial
     * @param string
     * @returns string
     * @memberof Utils
     */
    static MemberIdToMemberSerialAndSectionSerial(memberId: IString | string): {
        memberSerial: string;
        sectionSerial: string;
    };
    /**
     * Validate string
     * @param string
     * @returns string
     * @memberof Utils
     */
    static validateString(value: any, paramName: string): any;
    /**
     * Validate number
     * @param number
     * @returns number
     * @memberof Utils
     */
    static validateNumber(value: any, paramName: string): any;
    /**
     * Validate boolean
     * @param boolean
     * @returns boolean
     * @memberof Utils
     */
    static validateBoolean(value: any, paramName: string): any;
    /**
     * Validate Date
     * @param Date
     * @returns Date
     * @memberof Utils
     */
    static validateDate(value: any, paramName: string): any;
    static resultMessage(msg: string): {
        message: string;
    };
    static DBTimeFormat(time: Date | string): string;
    static DateTimeFormat(time: Date | string): string;
    static PDFTimeFormat(time: Date | string | number): string;
    static BirthdayTimeFormat(time: Date | string): string;
    static PDFHoursTimeFormat(time: Date | string): string;
    static TakeFirstOrEmpty(anyThing: any[]): any;
    static GetCheckSum(sASCIICardSerial: string): number;
    static toASCIICodeArray(toASCII: string): number[];
    static toASCIICodeString(toASCII: string): string;
    static fromASCIICodeArray(fromASCII: string[]): string[];
    static fromASCIICodeString(fromASCII: string): string;
    static EncryptCard(card: string): string;
    static DecryptCard(card: string): string;
    static JoinArray(anyThing: any[]): string;
    static EncryptAlgorithmCard(card: string): string;
    static DecryptAlgorithmCard(card: string): string;
    static EncryptOriginalCard(card: string): string;
    static DecryptOriginalCard(card: string): string;
    static getShortCardSerialPrintFormat(card: string, algorit?: boolean): string;
    static getLongCardSerialPrintFormat(card: string, algorit?: boolean): string;
    static CardSerialCheckSum(card: string): number;
    static getMagneticStripeCode(card: string): string;
    static dollarToCent(value: number | BigNumber): number;
    static centToDollar(value: number | BigNumber): number;
    /**
     * 變數key命名use _.camelCase
     * @static
     * @param {any} obj
     * @returns
     * @author Mikeli
     * @memberOf Utils
     */
    static deeplyToCamelCase(obj: any): any;
    /**
     * 變數key命名use _.upperCamelCase
     * @static
     * @param {any} obj
     * @returns
     * @author Mikeli
     * @memberOf Utils
     */
    static deeplyToUpperCamelCase(obj: any): any;
    /**
     * 使用AES_128_ECB 加密
     * @static
     * @param {string} data 要加密的資料 只能string
     * @param {string} ecbKey 預設是我們的密碼,當然可以輸入自己想要使用的密碼
     * @returns 加密後的string
     * @memberOf Utils
     */
    static Encryption_AES_ECB_128(data: string, ecbKey?: string): string;
    /**
     * 使用AES_128_ECB 解密
     * @static
     * @param {string} data 要解密的資料 string
     * @param {string} ecbKey 預設是我們的密碼,當然可以輸入自己想要使用的密碼
     * @returns 解密後的string
     * @memberOf Utils
     */
    static Decryption_AES_ECB_128(data: string, ecbKey?: string): string;
    /**
     * 判斷是偶數還是奇數
     * @static
     * @param {number} 需要整數
     * @returns
     * @memberOf Utils
     */
    static checkNumber(value: number): boolean;
    /**
     * Count occurrences of a value in array
     * 取出數組中指定的數值,重複的次數
     * @static
     * @param {number[]} 數字陣列
     * @param {number} 數字
     * @returns
     * @memberOf Utils
     */
    static countOccurrences(arr: number[], value: number): number;
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
    static addArray(array: number[] | string[] | BigNumber[]): BigNumber;
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
    static addArrayReduce(array: any[]): BigNumber;
    /**
     * 這個方法主要是取出一個物件陣列內指定的field來做加總
     * @param array
     * @param field
     * @returns {BigNumber}
     */
    static addThisField(array: any[], field: string): BigNumber;
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
    static addThisField1xField2(array: any[], field1: string, field2: string): BigNumber;
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
    static addThisFieldAutoFilter(array: any[], filterCondition: any, field: string): BigNumber;
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
    static addField1xField2AutoFilter(array: any[], filterCondition: any, field1: string, field2: string): BigNumber;
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
    static TwoArrayToObj(keys: string | string[], values: any | any[]): any;
    /**
     * 這個方法主要是要產生新的Object
     * array: [['a', 1], ['b', 2], ['c', Undefined], ['d', 'ff']]
     * returns: {a: 1, b: 2, c: Undefined, d: 'ff'}
     * @param array 這個array 需要每個組都是一個對應的陣列組
     * @returns {Object | any}
     * @memberof GamaUtils
     */
    static OneArrayToObj(array: any[]): any;
    /**
     * 這個方法主要是產生新票的時候要給的對應數字
     * @static
     * @param {number} ticketValidationId
     * @param {number} ticketSeedSeqNum
     * @returns {string} 產生完的數字
     * @memberof GamaUtils
     */
    static getTicketSEValidNum(ticketValidationId: number, ticketSeedSeqNum: number): string;
    private static decimalDigits;
    private static computeCRC16CCITT;
}
