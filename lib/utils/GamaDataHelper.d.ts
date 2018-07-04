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
    static OuterJoin(aData: any[], bData: any[], key: string[]): any[];
    static OuterJoinLarge(aData: any[], bData: any[], key: string[]): any[];
    static InnerJoin(aData: any[], bData: any[], key: string[]): any[];
    static InnerJoinLarge(aData: any[], bData: any[], key: string[]): any[];
    static Existy(x: any): boolean;
    static Merge(aData: any, bData: any): any;
    static MergeList(...aData: any[]): any;
    static Max(aData: any[], key: string): any;
    static Min(aData: any[], key: string): any;
    static Sum(aData: any[], key: string): number;
    /**
     * 這個是取出相同的Key沒有的null
     * @param {any[]} aData 左
     * @param {any[]} bData 右
     * @param {string[]} key 相同的key
     * @returns 合併過的陣列
     * @memberof DataHelper
     */
    static RightJoinLarge(aData: any[], bData: any[], key: string[]): any[];
    /**
     * 這個是取出相同的Key沒有的null
     * @param {any[]} aData 左
     * @param {any[]} bData 右
     * @param {string[]} key 相同的key
     * @returns 合併過的陣列
     * @memberof DataHelper
     */
    static LeftJoin(aData: any[], bData: any[], key: string[]): any[];
    /**
     * 這個是取出相同的Key沒有的null
     * @param {any[]} aData 左
     * @param {any[]} bData 右
     * @param {string[]} key 相同的key
     * @returns 合併過的陣列
     * @memberof DataHelper
     */
    static RightJoin(aData: any[], bData: any[], key: string[]): any[];
    /**
     * 這個是取出相同的Key沒有的null
     * @param {any[]} aData 左
     * @param {any[]} bData 右
     * @param {string[]} key 相同的key
     * @returns 合併過的陣列
     * @memberof DataHelper
     */
    static LeftJoinLarge(aData: any[], bData: any[], key: string[]): any[];
    static IntToBoolean(data: any, fields: string[], toTrue?: number): any;
    static IntMoreToBoolean(data: any, fields: string[], toTrue?: number): any;
    static BooleanToInt(data: any, fields: string[]): any;
}
