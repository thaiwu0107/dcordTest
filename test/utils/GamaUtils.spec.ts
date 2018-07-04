import { expect, should } from 'chai';
import * as _ from 'lodash';
import * as moment from 'moment';
import { anything, capture, instance, mock, reset, verify, when } from 'ts-mockito';
import { GamaConstant } from '../../src/config/GamaConstant';
import { GamaHttpStatusCode } from '../../src/config/GamaHttpStatusCode';
import { IString } from '../../src/models/IGamaContext';
import GamaUtils from '../../src/Utils/GamaUtils';
/**
 * SQLHelper的單元測試,不需要用到mock直接new 出來測試進入跟出去對不對就好
 * 因為他沒有任何依賴
 */
describe('GamaUtils', () => {
    let buffer;
    let eBuffer;
    let eBase64;
    let base64;
    let base64ToBuffer;
    let buffToBase64;
    let expectDone;
    const _3MillionNumberArray = _.fill(Array(3000000), 2);
    const _3MillionStringArray = _.fill(Array(3000000), '2');
    const expected = (target?: any, message?: string) => {
        expectDone = true;
        return expect(target, message);
    };
    beforeEach(() => {
        expectDone = false;
        buffer = new Buffer('test');
        eBuffer = new Buffer(' ');
        // tslint:disable-next-line:max-line-length
        eBase64 = GamaConstant.NO_IMAGE;
        base64 = new Buffer(buffer, 'binary').toString('base64');
        base64ToBuffer = new Buffer(base64, 'base64');
        buffToBase64 = new Buffer(base64ToBuffer as any, 'binary').toString('base64');
    });
    afterEach('這個方法有寫驗證但是沒有驗證到', () => {
        // tslint:disable-next-line:no-unused-expression
        expect(expectDone).to.true;
    });
    describe('1.BuffArrayToBase64', () => {
        it('1.BuffArrayToBase64', () => {
            const get = GamaUtils.BuffArrayToBase64(buffer);
            expected(get).to.equal(base64);
        });
    });
    describe('2.Base64ToBuffArray', () => {
        it('2.Base64ToBuffArray', () => {
            const get = GamaUtils.Base64ToBuffArray(base64);
            expected(get).to.eql(buffer);
        });
    });
    describe('3.EmptyBase64ToBuffArray', () => {
        it('3.EmptyBase64ToBuffArray', () => {
            const get = GamaUtils.EmptyBase64ToBuffArray();
            expected(get).to.eql(eBuffer);
        });
    });
    describe('4.EmptyBuffArrayToBase64', () => {
        it('4.EmptyBuffArrayToBase64', () => {
            const get = GamaUtils.EmptyBuffArrayToBase64();
            expected(get).to.deep.equal(eBase64);
        });
    });
    describe('5.isNumber', () => {
        it('5-1.isNumber', () => {
            const aNumber = 1;
            const get = GamaUtils.isNumber(aNumber);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.true;
        });
        it('5-2.aString', () => {
            const aString = '1';
            const get = GamaUtils.isNumber(aString);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('5-3.aObj', () => {
            const aObj = { a: 1 };
            const get = GamaUtils.isNumber(aObj);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('5-4.aEObj', () => {
            const aEObj = {};
            const get = GamaUtils.isNumber(aEObj);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('5-5.aEArrayj', () => {
            const aEArrayj = [];
            const get = GamaUtils.isNumber(aEArrayj);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('5-6.aArrayj', () => {
            const aArrayj = [1];
            const get = GamaUtils.isNumber(aArrayj);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('5-7.aNull', () => {
            const aNull = undefined;
            const get = GamaUtils.isNumber(aNull);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('5-8.aUndefined', () => {
            const aUndefined = undefined;
            const get = GamaUtils.isNumber(aUndefined);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('5-9.aInfinity', () => {
            const aInfinity = Infinity;
            const get = GamaUtils.isNumber(aInfinity);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.true;
        });
        it('5-10.aNaN其實是Number...', () => {
            const aNaN = NaN;
            const get = GamaUtils.isNumber(aNaN);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.true;
        });
        it('5-11.空值', () => {
            const a空值 = '';
            const get = GamaUtils.isNumber(a空值);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
    });
    describe('6.isString', () => {
        it('6-1.isNumber', () => {
            const aNumber = 1;
            const get = GamaUtils.isString(aNumber);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-2.aString', () => {
            const aString = '1';
            const get = GamaUtils.isString(aString);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.true;
        });
        it('6-3.aObj', () => {
            const aObj = { a: 1 };
            const get = GamaUtils.isString(aObj);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-4.aEObj', () => {
            const aEObj = {};
            const get = GamaUtils.isString(aEObj);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-5.aEArrayj', () => {
            const aEArrayj = [];
            const get = GamaUtils.isString(aEArrayj);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-6.aArrayj', () => {
            const aArrayj = [1];
            const get = GamaUtils.isString(aArrayj);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-7.aNull', () => {
            // tslint:disable-next-line:no-null-keyword
            const aNull = null;
            const get = GamaUtils.isString(aNull);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-8.aUndefined', () => {
            const aUndefined = undefined;
            const get = GamaUtils.isString(aUndefined);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-9.aInfinity', () => {
            const aInfinity = Infinity;
            const get = GamaUtils.isString(aInfinity);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-10.aNaN', () => {
            const aNaN = NaN;
            const get = GamaUtils.isString(aNaN);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('6-11.空值', () => {
            const a空值 = '';
            const get = GamaUtils.isNumber(a空值);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
    });
    describe('7.objToString', () => {
        it('7.解析物件陣列，將物件內all value組成以空白組成字串', () => {
            const listObj = [
                { a: 1, b: 2 }, { a: 1, b: 2 }, { a: 1, b: 2 }
            ];
            const out = '1 2,1 2,1 2';
            const get = GamaUtils.objToString(listObj);
            expected(get).to.eql(out);
        });
    });
    describe('MemberIdToMemberSerialAndSectionSerial', () => {
        it('正常分割', () => {
            const into = 'AZ000001';
            const out = {
                memberSerial: '000001',
                sectionSerial: 'AZ'
            };
            const get = GamaUtils.MemberIdToMemberSerialAndSectionSerial(into);
            expected(get).to.eql(out);
        });
        it('長度超過八', () => {
            const into = 'AZ0000001';
            const out = {
                memberSerial: '000001',
                sectionSerial: 'AZ'
            };
            try {
                GamaUtils.MemberIdToMemberSerialAndSectionSerial(into);
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('長度少於八', () => {
            const into = 'AZ00001';
            const out = {
                memberSerial: '000001',
                sectionSerial: 'AZ'
            };
            try {
                GamaUtils.MemberIdToMemberSerialAndSectionSerial(into);
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
    });
    describe('validateString', () => {
        it('undefined返回undefined', () => {
            const into = undefined;
            const out = undefined;
            const get = GamaUtils.validateString(into, 'into');
            expected(get).to.eql(out);
        });
        it('字串返回原始值', () => {
            const into = '123';
            const out = '123';
            const get = GamaUtils.validateString(into, 'into');
            expected(get).to.eql(out);
        });
        it('非字串拋出錯誤', () => {
            const into = 123;
            try {
                const get = GamaUtils.validateString(into, 'into');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
    });
    describe('validateNumber', () => {
        it('undefined返回undefined', () => {
            const into = undefined;
            const out = undefined;
            const get = GamaUtils.validateNumber(into, 'into');
            expected(get).to.eql(out);
        });
        it('數字返回原始值', () => {
            const into = 123;
            const out = 123;
            const get = GamaUtils.validateNumber(into, 'into');
            expected(get).to.eql(out);
        });
        it('非數字拋出錯誤', () => {
            const into = '123';
            try {
                const get = GamaUtils.validateNumber(into, 'into');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
    });
    describe('validateBoolean', () => {
        it('undefined返回undefined', () => {
            const into = undefined;
            const out = undefined;
            const get = GamaUtils.validateBoolean(into, 'into');
            expected(get).to.eql(out);
        });
        it('Boolean返回原始值', () => {
            const into = true;
            const out = true;
            const get = GamaUtils.validateBoolean(into, 'into');
            expected(get).to.eql(out);
        });
        it('非Boolean拋出錯誤', () => {
            const into = '123';
            try {
                const get = GamaUtils.validateBoolean(into, 'into');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
    });
    describe('validateDate', () => {
        it('undefined返回undefined', () => {
            const into = undefined;
            const out = undefined;
            const get = GamaUtils.validateDate(into, 'into');
            expected(get).to.eql(out);
        });
        it('日期字串返回日期', () => {
            const into = '2017-11-20T00:00:00.000Z';
            const out = moment(into).toDate();
            const get = GamaUtils.validateDate(into, 'into');
            expected(get).to.eql(out);
        });
        it('非日期字串拋出錯誤', () => {
            const into = '12';
            try {
                const get = GamaUtils.validateDate(into, 'into');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('日期格式錯誤拋出錯誤', () => {
            const into = '2017-11-40T00:00:00.000Z';
            try {
                const get = GamaUtils.validateDate(into, 'into');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
    });
    describe('DBTimeFormat()', () => {
        it('1.Format Date', () => {
            const date = new Date();
            const rep = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
            const get = GamaUtils.DBTimeFormat(date);
            expected(get).to.eql(rep);
        });
        it('2.Format String', () => {
            const date = '2018-01-01';
            const rep = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
            const get = GamaUtils.DBTimeFormat(date);
            expected(get).to.eql(rep);
        });
        it('3.Format ISO-String', () => {
            const date = '2013-05-05T05:06:07-07:00';
            const rep = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
            const get = GamaUtils.DBTimeFormat(date);
            expected(get).to.eql(rep);
        });
        it('4.Format RFC2822-String', () => {
            const date = 'Mon 06 Mar 2017 21:22:23 z';
            const rep = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
            const get = GamaUtils.DBTimeFormat(date);
            expected(get).to.eql(rep);
        });
        it('5.Format UTC-String', () => {
            const date = '2013-02-08 09:30:26.123+07:00';
            const rep = moment(date).format('YYYY-MM-DD HH:mm:ss.SSS');
            const get = GamaUtils.DBTimeFormat(date);
            expected(get).to.eql(rep);
        });
    });
    describe('BirthdayTimeFormat()', () => {
        it('1.Format Date', () => {
            const date = new Date();
            const rep = moment(date).format('YYYY-MM-DD');
            const get = GamaUtils.BirthdayTimeFormat(date);
            expected(get).to.eql(rep);
        });
        it('2.Format String', () => {
            const date = '2018-01-01';
            const rep = moment(date).format('YYYY-MM-DD');
            const get = GamaUtils.BirthdayTimeFormat(date);
            expected(get).to.eql(rep);
        });
    });
    describe('TakeFirstOrEmpty()', () => {
        it('1.正常回傳第一個', () => {
            const get = GamaUtils.TakeFirstOrEmpty([{ a: 1 }, { b: 1 }]);
            expected(get).to.eql({ a: 1 });
        });
        it('2.空的', () => {
            const get = GamaUtils.TakeFirstOrEmpty([]);
            expected(get).to.eql({});
        });
    });
    describe('GetCheckSum()', () => {
        it('1.CheckSum', () => {
            const get = GamaUtils.GetCheckSum('659000001234');
            expected(get).to.eql(0);
        });
        it('2.有非正常數字', () => {
            try {
                const get = GamaUtils.GetCheckSum('1234U6789012');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('3.小於12', () => {
            try {
                const get = GamaUtils.GetCheckSum('12345690');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('4.超過12', () => {
            try {
                const get = GamaUtils.GetCheckSum('12345690123');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('6.亂算', () => {
            const get = GamaUtils.GetCheckSum('659080501234');
            expected(get).to.eql(7);
        });
    });
    describe('EncryptCard()', () => {
        it('1.EncryptCard', () => {
            const get = GamaUtils.EncryptCard('00000092');
            expected(get).to.eql('63615302');
        });
        it('2.有非數字的字元', () => {
            try {
                const get = GamaUtils.EncryptCard('000A0092');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('3.超過8字元', () => {
            try {
                const get = GamaUtils.EncryptCard('000000092');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('4.小於8字元', () => {
            try {
                const get = GamaUtils.EncryptCard('00092');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
    });
    describe('DecryptCard()', () => {
        it('1.DecryptCard', () => {
            const get = GamaUtils.DecryptCard('63615302');
            expected(get).to.eql('00000092');
        });
        it('2.有非數字的字元', () => {
            try {
                const get = GamaUtils.DecryptCard('636A5302');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('3.超過8字元', () => {
            try {
                const get = GamaUtils.DecryptCard('6361445302');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
        it('4.小於8字元', () => {
            try {
                const get = GamaUtils.DecryptCard('63302');
            } catch (error) {
                expected(() => { throw error; }).to.throw(Error);
            }
        });
    });
    describe('toASCIICodeArray()', () => {
        it('1.toASCIICodeArray', () => {
            const get = GamaUtils.toASCIICodeArray('AZ');
            expected(get).to.deep.equal([65, 90]);
        });
        it('2.toASCIICodeArray', () => {
            const get = GamaUtils.toASCIICodeArray('ZZ');
            expected(get).to.deep.equal([90, 90]);
        });
    });
    describe('toASCIICodeString()', () => {
        it('1.toASCIICodeString', () => {
            const get = GamaUtils.toASCIICodeString('AZ');
            expected(get).to.deep.equal('6590');
        });
        it('2.GetCharCodeString', () => {
            const get = GamaUtils.toASCIICodeString('ZZ');
            expected(get).to.deep.equal('9090');
        });
    });
    describe('fromASCIICodeString()', () => {
        it('1.fromASCIICodeString', () => {
            const get = GamaUtils.fromASCIICodeString('6590');
            expected(get).to.deep.equal('AZ');
        });
        it('2.fromASCIICodeString', () => {
            const get = GamaUtils.fromASCIICodeString('9090');
            expected(get).to.deep.equal('ZZ');
        });
    });
    describe('fromASCIICodeArray()', () => {
        it('1.fromASCIICodeArray', () => {
            const get = GamaUtils.fromASCIICodeArray(['65', '90']);
            expected(get).to.deep.equal(['A', 'Z']);
        });
        it('2.fromASCIICodeArray', () => {
            const get = GamaUtils.fromASCIICodeArray(['90', '90']);
            expected(get).to.deep.equal(['Z', 'Z']);
        });
    });
    describe('EncryptAlgorithmCard()', () => {
        it('1.EncryptAlgorithmCard', () => {
            const get = GamaUtils.EncryptAlgorithmCard('ZZ00000001');
            expected(get).to.deep.equal('9090636253917');
        });
        it('2.EncryptAlgorithmCard', () => {
            const get = GamaUtils.EncryptAlgorithmCard('AZ00000001');
            expected(get).to.deep.equal('6590636253915');
        });
    });
    describe('DecryptAlgorithmCard()', () => {
        it('1.DecryptAlgorithmCard', () => {
            const get = GamaUtils.DecryptAlgorithmCard('9090636253917');
            expected(get).to.deep.equal('ZZ00000001');
        });
        it('2.DecryptAlgorithmCard', () => {
            const get = GamaUtils.DecryptAlgorithmCard('6590636253915');
            expected(get).to.deep.equal('AZ00000001');
        });
    });
    describe('EncryptOriginalCard()', () => {
        it('1.EncryptOriginalCard', () => {
            const get = GamaUtils.EncryptOriginalCard('AZ00000001');
            expected(get).to.deep.equal('6590000000019');
        });
        it('2.EncryptOriginalCard', () => {
            const get = GamaUtils.EncryptOriginalCard('ZZ00000001');
            expected(get).to.deep.equal('9090000000011');
        });
    });
    describe('DecryptOriginalCard()', () => {
        it('1.DecryptOriginalCard', () => {
            const get = GamaUtils.DecryptOriginalCard('6590000000019');
            expected(get).to.deep.equal('AZ00000001');
        });
    });
    describe('CardSerialCheckSum()', () => {
        it('1.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ00000001');
            expected(get).to.deep.equal(10);
        });
        it('2.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ11110001');
            expected(get).to.deep.equal(10);
        });
        it('3.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ11110001');
            expected(get).to.deep.equal(10);
        });
        it('4.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ11110021');
            expected(get).to.deep.equal(8);
        });
        it('5.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ11110031');
            expected(get).to.deep.equal(9);
        });
        it('6.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ51110031');
            expected(get).to.deep.equal(13);
        });
        it('7.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ57110031');
            expected(get).to.deep.equal(11);
        });
        it('8.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ99910031');
            expected(get).to.deep.equal(1);
        });
        it('9.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ91513631');
            expected(get).to.deep.equal(0);
        });
        it('10.CardSerialCheckSum', () => {
            const get = GamaUtils.CardSerialCheckSum('AZ87543641');
            expected(get).to.deep.equal(5);
        });
    });
    describe('getShortCardSerialPrintFormat()', () => {
        it('1.getShortCardSerialPrintFormat', () => {
            const get = GamaUtils.getShortCardSerialPrintFormat('AZ00000001');
            expected(get).to.deep.equal(';6590000000019?');
        });
        it('2.getShortCardSerialPrintFormat', () => {
            const get = GamaUtils.getShortCardSerialPrintFormat('ZZ00000001');
            expected(get).to.deep.equal(';9090000000011?');
        });
        it('3.getShortCardSerialPrintFormat', () => {
            const get = GamaUtils.getShortCardSerialPrintFormat('ZZ12345671');
            expected(get).to.deep.equal(';9090123456713?');
        });
        it('4.getShortCardSerialPrintFormat', () => {
            const get = GamaUtils.getShortCardSerialPrintFormat('AZ08794872');
            expected(get).to.deep.equal(';6590087948725?');
        });
    });
    describe('getLongCardSerialPrintFormat()', () => {
        it('1.getLongCardSerialPrintFormat', () => {
            const get = GamaUtils.getLongCardSerialPrintFormat('AZ00000001');
            expected(get).to.deep.equal(';659000000001900:65900000000198?');
        });
        it('2.getLongCardSerialPrintFormat', () => {
            const get = GamaUtils.getLongCardSerialPrintFormat('ZZ00000001');
            expected(get).to.deep.equal(';909000000001100:9090000000011:?');
        });
        it('3.getLongCardSerialPrintFormat', () => {
            const get = GamaUtils.getLongCardSerialPrintFormat('ZZ12345671');
            expected(get).to.deep.equal(';909012345671300:90901234567138?');
        });
        it('4.getLongCardSerialPrintFormat', () => {
            const get = GamaUtils.getLongCardSerialPrintFormat('ZZ12345671');
            expected(get).to.deep.equal(';909012345671300:90901234567138?');
        });
        it('5.getLongCardSerialPrintFormat', () => {
            const get = GamaUtils.getLongCardSerialPrintFormat('ZZ27455671');
            expected(get).to.deep.equal(';909027455671500:9090274556715>?');
        });
        it('6.getLongCardSerialPrintFormat', () => {
            const get = GamaUtils.getLongCardSerialPrintFormat('BK68489601');
            expected(get).to.deep.equal(';667568489601400:66756848960140?');
        });
        it('7.getLongCardSerialPrintFormat', () => {
            const get = GamaUtils.getLongCardSerialPrintFormat('BF17489601');
            expected(get).to.deep.equal(';667017489601500:6670174896015<?');
        });
    });
    describe('getMagneticStripeCode()', () => {
        it('1.長碼', () => {
            const get = GamaUtils.getMagneticStripeCode(';909000000001100:9090000000011:?');
            expected(get).to.deep.equal('909000000001');
        });
        it('2.短碼', () => {
            const get = GamaUtils.getMagneticStripeCode(';9090123456713?');
            expected(get).to.deep.equal('909012345671');
        });
    });
    describe('dollarToCent', () => {
        it('1.元轉分', () => {
            const get = GamaUtils.dollarToCent(100);
            expected(get).to.deep.equal(10000);
        });
    });
    describe('centToDollar', () => {
        it('1.分轉元', () => {
            const get = GamaUtils.centToDollar(100);
            expected(get).to.deep.equal(1);
        });
    });
    describe('countOccurrences', () => {
        it('1.計算陣列中指定的重複數字', () => {
            const get = GamaUtils.countOccurrences([1, 1, 2, 2, 3, 3, 3, 3, 5, 6], 3);
            expected(get).to.deep.equal(4);
        });
    });
    describe('deeplyToCamelCase()', () => {
        it('1.json obj', () => {
            const data = {
                MsMemberBlockType: [
                    {
                        memberBlockSerial: 1,
                        Member_Block_Type: [
                            {
                                GroupId: 1,
                                description: {
                                    MemberBlockType: {
                                        Member_Block_Type: 'test'
                                    }
                                }
                            },
                            {
                                GroupId: 2,
                                description: 'roup Bingo'
                            }
                        ]
                    },
                    {
                        memberBlockSerial: 2,
                        MemberBlockType: {
                            Member_Block_Type: 'test'
                        }
                    }
                ]
            };
            const reuslt = {
                msMemberBlockType: [
                    {
                        memberBlockSerial: 1,
                        member_Block_Type: [
                            {
                                groupId: 1,
                                description: {
                                    memberBlockType: {
                                        member_Block_Type: 'test'
                                    }
                                }
                            },
                            {
                                groupId: 2,
                                description: 'roup Bingo'
                            }
                        ]
                    },
                    {
                        memberBlockSerial: 2,
                        memberBlockType: {
                            member_Block_Type: 'test'
                        }
                    }
                ]
            };
            expected(GamaUtils.deeplyToCamelCase(data)).to.deep.equal(reuslt);
        });
        it('2.json array', () => {
            const data = [
                {
                    memberBlockSerial: 1,
                    Member_Block_Type: [
                        {
                            GroupId: 1,
                            description: {
                                Member_Block_Type: {
                                    Member_Block_Type: 'test'
                                }
                            }
                        },
                        {
                            GroupId: 2,
                            description: 'roup Bingo'
                        }
                    ]
                },
                {
                    memberBlockSerial: 2,
                    Member_Block_Type: {
                        Member_Block_Type: 'test'
                    }
                }
            ];
            const reuslt = [
                {
                    memberBlockSerial: 1,
                    member_Block_Type: [
                        {
                            groupId: 1,
                            description: {
                                member_Block_Type: {
                                    member_Block_Type: 'test'
                                }
                            }
                        },
                        {
                            groupId: 2,
                            description: 'roup Bingo'
                        }
                    ]
                },
                {
                    memberBlockSerial: 2,
                    member_Block_Type: {
                        member_Block_Type: 'test'
                    }
                }
            ];
            expected(GamaUtils.deeplyToCamelCase(data)).to.deep.equal(reuslt);
        });
    });
    describe('deeplyToUpperCamelCase()', () => {
        it('1.json obj', () => {
            const data = {
                MsMemberBlockType: [
                    {
                        memberBlockSerial: 1,
                        Member_Block_Type: [
                            {
                                GroupId: 1,
                                description: {
                                    MemberBlockType: {
                                        Member_Block_Type: 'test'
                                    }
                                }
                            },
                            {
                                GroupId: 2,
                                description: 'roup Bingo'
                            }
                        ]
                    },
                    {
                        memberBlockSerial: 2,
                        MemberBlockType: {
                            Member_Block_Type: 'test'
                        }
                    }
                ]
            };
            const reuslt = {
                MsMemberBlockType: [
                    {
                        MemberBlockSerial: 1,
                        Member_Block_Type: [
                            {
                                GroupId: 1,
                                Description: {
                                    MemberBlockType: {
                                        Member_Block_Type: 'test'
                                    }
                                }
                            },
                            {
                                GroupId: 2,
                                Description: 'roup Bingo'
                            }
                        ]
                    },
                    {
                        MemberBlockSerial: 2,
                        MemberBlockType: {
                            Member_Block_Type: 'test'
                        }
                    }
                ]
            };
            expected(GamaUtils.deeplyToUpperCamelCase(data)).to.deep.equal(reuslt);
        });
        it('2.json array', () => {
            const data = [
                {
                    memberBlockSerial: 1,
                    Member_Block_Type: [
                        {
                            GroupId: 1,
                            description: {
                                Member_Block_Type: {
                                    Member_Block_Type: 'test'
                                }
                            }
                        },
                        {
                            GroupId: 2,
                            description: 'roup Bingo'
                        }
                    ]
                },
                {
                    memberBlockSerial: 2,
                    Member_Block_Type: {
                        Member_Block_Type: 'test'
                    }
                }
            ];
            const reuslt = [
                {
                    MemberBlockSerial: 1,
                    Member_Block_Type: [
                        {
                            GroupId: 1,
                            Description: {
                                Member_Block_Type: {
                                    Member_Block_Type: 'test'
                                }
                            }
                        },
                        {
                            GroupId: 2,
                            Description: 'roup Bingo'
                        }
                    ]
                },
                {
                    MemberBlockSerial: 2,
                    Member_Block_Type: {
                        Member_Block_Type: 'test'
                    }
                }
            ];
            expected(GamaUtils.deeplyToUpperCamelCase(data)).to.deep.equal(reuslt);
        });
    });
    describe('addArray() & addArrayReduce()', () => {
        it('addArray() => 使用3百萬的2純數組來做加總,應該是六百萬,順便看計算時間', () => {
            // 目標array
            // const _3MillionNumberArray = _.fill(Array(3000000), 2);
            // const _3MillionStringArray = _.fill(Array(3000000), '2');
            const get = GamaUtils.addArray(_3MillionNumberArray);
            expected(get.toNumber()).to.eql(6000000);
        });
        it('addArrayReduce() => 使用3百萬的2純數組來做加總,應該是六百萬,順便看計算時間', () => {
            // 目標array
            // const _3MillionNumberArray = _.fill(Array(3000000), 2);
            // const _3MillionStringArray = _.fill(Array(3000000), '2');
            const get = GamaUtils.addArrayReduce(_3MillionNumberArray);
            expected(get.toNumber()).to.eql(6000000);
        });
        it('addArray() => 使用3百萬2的string組來做加總,應該是六百萬,順便看計算時間', () => {
            // 目標array
            // const _3MillionNumberArray = _.fill(Array(3000000), 2);
            // const _3MillionStringArray = _.fill(Array(3000000), '2');
            const get = GamaUtils.addArray(_3MillionStringArray);
            expected(get.toNumber()).to.eql(6000000);
        });
        it('addArrayReduce() => 使用3百萬2的string組來做加總,應該是六百萬,順便看計算時間', () => {
            // 目標array
            // const _3MillionNumberArray = _.fill(Array(3000000), 2);
            // const _3MillionStringArray = _.fill(Array(3000000), '2');
            const get = GamaUtils.addArrayReduce(_3MillionStringArray);
            expected(get.toNumber()).to.eql(6000000);
        });
    });
    describe('addThisField()', () => {
        it('1.計算a的加總', () => {
            // 目標array
            const array = _.fill(Array(10), { a: 1, b: 2 });
            const get = GamaUtils.addThisField(array, 'a');
            expected(get.toNumber()).to.eql(10);
        });
        it('2.計算沒有的成員的加總', () => {
            // 目標array
            const array = _.fill(Array(10), { a: 1, b: 2 });
            const get = GamaUtils.addThisField(array, 'c');
            expected(get.toNumber()).to.eql(0);
        });
        it('3.計算a非數字的加總', () => {
            // 目標array
            const array = _.fill(Array(10), { a: 'ff', b: 2 });
            const get = GamaUtils.addThisField(array, 'a');
            expected(get.toNumber()).to.eql(0);
        });
        it('4.計算a是string的數字加總', () => {
            // 目標array
            const array = _.fill(Array(10), { a: '3', b: 2 });
            const get = GamaUtils.addThisField(array, 'a');
            expected(get.toNumber()).to.eql(30);
        });
    });
    describe('addThisField1xField2()', () => {
        it('1.計算a x b的加總', () => {
            // 目標array
            const array = _.fill(Array(10), { a: 3, b: 2 });
            const get = GamaUtils.addThisField1xField2(array, 'a', 'b');
            expected(get.toNumber()).to.eql(60);
        });
        it('2.計算沒有的成員就是 0 x b的加總', () => {
            // 目標array
            const array = _.fill(Array(10), { a: 3, b: 2 });
            const get = GamaUtils.addThisField1xField2(array, 'c', 'b');
            expected(get.toNumber()).to.eql(0);
        });
        it('3.計算a非數字的加總,就是 0 x b的加總', () => {
            // 目標array
            const array = _.fill(Array(10), { a: 'ff', b: 2 });
            const get = GamaUtils.addThisField1xField2(array, 'a', 'b');
            expected(get.toNumber()).to.eql(0);
        });
        it('4.計算a是string的數字加總', () => {
            // 目標array
            const array = _.fill(Array(10), { a: '3', b: 2 });
            const get = GamaUtils.addThisField1xField2(array, 'a', 'b');
            expected(get.toNumber()).to.eql(60);
        });
    });
    describe('addThisFieldAutoFilter()', () => {
        it('1.計算a的加總, filter -> f: true', () => {
            // 目標array
            const tureArray = _.fill(Array(10), { a: 3, b: 2, f: true });
            const falseArray = _.fill(Array(10), { a: 3, b: 2, f: false });
            const allArray = _.concat(tureArray, falseArray);
            const get = GamaUtils.addThisFieldAutoFilter(allArray, { f: true }, 'a');
            expected(get.toNumber()).to.eql(30);
        });
        it('2.計算a非數字的加總, filter -> f: true', () => {
            // 目標array
            const tureArray = _.fill(Array(10), { a: 'ff', b: 2, f: true });
            const falseArray = _.fill(Array(10), { a: 3, b: 2, f: false });
            const allArray = _.concat(tureArray, falseArray as any);
            const array = _.fill(Array(10), { a: 3, b: 2 });
            const get = GamaUtils.addThisFieldAutoFilter(array, { f: true }, 'a');
            expected(get.toNumber()).to.eql(0);
        });
    });
    describe('addField1xField2AutoFilter()', () => {
        it('1.計算a的加總, filter -> f: true, a x b 再加總', () => {
            // 目標array
            const tureArray = _.fill(Array(10), { a: 3, b: 2, f: true });
            const falseArray = _.fill(Array(10), { a: 3, b: 2, f: false });
            const allArray = _.concat(tureArray, falseArray);
            const get = GamaUtils.addField1xField2AutoFilter(allArray, { f: true }, 'a', 'b');
            expected(get.toNumber()).to.eql(60);
        });
        it('2.計算a非數字的加總, filter -> f: true, a x 0', () => {
            // 目標array
            const tureArray = _.fill(Array(10), { a: 'ff', b: 2, f: true });
            const falseArray = _.fill(Array(10), { a: 3, b: 2, f: false });
            const allArray = _.concat(tureArray, falseArray as any);
            const array = _.fill(Array(10), { a: 3, b: 2 });
            const get = GamaUtils.addField1xField2AutoFilter(array, { f: true }, 'a', 'd');
            expected(get.toNumber()).to.eql(0);
        });
    });
    describe('TwoArrayToObj()', () => {
        it('1.製作Obj', () => {
            // 目標array
            const get = GamaUtils.TwoArrayToObj(['a', 'b'], [1, 2]);
            expected(get).to.deep.equal({
                a: 1,
                b: 2
            });
        });
    });
    describe('TwoArrayToObj()', () => {
        it('1.製作Obj', () => {
            // 目標array
            const get = GamaUtils.OneArrayToObj([['a', 1], ['b', 2]]);
            expected(get).to.deep.equal({
                a: 1,
                b: 2
            });
        });
    });
    describe('getTicketSEValidNum()', () => {
        it('1.測試', () => {
            const eGMValidID = [
                7012,
                0x7,
                0x77,
                0x777,
                0x7788,
                0x77883,
                0x778833,
                0x7788332,
                0x77883322,
                0x8,
                0x88,
                0x888,
                0x8888,
                0x88888,
                0x888888,
                0x8888888];
            const result = [
                '004687340456390616',
                '004169380566756824',
                '008169372694686680',
                '006555830294686680',
                '003075304169968088',
                '004546500724921816',
                '008608975412589528',
                '006424013904790744',
                '004926159593113816',
                '002169384569443800',
                '000169371369968088',
                '001409640169968088',
                '002601806569968088',
                '005413019369968088',
                '006547739369968088',
                '006547739369968088'
            ];
            eGMValidID.forEach((element, index) => {
                const get = GamaUtils.getTicketSEValidNum(element, 1);
                expected(get).to.deep.equal(result[index]);
            });
        });
    });
});
