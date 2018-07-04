import { validate } from 'class-validator';
import * as _ from 'lodash';
import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
import AnyEntity from '../models/AnyEntity';
import GamaEntity from '../models/GamaEntity';
import GamaExceptions from '../models/GamaExceptions';
import { LibsExceptions } from '../models/LibsExceptions';
import { IAJoins, ICondition, IJoins, IOrderBy, IQueryOptions, IUniqueField } from './DaoOperator';

/**
 * 這個class就是幫你製作出SQL需要的物件
 * @export
 * @class SQLHelper
 */
export default class GamaSQLHelper {
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $in: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any[]} values 你要塞的數值陣列
     * @returns ICondition
     * @memberof SQLHelper
     */

    public static In(key: string, values: any[]) {
        return new AnyEntity().toObj(key, { $in: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $ne: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static NotEq(key: string, values: any) {
        return new AnyEntity().toObj(key, { $ne: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $between: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static Between(key: string, values: number[] | Date[]) {
        return new AnyEntity().toObj(key, { $between: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $lt: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static LessThan(key: string, values: any) {
        return new AnyEntity().toObj(key, { $lt: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $lte: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static LessThanEq(key: string, values: any) {
        return new AnyEntity().toObj(key, { $lte: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $gt: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static MoreThan(key: string, values: any) {
        return new AnyEntity().toObj(key, { $gt: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $gte: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static MoreThanEq(key: string, values: any) {
        return new AnyEntity().toObj(key, { $gte: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $like: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static Like(key: string, values: any) {
        return new AnyEntity().toObj(key, { $like: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $eq: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static Eq(key: string, values: any) {
        return new AnyEntity().toObj(key, { $eq: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $null: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values true 就是 null , false 就是 not null
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static IsNull(key: string, values: boolean) {
        return new AnyEntity().toObj(key, { $null: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {
     *       key: { $nin: values }
     *   };
     * @param {string} key 你要的Key Name
     * @param {any} values 你要塞的數值
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static NotIn(key: string, values: any) {
        return new AnyEntity().toObj(key, { $nin: values }) as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {}
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static NoCondition() {
        return {} as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     * {
     *  $and: [
     *          {
     *          key1: { '$gte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          }
     *        ]
     * @param {...ICondition} 你想組合的IConditions
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static And(...conds: ICondition[]) {
        return GamaSQLHelper.AndArray(conds);
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     * {
     *  $and: [
     *          {
     *          key1: { '$gte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          }
     *        ]
     * @param {ICondition[]} 你想組合的IConditions
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static AndArray(conds: ICondition[]) {
        return {
            $and: conds
        } as ICondition;
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     * {
     *  $or: [
     *          {
     *          key1: { '$gte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          }
     *        ]
     * @param {ICondition[]} 你想組合的IConditions
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static Or(...conds: ICondition[]) {
        return GamaSQLHelper.OrArray(conds);
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     * {
     *  $or: [
     *          {
     *          key1: { '$gte': values }
     *          },
     *          {
     *          key2: { '$lte': values }
     *          }
     *        ]
     * @param {ICondition[]} 你想組合的IConditions
     * @returns ICondition
     * @memberof SQLHelper
     */
    public static OrArray(conds: ICondition[]) {
        return {
            $or: conds
        } as ICondition;
    }
    /**
     * 幫你製作Fields跟要不要NoLock,預設是true
     * @param {string[] | undefined} fields
     * 就算只有一個也要用陣列包起來丟進來,不需要就輸入undefined
     * @param {boolean | undefined} [noLock=true]
     * 預設是true,不需要就輸入undefined或是false
     * @param {IOrderBy[] | undefined} orderby
     * 可以自己做或是由 @method OrderByEntity() 來幫忙製作,不需要就輸入undefined
     * @param {number | undefined} limitCount
     * TOP 限制輸出最多幾筆,不需要就輸入undefined
     * @param {string[] | undefined} group
     * 就是輸入需要Groupby的field名稱,不需要就輸入undefined
     * @param {boolean | undefined} disTinct
     * 這個也是輸入需要的field名稱,注意這個會自動順便Groupby你輸入的field,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static Fields(
        fields: string[] | undefined,
        noLock: boolean = true,
        orderby?: IOrderBy[] | undefined,
        limitCount?: number | undefined,
        group?: string[] | undefined,
        disTinct?: boolean | undefined
    ): IQueryOptions {
        return _.omitBy({
            field: fields,
            nolock: noLock,
            sort: orderby,
            limit: limitCount,
            groupby: group,
            distinct: disTinct
        }, _.isUndefined) as IQueryOptions;
    }
    /**
     * 幫你製作LeftJoins
     * { leftjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static LeftJoins(joins: IJoins[]): IAJoins {
        return {
            leftjoin: joins
        };
    }
    /**
     * 幫你製作Innerjoin
     * { innerjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static Innerjoin(joins: IJoins[]): IAJoins {
        return {
            innerjoin: joins
        };
    }
    /**
     * 幫你製作Rightjoin
     * { rightjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static Rightjoin(joins: IJoins[]): IAJoins {
        return {
            rightjoin: joins
        };
    }
    /**
     * 幫你製作outerjoin
     * { outerjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static Outerjoin(joins: IJoins[]): IAJoins {
        return {
            outerjoin: joins
        };
    }
    /**
     * 幫你製作MergeJoins
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static Mergejoins(joins: IAJoins[]): IAJoins {
        let finalJoins = {} as IAJoins;
        _.forEach(joins, (data) => {
            finalJoins = _.assign({}, finalJoins, data);
        });
        return finalJoins as IAJoins;
    }
    /**
     * 幫你製作Joins,其實這個也可以外面自己物件來製作,只要符合格式
     * { daoName2: idx }
     * @param {DaoEnum} tablesName tableName
     * @param {string} field 欄位
     * @returns {IJoins} 要對應的IJoins
     * @memberof SQLHelper
     */
    public static JoinEntity<T>(tablesName: T, ...field: string[]): IJoins {
        if (_.isUndefined(field) || _.size(field) > 2 || _.size(field) < 1) {
            throw new LibsExceptions(GamaHttpStatusCode.STATUS_FAIL, 'join-field must one or two params');
        } else {
            return new AnyEntity().toObj(tablesName as any, field);
        }
    }
    /**
     * 幫你製作OrderBy,其實這個也可以外面自己物件來製作,只要符合格式
     * { daoName2: boolean }
     * @param {string} field field欄位名稱
     * @param {boolean}  sort true是正序,fals是反序
     * @returns {IJoins} 要對應的IJoins
     * @memberof SQLHelper
     */
    public static OrderByEntity(field: string, sort: boolean): IOrderBy {
        return new AnyEntity().toObj(field, sort) as IOrderBy;
    }
    /**
     * 幫你製作全部field都要查詢跟要不要NoLock,預設是true
     * @param {boolean | undefined} [noLock=true] 預設是true,不需要就輸入undefined
     * @param {IOrderBy[] | undefined} orderby 你要的欄位,不需要就輸入undefined
     * @param {number | undefined} limitCount Top 你最多要的筆數,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static ALLFields(
        noLock: boolean | undefined = true,
        orderby?: IOrderBy[],
        limitCount?: number): IQueryOptions {
        return _.omitBy({
            field: undefined,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined) as IQueryOptions;
    }
    /**
     * 只有Max跟Min會用到的特殊Field
     * @param {string} afield 必填你要的欄位
     * @param {boolean | undefined} [noLock=true] 預設是true,不需要就輸入undefined
     * @param {IOrderBy[] | undefined} orderby 你要的欄位,不需要就輸入undefined
     * @param {number | undefined} limitCount Top 你最多要的筆數,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static UniqueField(
        afield: string[],
        noLock: boolean | undefined = true,
        orderby?: IOrderBy[] | undefined,
        limitCount?: number | undefined): IUniqueField {
        return _.omitBy({
            field: afield,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined) as IUniqueField;
    }
    /**
     * 幫你製作全部field除了你不要的field,NoLock預設是true
     * @param {BaseEntity} entity 你要輸出的Entity
     * @param {string[]} fieldsWithout 你要不需要的欄位名稱陣列
     * @param {boolean | undefined} [noLock=true] 預設是true,不需要就輸入undefined
     * @param {IOrderBy[] | undefined} orderby 你要的欄位,不需要就輸入undefined
     * @param {number | undefined} limitCount Top 你最多要的筆數,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    public static FieldsWithout(
        entity: GamaEntity,
        fieldsWithout: string[],
        noLock: boolean | undefined = true,
        orderby?: IOrderBy[] | undefined,
        limitCount?: number | undefined
    ): IQueryOptions {
        const fields = entity.fields();
        _.pullAll(fields, fieldsWithout);
        return _.omitBy({
            field: fields,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined) as IQueryOptions;
    }
    /**
     * 這只是暫時的
     * 目前底層ORM遇到的BUG處理方法
     * @memberof SQLHelper
     */
    /* istanbul ignore next */
    public static BugFixUpdateSqlRepeatValue(obj: any) {
        return _.map(obj, (data) => {
            /* istanbul ignore next */
            return _.mapValues(data, (v) => {
                return _.isArrayLikeObject(v) ? _.head(v) : v;
            });
        });
    }
}
