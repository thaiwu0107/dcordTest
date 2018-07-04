"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const GamaHttpStatusCode_1 = require("../config/GamaHttpStatusCode");
const AnyEntity_1 = require("../models/AnyEntity");
const LibsExceptions_1 = require("../models/LibsExceptions");
/**
 * 這個class就是幫你製作出SQL需要的物件
 * @export
 * @class SQLHelper
 */
class GamaSQLHelper {
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
    static In(key, values) {
        return new AnyEntity_1.default().toObj(key, { $in: values });
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
    static NotEq(key, values) {
        return new AnyEntity_1.default().toObj(key, { $ne: values });
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
    static Between(key, values) {
        return new AnyEntity_1.default().toObj(key, { $between: values });
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
    static LessThan(key, values) {
        return new AnyEntity_1.default().toObj(key, { $lt: values });
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
    static LessThanEq(key, values) {
        return new AnyEntity_1.default().toObj(key, { $lte: values });
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
    static MoreThan(key, values) {
        return new AnyEntity_1.default().toObj(key, { $gt: values });
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
    static MoreThanEq(key, values) {
        return new AnyEntity_1.default().toObj(key, { $gte: values });
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
    static Like(key, values) {
        return new AnyEntity_1.default().toObj(key, { $like: values });
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
    static Eq(key, values) {
        return new AnyEntity_1.default().toObj(key, { $eq: values });
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
    static IsNull(key, values) {
        return new AnyEntity_1.default().toObj(key, { $null: values });
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
    static NotIn(key, values) {
        return new AnyEntity_1.default().toObj(key, { $nin: values });
    }
    /**
     * 幫你製作SQL select的Condition
     * 真實模樣：
     *   {}
     * @returns ICondition
     * @memberof SQLHelper
     */
    static NoCondition() {
        return {};
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
    static And(...conds) {
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
    static AndArray(conds) {
        return {
            $and: conds
        };
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
    static Or(...conds) {
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
    static OrArray(conds) {
        return {
            $or: conds
        };
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
    static Fields(fields, noLock = true, orderby, limitCount, group, disTinct) {
        return _.omitBy({
            field: fields,
            nolock: noLock,
            sort: orderby,
            limit: limitCount,
            groupby: group,
            distinct: disTinct
        }, _.isUndefined);
    }
    /**
     * 幫你製作LeftJoins
     * { leftjoin: [ { daoName2: idx } ] }
     * @param {IJoins[]} joins 就算只有一個也要用陣列包起來丟進來
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static LeftJoins(joins) {
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
    static Innerjoin(joins) {
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
    static Rightjoin(joins) {
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
    static Outerjoin(joins) {
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
    static Mergejoins(joins) {
        let finalJoins = {};
        _.forEach(joins, (data) => {
            finalJoins = _.assign({}, finalJoins, data);
        });
        return finalJoins;
    }
    /**
     * 幫你製作Joins,其實這個也可以外面自己物件來製作,只要符合格式
     * { daoName2: idx }
     * @param {DaoEnum} tablesName tableName
     * @param {string} field 欄位
     * @returns {IJoins} 要對應的IJoins
     * @memberof SQLHelper
     */
    static JoinEntity(tablesName, ...field) {
        if (_.isUndefined(field) || _.size(field) > 2 || _.size(field) < 1) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'join-field must one or two params');
        }
        else {
            return new AnyEntity_1.default().toObj(tablesName, field);
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
    static OrderByEntity(field, sort) {
        return new AnyEntity_1.default().toObj(field, sort);
    }
    /**
     * 幫你製作全部field都要查詢跟要不要NoLock,預設是true
     * @param {boolean | undefined} [noLock=true] 預設是true,不需要就輸入undefined
     * @param {IOrderBy[] | undefined} orderby 你要的欄位,不需要就輸入undefined
     * @param {number | undefined} limitCount Top 你最多要的筆數,不需要就輸入undefined
     * @returns {IFields} 回傳幫你製作好的Fields
     * @memberof SQLHelper
     */
    static ALLFields(noLock = true, orderby, limitCount) {
        return _.omitBy({
            field: undefined,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined);
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
    static UniqueField(afield, noLock = true, orderby, limitCount) {
        return _.omitBy({
            field: afield,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined);
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
    static FieldsWithout(entity, fieldsWithout, noLock = true, orderby, limitCount) {
        const fields = entity.fields();
        _.pullAll(fields, fieldsWithout);
        return _.omitBy({
            field: fields,
            nolock: noLock,
            sort: orderby,
            limit: limitCount
        }, _.isUndefined);
    }
    /**
     * 這只是暫時的
     * 目前底層ORM遇到的BUG處理方法
     * @memberof SQLHelper
     */
    /* istanbul ignore next */
    static BugFixUpdateSqlRepeatValue(obj) {
        return _.map(obj, (data) => {
            /* istanbul ignore next */
            return _.mapValues(data, (v) => {
                return _.isArrayLikeObject(v) ? _.head(v) : v;
            });
        });
    }
}
exports.default = GamaSQLHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtYVNRTEhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2d0dG9vNDQvRGVza3RvcC9iYXNlQVBJL3NyYy8iLCJzb3VyY2VzIjpbInV0aWxzL0dhbWFTUUxIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0QkFBNEI7QUFDNUIscUVBQWtFO0FBQ2xFLG1EQUE0QztBQUc1Qyw2REFBMEQ7QUFHMUQ7Ozs7R0FJRztBQUNIO0lBQ0k7Ozs7Ozs7Ozs7T0FVRztJQUVJLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBVyxFQUFFLE1BQWE7UUFDdkMsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFlLENBQUM7SUFDckUsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQVcsRUFBRSxNQUFXO1FBQ3hDLE9BQU8sSUFBSSxtQkFBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBZSxDQUFDO0lBQ3JFLENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBeUI7UUFDeEQsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFlLENBQUM7SUFDMUUsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7SUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQVcsRUFBRSxNQUFXO1FBQzNDLE9BQU8sSUFBSSxtQkFBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBZSxDQUFDO0lBQ3JFLENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXLEVBQUUsTUFBVztRQUM3QyxPQUFPLElBQUksbUJBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQWUsQ0FBQztJQUN0RSxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBVyxFQUFFLE1BQVc7UUFDM0MsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFlLENBQUM7SUFDckUsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVcsRUFBRSxNQUFXO1FBQzdDLE9BQU8sSUFBSSxtQkFBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBZSxDQUFDO0lBQ3RFLENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFXLEVBQUUsTUFBVztRQUN2QyxPQUFPLElBQUksbUJBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQWUsQ0FBQztJQUN2RSxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNJLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBVyxFQUFFLE1BQVc7UUFDckMsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFlLENBQUM7SUFDckUsQ0FBQztJQUNEOzs7Ozs7Ozs7O09BVUc7SUFDSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQVcsRUFBRSxNQUFlO1FBQzdDLE9BQU8sSUFBSSxtQkFBUyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBZSxDQUFDO0lBQ3ZFLENBQUM7SUFDRDs7Ozs7Ozs7OztPQVVHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFXLEVBQUUsTUFBVztRQUN4QyxPQUFPLElBQUksbUJBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQWUsQ0FBQztJQUN0RSxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFdBQVc7UUFDckIsT0FBTyxFQUFnQixDQUFDO0lBQzVCLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBbUI7UUFDcEMsT0FBTyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0ksTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFtQjtRQUN0QyxPQUFPO1lBQ0gsSUFBSSxFQUFFLEtBQUs7U0FDQSxDQUFDO0lBQ3BCLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBbUI7UUFDbkMsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQW1CO1FBQ3JDLE9BQU87WUFDSCxHQUFHLEVBQUUsS0FBSztTQUNDLENBQUM7SUFDcEIsQ0FBQztJQUNEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FDaEIsTUFBNEIsRUFDNUIsU0FBa0IsSUFBSSxFQUN0QixPQUFnQyxFQUNoQyxVQUErQixFQUMvQixLQUE0QixFQUM1QixRQUE4QjtRQUU5QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDWixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsVUFBVTtZQUNqQixPQUFPLEVBQUUsS0FBSztZQUNkLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBa0IsQ0FBQztJQUN2QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFlO1FBQ25DLE9BQU87WUFDSCxRQUFRLEVBQUUsS0FBSztTQUNsQixDQUFDO0lBQ04sQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBZTtRQUNuQyxPQUFPO1lBQ0gsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztJQUNOLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQWU7UUFDbkMsT0FBTztZQUNILFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUM7SUFDTixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFlO1FBQ25DLE9BQU87WUFDSCxTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDO0lBQ04sQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFnQjtRQUNyQyxJQUFJLFVBQVUsR0FBRyxFQUFhLENBQUM7UUFDL0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QixVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFxQixDQUFDO0lBQ2pDLENBQUM7SUFDRDs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBSSxVQUFhLEVBQUUsR0FBRyxLQUFlO1FBQ3pELElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoRSxNQUFNLElBQUksK0JBQWMsQ0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztTQUNqRzthQUFNO1lBQ0gsT0FBTyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxRDtJQUNMLENBQUM7SUFDRDs7Ozs7OztPQU9HO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFhLEVBQUUsSUFBYTtRQUNwRCxPQUFPLElBQUksbUJBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFhLENBQUM7SUFDMUQsQ0FBQztJQUNEOzs7Ozs7O09BT0c7SUFDSSxNQUFNLENBQUMsU0FBUyxDQUNuQixTQUE4QixJQUFJLEVBQ2xDLE9BQW9CLEVBQ3BCLFVBQW1CO1FBQ25CLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNaLEtBQUssRUFBRSxTQUFTO1lBQ2hCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsVUFBVTtTQUNwQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQWtCLENBQUM7SUFDdkMsQ0FBQztJQUNEOzs7Ozs7OztPQVFHO0lBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FDckIsTUFBZ0IsRUFDaEIsU0FBOEIsSUFBSSxFQUNsQyxPQUFnQyxFQUNoQyxVQUErQjtRQUMvQixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDWixLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsVUFBVTtTQUNwQixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQWlCLENBQUM7SUFDdEMsQ0FBQztJQUNEOzs7Ozs7Ozs7T0FTRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQ3ZCLE1BQWtCLEVBQ2xCLGFBQXVCLEVBQ3ZCLFNBQThCLElBQUksRUFDbEMsT0FBZ0MsRUFDaEMsVUFBK0I7UUFFL0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNaLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxVQUFVO1NBQ3BCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBa0IsQ0FBQztJQUN2QyxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILDBCQUEwQjtJQUNuQixNQUFNLENBQUMsMEJBQTBCLENBQUMsR0FBUTtRQUM3QyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkIsMEJBQTBCO1lBQzFCLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBbGNELGdDQWtjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IEdhbWFIdHRwU3RhdHVzQ29kZSB9IGZyb20gJy4uL2NvbmZpZy9HYW1hSHR0cFN0YXR1c0NvZGUnO1xuaW1wb3J0IEFueUVudGl0eSBmcm9tICcuLi9tb2RlbHMvQW55RW50aXR5JztcbmltcG9ydCBHYW1hRW50aXR5IGZyb20gJy4uL21vZGVscy9HYW1hRW50aXR5JztcbmltcG9ydCBHYW1hRXhjZXB0aW9ucyBmcm9tICcuLi9tb2RlbHMvR2FtYUV4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgTGlic0V4Y2VwdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvTGlic0V4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgSUFKb2lucywgSUNvbmRpdGlvbiwgSUpvaW5zLCBJT3JkZXJCeSwgSVF1ZXJ5T3B0aW9ucywgSVVuaXF1ZUZpZWxkIH0gZnJvbSAnLi9EYW9PcGVyYXRvcic7XG5cbi8qKlxuICog6YCZ5YCLY2xhc3PlsLHmmK/luavkvaDoo73kvZzlh7pTUUzpnIDopoHnmoTnianku7ZcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBTUUxIZWxwZXJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtYVNRTEhlbHBlciB7XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqICAge1xuICAgICAqICAgICAgIGtleTogeyAkaW46IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueVtdfSB2YWx1ZXMg5L2g6KaB5aGe55qE5pW45YC86Zmj5YiXXG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cblxuICAgIHB1YmxpYyBzdGF0aWMgSW4oa2V5OiBzdHJpbmcsIHZhbHVlczogYW55W10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJGluOiB2YWx1ZXMgfSkgYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqICAge1xuICAgICAqICAgICAgIGtleTogeyAkbmU6IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVzIOS9oOimgeWhnueahOaVuOWAvFxuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBOb3RFcShrZXk6IHN0cmluZywgdmFsdWVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJG5lOiB2YWx1ZXMgfSkgYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqICAge1xuICAgICAqICAgICAgIGtleTogeyAkYmV0d2VlbjogdmFsdWVzIH1cbiAgICAgKiAgIH07XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSDkvaDopoHnmoRLZXkgTmFtZVxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZXMg5L2g6KaB5aGe55qE5pW45YC8XG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEJldHdlZW4oa2V5OiBzdHJpbmcsIHZhbHVlczogbnVtYmVyW10gfCBEYXRlW10pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJGJldHdlZW46IHZhbHVlcyB9KSBhcyBJQ29uZGl0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICogICB7XG4gICAgICogICAgICAga2V5OiB7ICRsdDogdmFsdWVzIH1cbiAgICAgKiAgIH07XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSDkvaDopoHnmoRLZXkgTmFtZVxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZXMg5L2g6KaB5aGe55qE5pW45YC8XG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIExlc3NUaGFuKGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IEFueUVudGl0eSgpLnRvT2JqKGtleSwgeyAkbHQ6IHZhbHVlcyB9KSBhcyBJQ29uZGl0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICogICB7XG4gICAgICogICAgICAga2V5OiB7ICRsdGU6IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVzIOS9oOimgeWhnueahOaVuOWAvFxuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBMZXNzVGhhbkVxKGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IEFueUVudGl0eSgpLnRvT2JqKGtleSwgeyAkbHRlOiB2YWx1ZXMgfSkgYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqICAge1xuICAgICAqICAgICAgIGtleTogeyAkZ3Q6IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVzIOS9oOimgeWhnueahOaVuOWAvFxuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBNb3JlVGhhbihrZXk6IHN0cmluZywgdmFsdWVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJGd0OiB2YWx1ZXMgfSkgYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqICAge1xuICAgICAqICAgICAgIGtleTogeyAkZ3RlOiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlcyDkvaDopoHloZ7nmoTmlbjlgLxcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTW9yZVRoYW5FcShrZXk6IHN0cmluZywgdmFsdWVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJGd0ZTogdmFsdWVzIH0pIGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgICBrZXk6IHsgJGxpa2U6IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVzIOS9oOimgeWhnueahOaVuOWAvFxuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBMaWtlKGtleTogc3RyaW5nLCB2YWx1ZXM6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IEFueUVudGl0eSgpLnRvT2JqKGtleSwgeyAkbGlrZTogdmFsdWVzIH0pIGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgICBrZXk6IHsgJGVxOiB2YWx1ZXMgfVxuICAgICAqICAgfTtcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IOS9oOimgeeahEtleSBOYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlcyDkvaDopoHloZ7nmoTmlbjlgLxcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgRXEoa2V5OiBzdHJpbmcsIHZhbHVlczogYW55KSB7XG4gICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmooa2V5LCB7ICRlcTogdmFsdWVzIH0pIGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgICBrZXk6IHsgJG51bGw6IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVzIHRydWUg5bCx5pivIG51bGwgLCBmYWxzZSDlsLHmmK8gbm90IG51bGxcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgSXNOdWxsKGtleTogc3RyaW5nLCB2YWx1ZXM6IGJvb2xlYW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJG51bGw6IHZhbHVlcyB9KSBhcyBJQ29uZGl0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICogICB7XG4gICAgICogICAgICAga2V5OiB7ICRuaW46IHZhbHVlcyB9XG4gICAgICogICB9O1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg5L2g6KaB55qES2V5IE5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVzIOS9oOimgeWhnueahOaVuOWAvFxuICAgICAqIEByZXR1cm5zIElDb25kaXRpb25cbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBOb3RJbihrZXk6IHN0cmluZywgdmFsdWVzOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihrZXksIHsgJG5pbjogdmFsdWVzIH0pIGFzIElDb25kaXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiAgIHt9XG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE5vQ29uZGl0aW9uKCkge1xuICAgICAgICByZXR1cm4ge30gYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqIHtcbiAgICAgKiAgJGFuZDogW1xuICAgICAqICAgICAgICAgIHtcbiAgICAgKiAgICAgICAgICBrZXkxOiB7ICckZ3RlJzogdmFsdWVzIH1cbiAgICAgKiAgICAgICAgICB9LFxuICAgICAqICAgICAgICAgIHtcbiAgICAgKiAgICAgICAgICBrZXkyOiB7ICckbHRlJzogdmFsdWVzIH1cbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICAgIF1cbiAgICAgKiBAcGFyYW0gey4uLklDb25kaXRpb259IOS9oOaDs+e1hOWQiOeahElDb25kaXRpb25zXG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEFuZCguLi5jb25kczogSUNvbmRpdGlvbltdKSB7XG4gICAgICAgIHJldHVybiBHYW1hU1FMSGVscGVyLkFuZEFycmF5KGNvbmRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cU1FMIHNlbGVjdOeahENvbmRpdGlvblxuICAgICAqIOecn+Wvpuaooeaoo++8mlxuICAgICAqIHtcbiAgICAgKiAgJGFuZDogW1xuICAgICAqICAgICAgICAgIHtcbiAgICAgKiAgICAgICAgICBrZXkxOiB7ICckZ3RlJzogdmFsdWVzIH1cbiAgICAgKiAgICAgICAgICB9LFxuICAgICAqICAgICAgICAgIHtcbiAgICAgKiAgICAgICAgICBrZXkyOiB7ICckbHRlJzogdmFsdWVzIH1cbiAgICAgKiAgICAgICAgICB9LFxuICAgICAqICAgICAgICAgIHtcbiAgICAgKiAgICAgICAgICBrZXkyOiB7ICckbHRlJzogdmFsdWVzIH1cbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICAgIF1cbiAgICAgKiBAcGFyYW0ge0lDb25kaXRpb25bXX0g5L2g5oOz57WE5ZCI55qESUNvbmRpdGlvbnNcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgQW5kQXJyYXkoY29uZHM6IElDb25kaXRpb25bXSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJGFuZDogY29uZHNcbiAgICAgICAgfSBhcyBJQ29uZGl0aW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxTUUwgc2VsZWN055qEQ29uZGl0aW9uXG4gICAgICog55yf5a+m5qih5qij77yaXG4gICAgICoge1xuICAgICAqICAkb3I6IFtcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MTogeyAnJGd0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfSxcbiAgICAgKiAgICAgICAgICB7XG4gICAgICogICAgICAgICAga2V5MjogeyAnJGx0ZSc6IHZhbHVlcyB9XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgICBdXG4gICAgICogQHBhcmFtIHtJQ29uZGl0aW9uW119IOS9oOaDs+e1hOWQiOeahElDb25kaXRpb25zXG4gICAgICogQHJldHVybnMgSUNvbmRpdGlvblxuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE9yKC4uLmNvbmRzOiBJQ29uZGl0aW9uW10pIHtcbiAgICAgICAgcmV0dXJuIEdhbWFTUUxIZWxwZXIuT3JBcnJheShjb25kcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFNRTCBzZWxlY3TnmoRDb25kaXRpb25cbiAgICAgKiDnnJ/lr6bmqKHmqKPvvJpcbiAgICAgKiB7XG4gICAgICogICRvcjogW1xuICAgICAqICAgICAgICAgIHtcbiAgICAgKiAgICAgICAgICBrZXkxOiB7ICckZ3RlJzogdmFsdWVzIH1cbiAgICAgKiAgICAgICAgICB9LFxuICAgICAqICAgICAgICAgIHtcbiAgICAgKiAgICAgICAgICBrZXkyOiB7ICckbHRlJzogdmFsdWVzIH1cbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICAgIF1cbiAgICAgKiBAcGFyYW0ge0lDb25kaXRpb25bXX0g5L2g5oOz57WE5ZCI55qESUNvbmRpdGlvbnNcbiAgICAgKiBAcmV0dXJucyBJQ29uZGl0aW9uXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgT3JBcnJheShjb25kczogSUNvbmRpdGlvbltdKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkb3I6IGNvbmRzXG4gICAgICAgIH0gYXMgSUNvbmRpdGlvbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cRmllbGRz6Lef6KaB5LiN6KaBTm9Mb2NrLOmgkOioreaYr3RydWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ1tdIHwgdW5kZWZpbmVkfSBmaWVsZHNcbiAgICAgKiDlsLHnrpflj6rmnInkuIDlgIvkuZ/opoHnlKjpmaPliJfljIXotbfkvobkuJ/pgLLkvoYs5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHBhcmFtIHtib29sZWFuIHwgdW5kZWZpbmVkfSBbbm9Mb2NrPXRydWVdXG4gICAgICog6aCQ6Kit5pivdHJ1ZSzkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWTmiJbmmK9mYWxzZVxuICAgICAqIEBwYXJhbSB7SU9yZGVyQnlbXSB8IHVuZGVmaW5lZH0gb3JkZXJieVxuICAgICAqIOWPr+S7peiHquW3seWBmuaIluaYr+eUsSBAbWV0aG9kIE9yZGVyQnlFbnRpdHkoKSDkvobluavlv5noo73kvZws5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHBhcmFtIHtudW1iZXIgfCB1bmRlZmluZWR9IGxpbWl0Q291bnRcbiAgICAgKiBUT1Ag6ZmQ5Yi26Ly45Ye65pyA5aSa5bm+562GLOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nW10gfCB1bmRlZmluZWR9IGdyb3VwXG4gICAgICog5bCx5piv6Ly45YWl6ZyA6KaBR3JvdXBieeeahGZpZWxk5ZCN56ixLOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbiB8IHVuZGVmaW5lZH0gZGlzVGluY3RcbiAgICAgKiDpgJnlgIvkuZ/mmK/ovLjlhaXpnIDopoHnmoRmaWVsZOWQjeeosSzms6jmhI/pgJnlgIvmnIPoh6rli5XpoIbkvr9Hcm91cGJ55L2g6Ly45YWl55qEZmllbGQs5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHJldHVybnMge0lGaWVsZHN9IOWbnuWCs+W5q+S9oOijveS9nOWlveeahEZpZWxkc1xuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEZpZWxkcyhcbiAgICAgICAgZmllbGRzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCxcbiAgICAgICAgbm9Mb2NrOiBib29sZWFuID0gdHJ1ZSxcbiAgICAgICAgb3JkZXJieT86IElPcmRlckJ5W10gfCB1bmRlZmluZWQsXG4gICAgICAgIGxpbWl0Q291bnQ/OiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgICAgIGdyb3VwPzogc3RyaW5nW10gfCB1bmRlZmluZWQsXG4gICAgICAgIGRpc1RpbmN0PzogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICAgICk6IElRdWVyeU9wdGlvbnMge1xuICAgICAgICByZXR1cm4gXy5vbWl0Qnkoe1xuICAgICAgICAgICAgZmllbGQ6IGZpZWxkcyxcbiAgICAgICAgICAgIG5vbG9jazogbm9Mb2NrLFxuICAgICAgICAgICAgc29ydDogb3JkZXJieSxcbiAgICAgICAgICAgIGxpbWl0OiBsaW1pdENvdW50LFxuICAgICAgICAgICAgZ3JvdXBieTogZ3JvdXAsXG4gICAgICAgICAgICBkaXN0aW5jdDogZGlzVGluY3RcbiAgICAgICAgfSwgXy5pc1VuZGVmaW5lZCkgYXMgSVF1ZXJ5T3B0aW9ucztcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2cTGVmdEpvaW5zXG4gICAgICogeyBsZWZ0am9pbjogWyB7IGRhb05hbWUyOiBpZHggfSBdIH1cbiAgICAgKiBAcGFyYW0ge0lKb2luc1tdfSBqb2lucyDlsLHnrpflj6rmnInkuIDlgIvkuZ/opoHnlKjpmaPliJfljIXotbfkvobkuJ/pgLLkvoZcbiAgICAgKiBAcmV0dXJucyB7SUZpZWxkc30g5Zue5YKz5bmr5L2g6KO95L2c5aW955qERmllbGRzXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTGVmdEpvaW5zKGpvaW5zOiBJSm9pbnNbXSk6IElBSm9pbnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdGpvaW46IGpvaW5zXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nElubmVyam9pblxuICAgICAqIHsgaW5uZXJqb2luOiBbIHsgZGFvTmFtZTI6IGlkeCB9IF0gfVxuICAgICAqIEBwYXJhbSB7SUpvaW5zW119IGpvaW5zIOWwseeul+WPquacieS4gOWAi+S5n+imgeeUqOmZo+WIl+WMhei1t+S+huS4n+mAsuS+hlxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBJbm5lcmpvaW4oam9pbnM6IElKb2luc1tdKTogSUFKb2lucyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbm5lcmpvaW46IGpvaW5zXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nFJpZ2h0am9pblxuICAgICAqIHsgcmlnaHRqb2luOiBbIHsgZGFvTmFtZTI6IGlkeCB9IF0gfVxuICAgICAqIEBwYXJhbSB7SUpvaW5zW119IGpvaW5zIOWwseeul+WPquacieS4gOWAi+S5n+imgeeUqOmZo+WIl+WMhei1t+S+huS4n+mAsuS+hlxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBSaWdodGpvaW4oam9pbnM6IElKb2luc1tdKTogSUFKb2lucyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByaWdodGpvaW46IGpvaW5zXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nG91dGVyam9pblxuICAgICAqIHsgb3V0ZXJqb2luOiBbIHsgZGFvTmFtZTI6IGlkeCB9IF0gfVxuICAgICAqIEBwYXJhbSB7SUpvaW5zW119IGpvaW5zIOWwseeul+WPquacieS4gOWAi+S5n+imgeeUqOmZo+WIl+WMhei1t+S+huS4n+mAsuS+hlxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBPdXRlcmpvaW4oam9pbnM6IElKb2luc1tdKTogSUFKb2lucyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvdXRlcmpvaW46IGpvaW5zXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nE1lcmdlSm9pbnNcbiAgICAgKiBAcGFyYW0ge0lKb2luc1tdfSBqb2lucyDlsLHnrpflj6rmnInkuIDlgIvkuZ/opoHnlKjpmaPliJfljIXotbfkvobkuJ/pgLLkvoZcbiAgICAgKiBAcmV0dXJucyB7SUZpZWxkc30g5Zue5YKz5bmr5L2g6KO95L2c5aW955qERmllbGRzXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgTWVyZ2Vqb2lucyhqb2luczogSUFKb2luc1tdKTogSUFKb2lucyB7XG4gICAgICAgIGxldCBmaW5hbEpvaW5zID0ge30gYXMgSUFKb2lucztcbiAgICAgICAgXy5mb3JFYWNoKGpvaW5zLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgZmluYWxKb2lucyA9IF8uYXNzaWduKHt9LCBmaW5hbEpvaW5zLCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaW5hbEpvaW5zIGFzIElBSm9pbnM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nEpvaW5zLOWFtuWvpumAmeWAi+S5n+WPr+S7peWklumdouiHquW3seeJqeS7tuS+huijveS9nCzlj6ropoHnrKblkIjmoLzlvI9cbiAgICAgKiB7IGRhb05hbWUyOiBpZHggfVxuICAgICAqIEBwYXJhbSB7RGFvRW51bX0gdGFibGVzTmFtZSB0YWJsZU5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGQg5qyE5L2NXG4gICAgICogQHJldHVybnMge0lKb2luc30g6KaB5bCN5oeJ55qESUpvaW5zXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgSm9pbkVudGl0eTxUPih0YWJsZXNOYW1lOiBULCAuLi5maWVsZDogc3RyaW5nW10pOiBJSm9pbnMge1xuICAgICAgICBpZiAoXy5pc1VuZGVmaW5lZChmaWVsZCkgfHwgXy5zaXplKGZpZWxkKSA+IDIgfHwgXy5zaXplKGZpZWxkKSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhHYW1hSHR0cFN0YXR1c0NvZGUuU1RBVFVTX0ZBSUwsICdqb2luLWZpZWxkIG11c3Qgb25lIG9yIHR3byBwYXJhbXMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQW55RW50aXR5KCkudG9PYmoodGFibGVzTmFtZSBhcyBhbnksIGZpZWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDluavkvaDoo73kvZxPcmRlckJ5LOWFtuWvpumAmeWAi+S5n+WPr+S7peWklumdouiHquW3seeJqeS7tuS+huijveS9nCzlj6ropoHnrKblkIjmoLzlvI9cbiAgICAgKiB7IGRhb05hbWUyOiBib29sZWFuIH1cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgZmllbGTmrITkvY3lkI3nqLFcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59ICBzb3J0IHRydWXmmK/mraPluo8sZmFsc+aYr+WPjeW6j1xuICAgICAqIEByZXR1cm5zIHtJSm9pbnN9IOimgeWwjeaHieeahElKb2luc1xuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE9yZGVyQnlFbnRpdHkoZmllbGQ6IHN0cmluZywgc29ydDogYm9vbGVhbik6IElPcmRlckJ5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbnlFbnRpdHkoKS50b09iaihmaWVsZCwgc29ydCkgYXMgSU9yZGVyQnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW5q+S9oOijveS9nOWFqOmDqGZpZWxk6YO96KaB5p+l6Kmi6Lef6KaB5LiN6KaBTm9Mb2NrLOmgkOioreaYr3RydWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW4gfCB1bmRlZmluZWR9IFtub0xvY2s9dHJ1ZV0g6aCQ6Kit5pivdHJ1ZSzkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge0lPcmRlckJ5W10gfCB1bmRlZmluZWR9IG9yZGVyYnkg5L2g6KaB55qE5qyE5L2NLOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBsaW1pdENvdW50IFRvcCDkvaDmnIDlpJropoHnmoTnrYbmlbgs5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHJldHVybnMge0lGaWVsZHN9IOWbnuWCs+W5q+S9oOijveS9nOWlveeahEZpZWxkc1xuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEFMTEZpZWxkcyhcbiAgICAgICAgbm9Mb2NrOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdHJ1ZSxcbiAgICAgICAgb3JkZXJieT86IElPcmRlckJ5W10sXG4gICAgICAgIGxpbWl0Q291bnQ/OiBudW1iZXIpOiBJUXVlcnlPcHRpb25zIHtcbiAgICAgICAgcmV0dXJuIF8ub21pdEJ5KHtcbiAgICAgICAgICAgIGZpZWxkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBub2xvY2s6IG5vTG9jayxcbiAgICAgICAgICAgIHNvcnQ6IG9yZGVyYnksXG4gICAgICAgICAgICBsaW1pdDogbGltaXRDb3VudFxuICAgICAgICB9LCBfLmlzVW5kZWZpbmVkKSBhcyBJUXVlcnlPcHRpb25zO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlj6rmnIlNYXjot59NaW7mnIPnlKjliLDnmoTnibnmropGaWVsZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhZmllbGQg5b+F5aGr5L2g6KaB55qE5qyE5L2NXG4gICAgICogQHBhcmFtIHtib29sZWFuIHwgdW5kZWZpbmVkfSBbbm9Mb2NrPXRydWVdIOmgkOioreaYr3RydWUs5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHBhcmFtIHtJT3JkZXJCeVtdIHwgdW5kZWZpbmVkfSBvcmRlcmJ5IOS9oOimgeeahOashOS9jSzkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gbGltaXRDb3VudCBUb3Ag5L2g5pyA5aSa6KaB55qE562G5pW4LOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEByZXR1cm5zIHtJRmllbGRzfSDlm57lgrPluavkvaDoo73kvZzlpb3nmoRGaWVsZHNcbiAgICAgKiBAbWVtYmVyb2YgU1FMSGVscGVyXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBVbmlxdWVGaWVsZChcbiAgICAgICAgYWZpZWxkOiBzdHJpbmdbXSxcbiAgICAgICAgbm9Mb2NrOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdHJ1ZSxcbiAgICAgICAgb3JkZXJieT86IElPcmRlckJ5W10gfCB1bmRlZmluZWQsXG4gICAgICAgIGxpbWl0Q291bnQ/OiBudW1iZXIgfCB1bmRlZmluZWQpOiBJVW5pcXVlRmllbGQge1xuICAgICAgICByZXR1cm4gXy5vbWl0Qnkoe1xuICAgICAgICAgICAgZmllbGQ6IGFmaWVsZCxcbiAgICAgICAgICAgIG5vbG9jazogbm9Mb2NrLFxuICAgICAgICAgICAgc29ydDogb3JkZXJieSxcbiAgICAgICAgICAgIGxpbWl0OiBsaW1pdENvdW50XG4gICAgICAgIH0sIF8uaXNVbmRlZmluZWQpIGFzIElVbmlxdWVGaWVsZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5bmr5L2g6KO95L2c5YWo6YOoZmllbGTpmaTkuobkvaDkuI3opoHnmoRmaWVsZCxOb0xvY2vpoJDoqK3mmK90cnVlXG4gICAgICogQHBhcmFtIHtCYXNlRW50aXR5fSBlbnRpdHkg5L2g6KaB6Ly45Ye655qERW50aXR5XG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmllbGRzV2l0aG91dCDkvaDopoHkuI3pnIDopoHnmoTmrITkvY3lkI3nqLHpmaPliJdcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW4gfCB1bmRlZmluZWR9IFtub0xvY2s9dHJ1ZV0g6aCQ6Kit5pivdHJ1ZSzkuI3pnIDopoHlsLHovLjlhaV1bmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge0lPcmRlckJ5W10gfCB1bmRlZmluZWR9IG9yZGVyYnkg5L2g6KaB55qE5qyE5L2NLOS4jemcgOimgeWwsei8uOWFpXVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyIHwgdW5kZWZpbmVkfSBsaW1pdENvdW50IFRvcCDkvaDmnIDlpJropoHnmoTnrYbmlbgs5LiN6ZyA6KaB5bCx6Ly45YWldW5kZWZpbmVkXG4gICAgICogQHJldHVybnMge0lGaWVsZHN9IOWbnuWCs+W5q+S9oOijveS9nOWlveeahEZpZWxkc1xuICAgICAqIEBtZW1iZXJvZiBTUUxIZWxwZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEZpZWxkc1dpdGhvdXQoXG4gICAgICAgIGVudGl0eTogR2FtYUVudGl0eSxcbiAgICAgICAgZmllbGRzV2l0aG91dDogc3RyaW5nW10sXG4gICAgICAgIG5vTG9jazogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHRydWUsXG4gICAgICAgIG9yZGVyYnk/OiBJT3JkZXJCeVtdIHwgdW5kZWZpbmVkLFxuICAgICAgICBsaW1pdENvdW50PzogbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgKTogSVF1ZXJ5T3B0aW9ucyB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IGVudGl0eS5maWVsZHMoKTtcbiAgICAgICAgXy5wdWxsQWxsKGZpZWxkcywgZmllbGRzV2l0aG91dCk7XG4gICAgICAgIHJldHVybiBfLm9taXRCeSh7XG4gICAgICAgICAgICBmaWVsZDogZmllbGRzLFxuICAgICAgICAgICAgbm9sb2NrOiBub0xvY2ssXG4gICAgICAgICAgICBzb3J0OiBvcmRlcmJ5LFxuICAgICAgICAgICAgbGltaXQ6IGxpbWl0Q291bnRcbiAgICAgICAgfSwgXy5pc1VuZGVmaW5lZCkgYXMgSVF1ZXJ5T3B0aW9ucztcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YCZ5Y+q5piv5pqr5pmC55qEXG4gICAgICog55uu5YmN5bqV5bGkT1JN6YGH5Yiw55qEQlVH6JmV55CG5pa55rOVXG4gICAgICogQG1lbWJlcm9mIFNRTEhlbHBlclxuICAgICAqL1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgcHVibGljIHN0YXRpYyBCdWdGaXhVcGRhdGVTcWxSZXBlYXRWYWx1ZShvYmo6IGFueSkge1xuICAgICAgICByZXR1cm4gXy5tYXAob2JqLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIHJldHVybiBfLm1hcFZhbHVlcyhkYXRhLCAodikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmlzQXJyYXlMaWtlT2JqZWN0KHYpID8gXy5oZWFkKHYpIDogdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=