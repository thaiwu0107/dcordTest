import { validate } from 'class-validator';
import * as _ from 'lodash';
import * as joins from 'lodash-joins';
import AnyEntity from '../models/AnyEntity';

export interface IFS {
    field: string[] | undefined;
    nolock: boolean | undefined;
}
/**
 * 這個class就是幫你處理Data的後處理
 * Large是指超過一千筆資料
 * 普通就是大概100筆左右
 * @export
 * @class DataHelper
 */
export default class GamaDataHelper {
    public static OuterJoin(aData: any[], bData: any[], key: string[]) {
        const acc = (a) => key;
        return joins.hashFullOuterJoin(aData, acc, bData, acc);
    }
    public static OuterJoinLarge(aData: any[], bData: any[], key: string[]) {
        const acc = (a) => key;
        return joins.sortedMergeFullOuterJoin(aData, acc, bData, acc);
    }
    public static InnerJoin(aData: any[], bData: any[], key: string[]) {
        const acc = (a) => key;
        return joins.hashInnerJoin(aData, acc, bData, acc);
    }
    public static InnerJoinLarge(aData: any[], bData: any[], key: string[]) {
        const acc = (a) => key;
        return joins.sortedMergeInnerJoin(aData, acc, bData, acc);
    }
    public static Existy(x) {
        return x !== undefined;
    }
    public static Merge(aData: any, bData: any) {
        return _.assign({}, aData, bData);
    }
    public static MergeList(...aData: any[]) {
        return _.reduce(aData, (sum, next) => {
            return this.Merge(sum, next);
        });
    }
    public static Max(aData: any[], key: string) {
        return _.maxBy(aData, key);
    }
    public static Min(aData: any[], key: string) {
        return _.minBy(aData, key);
    }
    public static Sum(aData: any[], key: string) {
        return _.sumBy(aData, key);
    }
    /**
     * 這個是取出相同的Key沒有的null
     * @param {any[]} aData 左
     * @param {any[]} bData 右
     * @param {string[]} key 相同的key
     * @returns 合併過的陣列
     * @memberof DataHelper
     */
    public static RightJoinLarge(aData: any[], bData: any[], key: string[]) {
        const acc = (a) => key;
        return joins.sortedMergeRightOuterJoin(aData, acc, bData, acc);
    }
    /**
     * 這個是取出相同的Key沒有的null
     * @param {any[]} aData 左
     * @param {any[]} bData 右
     * @param {string[]} key 相同的key
     * @returns 合併過的陣列
     * @memberof DataHelper
     */
    public static LeftJoin(aData: any[], bData: any[], key: string[]) {
        const acc = (a) => key;
        return joins.hashLeftOuterJoin(aData, acc, bData, acc);
    }
    /**
     * 這個是取出相同的Key沒有的null
     * @param {any[]} aData 左
     * @param {any[]} bData 右
     * @param {string[]} key 相同的key
     * @returns 合併過的陣列
     * @memberof DataHelper
     */
    public static RightJoin(aData: any[], bData: any[], key: string[]) {
        const acc = (a) => key;
        return joins.hashRightOuterJoin(aData, acc, bData, acc);
    }
    /**
     * 這個是取出相同的Key沒有的null
     * @param {any[]} aData 左
     * @param {any[]} bData 右
     * @param {string[]} key 相同的key
     * @returns 合併過的陣列
     * @memberof DataHelper
     */
    public static LeftJoinLarge(aData: any[], bData: any[], key: string[]) {
        const acc = (a) => key;
        return joins.sortedMergeLeftOuterJoin(aData, acc, bData, acc);
    }
    public static IntToBoolean(data: any, fields: string[], toTrue = 1) {
        if (_.isEmpty(data)) {
            return {};
        }
        _.forEach(fields, (key) => {
            if (!_.isUndefined(data[key])) {
                _.toSafeInteger(data[key]) === toTrue ?
                    data[key] = true :
                    data[key] = false;
            }
        });
        return data;
    }
    public static IntMoreToBoolean(data: any, fields: string[], toTrue = 0) {
        if (_.isEmpty(data)) {
            return {};
        }
        _.forEach(fields, (key) => {
            if (!_.isUndefined(data[key])) {
                _.toSafeInteger(data[key]) === toTrue ?
                    data[key] = false :
                    data[key] = true;
            }
        });
        return data;
    }
    public static BooleanToInt(data: any, fields: string[]) {
        if (_.isEmpty(data)) {
            return {};
        }
        _.forEach(fields, (key) => {
            if (!_.isUndefined(data[key])) {
                data[key] === true ?
                    data[key] = 1 :
                    data[key] = 0;
            }
        });
        return data;
    }
}
