import { expect, should } from 'chai';
import { anyString, anything, capture, instance, mock, spy, verify, when } from 'ts-mockito';
import GamaSQLHelper from '../../src/utils/GamaSQLHelper';
/**
 * GamaSQLHelper的單元測試, 靜態的function test, 出來測試進入跟出去對不對就好
 * 因為他沒有任何依賴
 */
describe('GamaSQLHelper', () => {
    const testString = 'test1';
    const values = [1, 2, 3];
    let expectDone;
    const expected = (target?: any, message?: string) => {
        expectDone = true;
        return expect(target, message);
    };
    beforeEach(() => {
        expectDone = false;
    });
    afterEach('這個方法有寫驗證但是沒有驗證到', () => {
        // tslint:disable-next-line:no-unused-expression
        expect(expectDone).to.true;
    });
    describe('1.In', () => {
        const out = {
            test1: { $in: [1, 2, 3] }
        };
        it('1.返回組合好的In', () => {
            const get = GamaSQLHelper.In(testString, values);
            expected(get).to.deep.equal(out);
        });
    });
    describe('2.NotEq', () => {
        const out = {
            test1: { $ne: [1, 2, 3] }
        };
        it('2.返回組合好的NotEq', () => {
            const get = GamaSQLHelper.NotEq(testString, values);
            expected(get).to.deep.equal(out);
        });
    });
    describe('3.LessThan', () => {
        const out = {
            test1: { $lt: [1, 2, 3] }
        };
        it('3.返回組合好的LessThan', () => {
            const get = GamaSQLHelper.LessThan(testString, values);
            expected(get).to.deep.equal(out);
        });
    });
    describe('4.LessThanEq', () => {
        const out = {
            test1: { $lte: [1, 2, 3] }
        };
        it('4.返回組合好的LessThanEq', () => {
            const get = GamaSQLHelper.LessThanEq(testString, values);
            expected(get).to.deep.equal(out);
        });
    });
    describe('5.MoreThan', () => {
        const out = {
            test1: { $gt: [1, 2, 3] }
        };
        it('5.返回組合好的MoreThan', () => {
            const get = GamaSQLHelper.MoreThan(testString, values);
            expected(get).to.deep.equal(out);
        });
    });
    describe('6.MoreThanEq', () => {
        const out = {
            test1: { $gte: [1, 2, 3] }
        };
        it('6.返回組合好的MoreThanEq', () => {
            const get = GamaSQLHelper.MoreThanEq(testString, values);
            expected(get).to.deep.equal(out);
        });
    });
    describe('7.Eq', () => {
        const out = {
            test1: { $eq: [1, 2, 3] }
        };
        it('7.返回組合好的Eq', () => {
            const get = GamaSQLHelper.Eq(testString, values);
            expected(get).to.deep.equal(out);
        });
    });
    describe('8.NoCondition', () => {
        const out = {};
        it('8.返回組合好的NoCondition', () => {
            const get = GamaSQLHelper.NoCondition();
            expected(get).to.deep.equal(out);
        });
    });
    describe('9.And', () => {
        const out = {
            $and: [
                {
                    test1: { $eq: 1 }
                },
                {
                    test2: { $eq: 2 }
                }
            ]
        };
        it('9.返回組合好的And', () => {
            const test1 = GamaSQLHelper.Eq('test1', 1);
            const test2 = GamaSQLHelper.Eq('test2', 2);
            const get = GamaSQLHelper.And(test1, test2);
            expected(get).to.deep.equal(out);
        });
    });
    describe('AndArray', () => {
        const out = {
            $and: [
                {
                    test1: { $eq: 1 }
                },
                {
                    test2: { $eq: 2 }
                }
            ]
        };
        it('1.返回組合好的AndOption', () => {
            const test1 = GamaSQLHelper.Eq('test1', 1);
            const test2 = GamaSQLHelper.Eq('test2', 2);
            const get = GamaSQLHelper.AndArray([test1, test2]);
            expected(get).to.deep.equal(out);
        });
    });
    describe('10.Or', () => {
        const out = {
            $or: [
                {
                    test1: { $eq: 1 }
                },
                {
                    test2: { $eq: 2 }
                }
            ]
        };
        it('10.返回組合好的Or', () => {
            const test1 = GamaSQLHelper.Eq('test1', 1);
            const test2 = GamaSQLHelper.Eq('test2', 2);
            const get = GamaSQLHelper.Or(test1, test2);
            expected(get).to.deep.equal(out);
        });
    });
    describe('11.Fields', () => {
        const order1 = GamaSQLHelper.OrderByEntity('aa', true);
        const order2 = GamaSQLHelper.OrderByEntity('bb', false);
        const field = ['ftest1', 'ftest2'];
        it('11-1.全部', () => {
            const out = {
                field: ['ftest1', 'ftest2'],
                nolock: true,
                sort: [{ aa: true }, { bb: false }],
                limit: 10,
                groupby: ['gr'],
                distinct: true
            };
            const get = GamaSQLHelper.Fields(field, true, [order1, order2], 10, ['gr'], true);
            expected(get).to.deep.equal(out);
        });
        it('11-2.只要field,limit', () => {
            const out = {
                field: ['ftest1', 'ftest2'],
                nolock: false,
                limit: 10
            };
            const get = GamaSQLHelper.Fields(field, false, undefined, 10);
            expected(get).to.deep.equal(out);
        });
        it('11-3.只要field,groupby', () => {
            const out = {
                field: ['ftest1', 'ftest2'],
                nolock: false,
                groupby: ['gr', 'tt']
            };
            const get = GamaSQLHelper.Fields(field, false, undefined, undefined, ['gr', 'tt']);
            expected(get).to.deep.equal(out);
        });
        it('11-4.只要field,distinct', () => {
            const out = {
                field: ['ftest1', 'ftest2'],
                nolock: false,
                distinct: true
            };
            const get = GamaSQLHelper.Fields(field, false, undefined, undefined, undefined, true);
            expected(get).to.deep.equal(out);
        });
        it('11-5.只要field,distinct,sort', () => {
            const out = {
                field: ['ftest1', 'ftest2'],
                sort: [{ aa: true }, { bb: false }],
                nolock: false,
                distinct: true
            };
            const get = GamaSQLHelper.Fields(field, false, [order1, order2], undefined, undefined, true);
            expected(get).to.deep.equal(out);
        });
    });
    describe('12.ALLFields', () => {
        const order1 = GamaSQLHelper.OrderByEntity('aa', true);
        const order2 = GamaSQLHelper.OrderByEntity('bb', false);
        it('12-1.全部', () => {
            const out = {
                nolock: true,
                sort: [{ aa: true }, { bb: false }],
                limit: 10
            };
            const get = GamaSQLHelper.ALLFields(true, [order1, order2], 10);
            expected(get).to.deep.equal(out);
        });
        it('12-2.少limit', () => {
            const out = {
                nolock: true,
                sort: [{ aa: true }, { bb: false }]
            };
            const get = GamaSQLHelper.ALLFields(true, [order1, order2]);
            expected(get).to.deep.equal(out);
        });
        it('12-3.不填寫', () => {
            const out = { nolock: true };
            const get = GamaSQLHelper.ALLFields();
            expected(get).to.deep.equal(out);
        });
        it('12-4.只要lock', () => {
            const out = { nolock: false };
            const get = GamaSQLHelper.ALLFields(false);
            expected(get).to.deep.equal(out);
        });
        it('12-5.只要order', () => {
            const out = {
                nolock: false,
                sort: [{ aa: true }, { bb: false }]
            };
            const get = GamaSQLHelper.ALLFields(false, [order1, order2]);
            expected(get).to.deep.equal(out);
        });
        it('12-5.只要limit', () => {
            const out = {
                nolock: false,
                limit: 10
            };
            const get = GamaSQLHelper.ALLFields(false, undefined, 10);
            expected(get).to.deep.equal(out);
        });
    });
    describe('13.BugFixUpdateSqlRepeatValue', () => {
        const outt =
            [
                {
                    test1: { tt: 3 }
                },
                {
                    test2: { tx: 2 }
                }];
        const into = {
            obj: [{ test1: [{ tt: 3 }, { tt: 3 }] }, { test2: [{ tx: 2 }, { tx: 2 }] }]
        };
        it('13.SQL目前的錯誤BUG修正BugFixUpdateSqlRepeatValue', () => {
            const get = GamaSQLHelper.BugFixUpdateSqlRepeatValue(into.obj);
            expected(get).to.deep.equal(outt);
        });
    });
    describe('14.BugFixUpdateSqlRepeatValue', () => {
        const outt =
            [
                {
                    test1: { tt: 3 }
                },
                {
                    test: { tt: 1 }
                },
                {
                    test2: { tx: 2 }
                }];
        const into = {
            obj: [
                { test1: [{ tt: 3 }] },
                { test: [{ tt: 1 }] },
                { test2: [{ tx: 2 }] }]
        };
        it('14.SQL目前的錯誤BUG修正BugFixUpdateSqlRepeatValue', () => {
            const get = GamaSQLHelper.BugFixUpdateSqlRepeatValue(into.obj);
            expected(get).to.deep.equal(outt);
        });
    });
    describe('15.Like', () => {
        const out = {
            test1: { $like: 1 }
        };
        it('15.返回組合好的Like', () => {
            const test1 = GamaSQLHelper.Like('test1', 1);
            expected(test1).to.deep.equal(out);
        });
    });
    describe('17.Between', () => {
        const out = {
            test1: { $between: [1, 100] }
        };
        it('17.Between', () => {
            const test1 = GamaSQLHelper.Between('test1', [1, 100]);
            expected(test1).to.deep.equal(out);
        });
    });
    describe('19.OrderByEntity', () => {
        const out1 = {
            operatorSerial: true
        };
        const out2 = {
            operatorSerial: false
        };
        it('19-1.正序', () => {
            const test1 = GamaSQLHelper.OrderByEntity('operatorSerial', true);
            expected(test1).to.deep.equal(out1);
        });
        it('19-1.反序', () => {
            const test1 = GamaSQLHelper.OrderByEntity('operatorSerial', false);
            expected(test1).to.deep.equal(out2);
        });
    });
    describe('20.UniqueField', () => {
        const oder1 = GamaSQLHelper.OrderByEntity('aa', true);
        const oder2 = GamaSQLHelper.OrderByEntity('bb', false);
        it('20-1.全部', () => {
            const out = {
                field: ['operatorSerial'],
                nolock: true,
                sort: [{ aa: true }, { bb: false }],
                limit: 5
            };
            const test1 = GamaSQLHelper.UniqueField(
                ['operatorSerial'],
                true,
                [
                    GamaSQLHelper.OrderByEntity('aa', true),
                    GamaSQLHelper.OrderByEntity('bb', false)
                ],
                5);
            expected(test1).to.deep.equal(out);
        });
        it('20-2.少limit', () => {
            const out = {
                field: ['operatorSerial'],
                nolock: true,
                sort: [{ aa: true }, { bb: false }]
            };
            const test1 = GamaSQLHelper.UniqueField(['operatorSerial'], true, [oder1, oder2]);
            expected(test1).to.deep.equal(out);
        });
        it('20-3.少limit,nolock', () => {
            const out = {
                field: ['operatorSerial'],
                nolock: true,
                sort: [{ aa: true }, { bb: false }]
            };
            const test1 = GamaSQLHelper.UniqueField(['operatorSerial'], undefined, [oder1, oder2]);
            expected(test1).to.deep.equal(out);
        });
        it('20-4.少limit,nolock,sort', () => {
            const out = {
                field: ['operatorSerial'],
                nolock: true
            };
            const test1 = GamaSQLHelper.UniqueField(['operatorSerial']);
            expected(test1).to.deep.equal(out);
        });
        it('20-5.少,sort,nolock', () => {
            const out = {
                field: ['operatorSerial'],
                nolock: true,
                limit: 5
            };
            const test1 = GamaSQLHelper.UniqueField(['operatorSerial'], undefined, undefined, 5);
            expected(test1).to.deep.equal(out);
        });
    });
    describe('22.IsNull', () => {
        it('22.返回組合好的is null', () => {
            const out = {
                test1: { $null: true }
            };
            const get = GamaSQLHelper.IsNull(testString, true);
            expected(get).to.deep.equal(out);
        });
        it('22.返回組合好的is not null', () => {
            const out = {
                test1: { $null: false }
            };
            const get = GamaSQLHelper.IsNull(testString, false);
            expected(get).to.deep.equal(out);
        });
    });
    describe('23.NotIn', () => {
        const out = {
            test1: { $nin: [1, 2, 3] }
        };
        it('23.返回組合好的NotIn', () => {
            const get = GamaSQLHelper.NotIn(testString, values);
            expected(get).to.deep.equal(out);
        });
    });
});
