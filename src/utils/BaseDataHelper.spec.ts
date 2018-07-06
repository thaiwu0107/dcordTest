import { expect, should } from 'chai';
import { Min } from 'class-validator';
import { anything, capture, instance, mock, verify, when } from 'ts-mockito';
import DataHelper from '../../src/utils/BaseDataHelper';
/**
 * SQLHelper的單元測試, 靜態的function test, 出來測試進入跟出去對不對就好
 * 因為他沒有任何依賴
 */
describe('GamaDataHelper', () => {
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
    const in1 = [{
        a: 1,
        b: 'b1',
        d: 'd1'
    }, {
        a: 2,
        b: 'b2',
        d: 'd2'
    }];
    const in2 = [{
        a: 1,
        b: 'b1',
        c: 'c1',
        e: 'e1'
    }, {
        a: 2,
        b: 'b2',
        c: 'c2',
        e: 'e2'
    }];
    const in3 = [{
        a: 1,
        b: 'bb1',
        c: 'c1',
        e: 'e1'
    }, {
        a: 2,
        b: 'bb2',
        c: 'c2',
        e: 'e2'
    }];
    describe('1.InnerJoin', () => {
        it('1-1.InnerJoin-只有兩個都有的key才會出來', () => {
            const out = [
                { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
                { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
            ];
            const get = DataHelper.InnerJoin(in1, in2, ['a']);
            expected(get).to.deep.equal(out);
        });
        it('1-2.InnerJoin-只有兩個都有的key才會出來', () => {
            const out = [];
            const get = DataHelper.InnerJoin(in1, in2, ['a', 'b']);
            expected(get).to.deep.equal(out);
        });
    });
    describe('2.OuterJoin', () => {
        it('2-1.OuterJoin-都要一樣才會命中', () => {
            const out = [
                { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
                { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
            ];
            const get = DataHelper.OuterJoin(in1, in2, ['a']);
            expected(get).to.deep.equal(out);
        });
        it('2-2.OuterJoin-都要一樣才會命中', () => {
            const out = [
                { a: 1, b: 'b1', d: 'd1' },
                { a: 2, b: 'b2', d: 'd2' }
            ];
            const get = DataHelper.OuterJoin(in1, in2, ['a', 'b']);
            expected(get).to.deep.equal(out);
        });
    });
    describe('3.Existy', () => {
        const a = undefined;
        const b = '3';
        it('3-1.Existy-is unll', () => {
            const get = DataHelper.Existy(a);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.false;
        });
        it('3-2.Existy-is not unll', () => {
            const get = DataHelper.Existy(b);
            // tslint:disable-next-line:no-unused-expression
            expected(get).to.be.true;
        });
    });
    describe('4.Merge', () => {
        const t1 = { a: 1 };
        const t2 = { b: 1 };
        const tt = { a: 1, b: 1 };
        it('4.Merge', () => {
            const get = DataHelper.Merge(t1, t2);
            expected(get).to.deep.equal(tt);
        });
    });
    describe('5.Max', () => {
        const t1 = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 3, b: 2 }];
        const tt = { a: 3, b: 2 };
        it('5.Max', () => {
            const get = DataHelper.Max(t1, 'a');
            expected(get).to.deep.equal(tt);
        });
    });
    describe('5.Min', () => {
        const t1 = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 3, b: 2 }];
        const tt = { a: 1, b: 2 };
        it('5.Min', () => {
            const get = DataHelper.Min(t1, 'a');
            expected(get).to.deep.equal(tt);
        });
    });
    describe('6.Sum', () => {
        const t1 = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 3, b: 2 }];
        const tt = 6;
        it('6.Sum', () => {
            const get = DataHelper.Sum(t1, 'a');
            expected(get).to.deep.equal(tt);
        });
    });
    describe('7.RightJoin', () => {
        const out1 = [
            { a: 1, b: 'b1', c: 'c1', e: 'e1', d: 'd1' },
            { a: 2, b: 'b2', c: 'c1', e: 'e1', d: 'd2' },
            { a: 1, b: 'b1', c: 'c2', e: 'e2', d: 'd1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2', d: 'd2' }
        ];
        const out2 = [
            { a: 1, b: 'b1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2' }
        ];
        const out3 = [
            { a: 1, b: 'b1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2' }
        ];
        const out4 = [
            { a: 1, b: 'b1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2' },
            { a: 1, b: 'b1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2' }
        ];
        it('7-1.RightJoin', () => {
            const get = DataHelper.RightJoin(in1, in2, ['a']);
            expected(get).to.deep.equal(out1);
        });
        it('7-2.RightJoin', () => {
            const get = DataHelper.RightJoin(in1, in2, ['a', 'b']);
            expected(get).to.deep.equal(out2);
        });
        it('7-3.RightJoin', () => {
            const get = DataHelper.RightJoin(in1, in2, ['a', 'b', 'c']);
            expected(get).to.deep.equal(out3);
        });
        it('7-4.RightJoin', () => {
            const get = DataHelper.RightJoin(in2, in3, ['b']);
            expected(get).to.deep.equal(out4);
        });
    });
    describe('8.RightJoinLarge', () => {
        const out1 = [
            { a: 1, b: 'b1', c: 'c1', e: 'e1', d: 'd1' },
            { a: 2, b: 'b2', c: 'c1', e: 'e1', d: 'd2' },
            { a: 1, b: 'b1', c: 'c2', e: 'e2', d: 'd1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2', d: 'd2' }
        ];
        const out2 = [
            { a: 1, b: 'b1', c: 'c1', e: 'e1', d: 'd1' },
            { a: 2, b: 'b2', c: 'c1', e: 'e1', d: 'd2' },
            { a: 1, b: 'b1', c: 'c2', e: 'e2', d: 'd1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2', d: 'd2' }
        ];
        const out3 = [
            { a: 1, b: 'b1', c: 'c1', e: 'e1', d: 'd1' },
            { a: 2, b: 'b2', c: 'c1', e: 'e1', d: 'd2' },
            { a: 1, b: 'b1', c: 'c2', e: 'e2', d: 'd1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2', d: 'd2' }
        ];
        const out4 = [
            { a: 1, b: 'b1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2' },
            { a: 1, b: 'b1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', c: 'c2', e: 'e2' }
        ];
        it('8-1.RightJoinLarge', () => {
            const get = DataHelper.RightJoinLarge(in1, in2, ['a']);
            expected(get).to.deep.equal(out1);
        });
        it('8-2.RightJoinLarge', () => {
            const get = DataHelper.RightJoinLarge(in1, in2, ['a', 'b']);
            expected(get).to.deep.equal(out2);
        });
        it('8-3.RightJoinLarge', () => {
            const get = DataHelper.RightJoinLarge(in1, in2, ['a', 'b', 'c']);
            expected(get).to.deep.equal(out3);
        });
        it('8-4.RightJoinLarge', () => {
            const get = DataHelper.RightJoinLarge(in2, in3, ['b']);
            expected(get).to.deep.equal(out4);
        });
    });
    describe('9.LeftJoin', () => {
        const out1 = [
            { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
            { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
        ];
        const out2 = [
            { a: 1, b: 'b1', d: 'd1' },
            { a: 2, b: 'b2', d: 'd2' }
        ];
        const out3 = [
            { a: 1, b: 'b1', d: 'd1' },
            { a: 2, b: 'b2', d: 'd2' }
        ];
        const out4 = [
            { a: 1, b: 'bb1', c: 'c1', e: 'e1' },
            { a: 2, b: 'bb2', c: 'c2', e: 'e2' },
            { a: 1, b: 'bb1', c: 'c1', e: 'e1' },
            { a: 2, b: 'bb2', c: 'c2', e: 'e2' }
        ];
        it('9-1.LeftJoin', () => {
            const get = DataHelper.LeftJoin(in1, in2, ['a']);
            expected(get).to.deep.equal(out1);
        });
        it('9-2.LeftJoin', () => {
            const get = DataHelper.LeftJoin(in1, in2, ['a', 'b']);
            expected(get).to.deep.equal(out2);
        });
        it('9-3.LeftJoin', () => {
            const get = DataHelper.LeftJoin(in1, in2, ['a', 'b', 'c']);
            expected(get).to.deep.equal(out3);
        });
        it('9-4.LeftJoin', () => {
            const get = DataHelper.LeftJoin(in2, in3, ['b']);
            expected(get).to.deep.equal(out4);
        });
    });
    describe('10.LeftJoinLarge', () => {
        const out1 = [
            { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
            { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
        ];
        const out2 = [
            { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
            { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
        ];
        const out3 = [
            { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
            { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
            { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
        ];
        const out4 = [
            { a: 1, b: 'bb1', c: 'c1', e: 'e1' },
            { a: 2, b: 'bb2', c: 'c2', e: 'e2' },
            { a: 1, b: 'bb1', c: 'c1', e: 'e1' },
            { a: 2, b: 'bb2', c: 'c2', e: 'e2' }
        ];
        it('10-1.LeftJoinLarge', () => {
            const get = DataHelper.LeftJoinLarge(in1, in2, ['a']);
            expected(get).to.deep.equal(out1);
        });
        it('10-2.LeftJoinLarge', () => {
            const get = DataHelper.LeftJoinLarge(in1, in2, ['a', 'b']);
            expected(get).to.deep.equal(out2);
        });
        it('10-3.LeftJoinLarge', () => {
            const get = DataHelper.LeftJoinLarge(in1, in2, ['a', 'b', 'c']);
            expected(get).to.deep.equal(out3);
        });
        it('10-4.LeftJoinLarge', () => {
            const get = DataHelper.LeftJoinLarge(in2, in3, ['b']);
            expected(get).to.deep.equal(out4);
        });
    });
    describe('11.InnerJoinLarge', () => {
        it('11-1.InnerJoinLarge-只有兩個都有的key才會出來', () => {
            const out = [
                { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
                { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
            ];
            const get = DataHelper.InnerJoinLarge(in1, in2, ['a']);
            expected(get).to.deep.equal(out);
        });
        it('11-2.InnerJoinLarge-只有兩個都有的key才會出來', () => {
            const out = [
                { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
                { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
            ];
            const get = DataHelper.InnerJoinLarge(in1, in2, ['a', 'b']);
            expected(get).to.deep.equal(out);
        });
    });
    describe('12.OuterJoinLarge', () => {
        it('12-1.OuterJoinLarge-都要一樣才會命中', () => {
            const out = [
                { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
                { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
            ];
            const get = DataHelper.OuterJoinLarge(in1, in2, ['a']);
            expected(get).to.deep.equal(out);
        });
        it('12-2.OuterJoinLarge-都要一樣才會命中', () => {
            const out = [
                { a: 1, b: 'b1', d: 'd1', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd1', c: 'c2', e: 'e2' },
                { a: 1, b: 'b1', d: 'd2', c: 'c1', e: 'e1' },
                { a: 2, b: 'b2', d: 'd2', c: 'c2', e: 'e2' }
            ];
            const get = DataHelper.OuterJoinLarge(in1, in2, ['a', 'b']);
            expected(get).to.deep.equal(out);
        });
    });
    describe('13.IntToBoolean', () => {
        it('13-1.指定屬性轉成布林', () => {
            const into = {
                a: 1, b: 2, d: 3, c: '1', e: '2',
                f: '11', g: 'sss'
            };
            const out = {
                a: true, b: false, d: 3, c: '1', e: false, f: false, g: false
            };
            const get = DataHelper.IntToBoolean(into, ['a', 'b', 'f', 'e', 'g']);
            expected(get).to.deep.equal(out);
        });
        it('13-2.將不存在的個屬性轉成布林', () => {
            const into = {
                a: 1, b: 2, d: 3, c: '1', e: '2',
                f: '11', g: 'sss'
            };
            const out = {
                a: true, b: false, d: 3, c: '1', e: false, f: false, g: 'sss'
            };
            const get = DataHelper.IntToBoolean(into, ['a', 'b', 'f', 'e', 'z', 'aaa', 'bbb']);
            expected(get).to.deep.equal(out);
        });
        it('13-3.屬性等於設定的數值換轉成true,其餘指定的屬性會是false', () => {
            const into = {
                a: 1, b: 2, d: 3, c: '1', e: '2',
                f: '11', g: 'sss'
            };
            const out = {
                a: false, b: false, d: 3, c: '1', e: false, f: true, g: 'sss'
            };
            const get = DataHelper.IntToBoolean(into, ['a', 'b', 'f', 'e', 'z', 'aaa', 'bbb'], 11);
            expected(get).to.deep.equal(out);
        });
        it('13-4.空的物件直接返回空物件', () => {
            const into = {};
            const get = DataHelper.IntToBoolean(into, ['a', 'b', 'f', 'e', 'z', 'aaa', 'bbb'], 11);
            expected(get).to.deep.equal(into);
        });
    });
    describe('14.MergeList', () => {
        const t1 = { a: 1 };
        const t2 = { b: 1 };
        const t3 = { d: 1, e: 1 };
        const t4 = { f: 1, g: 1 };
        const out = {
            a: 1, b: 1, d: 1, e: 1, f: 1, g: 1
        };
        it('1.MergeList', () => {
            const get = DataHelper.MergeList(t1, t2, t3, t4);
            expected(get).to.deep.equal(out);
        });
    });
    describe('IntMoreToBoolean()', () => {
        it('指定的屬性等於0(預設)的時候會變成false,否為false', () => {
            const sData = {
                a: 1, b: 2, c: 0, d: 'aaa', o: undefined
            };
            const rep = {
                a: true, b: 2, c: false, d: 'aaa', o: undefined
            };
            const get = DataHelper.IntMoreToBoolean(sData, ['a', 'c']);
            expected(get).to.deep.equal(rep);
        });
        it('如果是空的物件就不處理返回空物件', () => {
            const sData = {};
            const rep = {};
            const get = DataHelper.IntMoreToBoolean(sData, ['a', 'c']);
            expected(get).to.deep.equal(rep);
        });
        it('指定的屬性等於指定的數字的時候會變成false,否為true', () => {
            const sData = {
                a: 10, b: 1, c: 0, d: 'aaa', e: 10, f: 1, o: undefined
            };
            const rep = {
                a: false, b: 1, c: true, d: 'aaa', e: 10, f: true, o: undefined
            };
            const get = DataHelper.IntMoreToBoolean(sData, ['a', 'c', 'f', 'o'], 10);
            expected(get).to.deep.equal(rep);
        });
    });
    describe('BooleanToInt()', () => {
        it('指定的屬性等於true的時候會變成1,否為0', () => {
            const sData = {
                a: true, b: 2, c: false, d: 'aaa', o: undefined
            };
            const rep = {
                a: 1, b: 2, c: 0, d: 'aaa', o: undefined
            };
            const get = DataHelper.BooleanToInt(sData, ['a', 'c', 'o']);
            expected(get).to.deep.equal(rep);
        });
        it('如果是空的物件就不處理返回空物件', () => {
            const sData = {};
            const rep = {};
            const get = DataHelper.BooleanToInt(sData, ['a', 'c']);
            expected(get).to.deep.equal(rep);
        });
    });
});
