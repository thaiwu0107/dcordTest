"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
const moment = require("moment");
require("reflect-metadata");
const GamaConstant_1 = require("../config/GamaConstant");
const models_1 = require("../models");
const GamaEntity_1 = require("../models/GamaEntity");
const LibsExceptions_1 = require("../models/LibsExceptions");
const GamaUtils_1 = require("../utils/GamaUtils");
const enum_SQLServerType_1 = require("./../config/enum.SQLServerType");
const GamaHttpStatusCode_1 = require("./../config/GamaHttpStatusCode");
const _log = log4js.getLogger('SQLManager');
class SQLManager {
    constructor() {
        this._context = models_1.GamaContext.getContext();
    }
    set sqlType(sqlType) {
        this._SQLType = sqlType;
    }
    set rootPath(rootPath) {
        this._rootPath = rootPath;
    }
    /**
     * 取得目前DB的時間
     * @returns {Promise<any>} 就是目前DB的時間
     * @memberof SQLManager
     */
    async getDBCurrentTime() {
        if (this._SQLType === enum_SQLServerType_1.SQLServerType.USE_2005) {
            return moment(new Date()).toDate();
        }
        else {
            const daoName = models_1.GamaContext.getConnectionNames()[0];
            const dbtime = await this.sysExecTemplate(daoName + '.sqlexec', 'QueryDBCurrentTime.sql', {});
            return moment(dbtime[0].TS).toDate();
        }
    }
    /**
     * 執行sql query文件
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    async execTemplate(daoName, templatePath, data, trans) {
        const path = await GamaUtils_1.default.getPath(templatePath, undefined, this._rootPath);
        return this.getDao(daoName, trans).execTemplate(undefined, data, undefined, false, path);
    }
    /**
     * 執行sysSql query文件
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    async sysExecTemplate(daoName, templatePath, data, trans) {
        return this.getDao(daoName, trans).execTemplate(templatePath, data, undefined, false);
    }
    /**
     * 執行sql batch文件, 參數皆為nvarchar(MAXX)
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    async execBatch(daoName, templatePath, data, trans) {
        const path = await GamaUtils_1.default.getPath(templatePath, undefined, this._rootPath);
        return this.getDao(daoName, trans).execTemplate(undefined, data, undefined, true, path);
    }
    /**
     * 取得Dao物件
     * @param daoName
     * @param trans
     */
    getDao(daoName, trans) {
        if (_.isUndefined(trans)) {
            return models_1.GamaContext.getBean(daoName);
        }
        else {
            return trans.getDao(daoName);
        }
    }
    /**
     * 尋找指定DB的Table造你要的條件
     * 要先自己組合想要搜尋的條件
     * 如果要JOIN的動作,可以參考SQLHelper,資料出來之後再做
     * @param {T} daoName 指定DB的TableName
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields] 如果你知道你想要的欄位可以,直接指定,如果只有一個請放入陣列['xxx']
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async query(daoName, condition, options, ...iAJoins) {
        const o = options;
        let execOption = {};
        if (!_.isUndefined(o)) {
            execOption = _.omitBy(o, _.isUndefined);
        }
        if (!_.isUndefined(iAJoins)) {
            _.forEach(iAJoins, (data) => {
                execOption = _.assign({}, execOption, data);
            });
        }
        const result = await this.getDao(daoName).query(condition, execOption);
        return result;
    }
    /**
     * 尋找指定DB的Table全部資料
     * 還可以指定需要的欄位,
     * @param {T} daoName 指定DB的TableName
     * @param {IQueryOptions} options? 指定DB的要秀出來的欄位
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async queryAll(daoName, options, iAJoins) {
        return this.query(daoName, {}, options, iAJoins);
    }
    /**
     * 注意!!!如果資料存在變成Update會把changObj裡面有值的欄位都一起被Update
     * @param {T} daoName 指定DB的TableName
     * @param {(IO | IAnd | IOr)} condition 指定的條件
     * @param {BaseEntity} changObj 你想要變更的物件條件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async insertOrUpdate(daoName, condition, changObj, trans) {
        const exist = await this.count(daoName, condition);
        return _.toNumber(exist) === 0 ?
            this.insert(daoName, changObj, trans) :
            this.update(daoName, condition, changObj, trans);
    }
    /**
     * 如果要JOIN的動作,可以參考SQLHelper,資料出來之後再做
     * @param {T} daoName 指定DB的TableName
     * @param {(IO | IAnd | IOr)} condition 指定的條件
     * @param {BaseEntity} changObj 你想要變更的物件條件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async update(daoName, condition, changObj, trans) {
        return this.getDao(daoName, trans).update(changObj.toJSON(), condition);
    }
    /**
     * 如果要JOIN的動作,可以參考SQLHelper,資料出來之後再做
     * @param {T} daoName 指定DB的TableName
     * @param {any} obj 你想要新增的物件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    async insert(daoName, obj, trans) {
        if (!Array.isArray(obj)) {
            const addData = (obj instanceof GamaEntity_1.default) ? obj.toJSON() : obj;
            return this.getDao(daoName, trans).insert(addData);
        }
        else {
            const dataObj = [];
            if (this._SQLType === enum_SQLServerType_1.SQLServerType.USE_2005) {
                _.each(obj, (elm, index) => {
                    dataObj.push((elm instanceof GamaEntity_1.default) ? elm.toJSON() : elm);
                });
                const sPromises = [];
                for (let index = 0; index < _.size(dataObj); index++) {
                    sPromises.push(await this.getDao(daoName, trans).insert(dataObj[index]));
                }
                const objarray = [];
                _.forEach(sPromises, (data) => {
                    objarray.push(data[0]);
                });
                return objarray;
            }
            else {
                _.each(obj, (elm, index) => {
                    dataObj.push((elm instanceof GamaEntity_1.default) ? elm.toJSON() : elm);
                });
                return this.getDao(daoName, trans).insert(dataObj);
            }
        }
    }
    /**
     * 刪除DB依造你輸入的條件
     * @param {T} daoName DB跟Table名字
     * @param {(IO | IAnd | IOr)} condition 條件
     * @param {ITransaction} [trans] 交易事務
     * @returns {Promise<any[]>} 你刪除的資料
     * @memberof SqlManager
     */
    async remove(daoName, condition, trans) {
        return this.getDao(daoName, trans).remove(condition);
    }
    /**
     * 幫你計算這個DB的這個Table有多少資料用的
     * @param {T} daoName 指定DBTable
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    async count(daoName, condition) {
        return this.getDao(daoName).count(condition);
    }
    /**
     * 幫你Sum這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    async sum(daoName, condition, uniquefield) {
        return this.getDao(daoName).sum(condition, uniquefield);
    }
    /**
     * 幫你Max這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    async max(daoName, condition, uniquefield) {
        return this.getDao(daoName).max(condition, uniquefield);
    }
    /**
     * 幫你Min這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    async min(daoName, condition, uniquefield) {
        return this.getDao(daoName).min(condition, uniquefield);
    }
    /**
     * 執行procedure
     * @param daoProdName
     * @param args 多參數
     * @returns {Promise<{recordset, returnValue, parameters}>}
     * @memberof SqlManager
     */
    async runProcedure(daoProdName, ...args) {
        try {
            const rep = await this.getDao(daoProdName).run(...args, {});
            return rep;
        }
        catch (error) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.PROCEDURE_WARN, error.message);
        }
    }
    /**
     * 此方法在gama-orm V3版之後不支援Transaction
     * 執行procedure with Transaction
     * @param daoProdName
     * @param {ITransaction} [trans] 交易事務
     * @param args 多參數
     * @returns {Promise<{recordset, returnValue, parameters}>}
     * @memberof SqlManager
     */
    async runProcedureTrans(daoProdName, trans, ...args) {
        try {
            const rep = await this.getDao(daoProdName, trans).run(...args, {});
            return rep;
        }
        catch (error) {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.PROCEDURE_WARN, error.message);
        }
    }
    /**
     * 取得SQL加密
     * @param password 多參數
     * @param {string} sqlKey 密碼可選參數
     * @returns {Promise<{password}>}
     * @memberof SqlManager
     */
    async deCode(password, sqlKey = GamaConstant_1.GamaConstant.DB_PASSWORD_KEY) {
        const daoName = models_1.GamaContext.getConnectionNames()[0];
        console.log('thho', daoName);
        const rep = await this.sysExecTemplate(daoName + '.sqlexec', 'DecryptbypassphrasePassword.sql', {
            SQLKey: sqlKey,
            passwords: password
        });
        console.log('thho', rep);
        return rep[0].password;
    }
    /**
     * 取得SQL解密
     * @param {string} password 多參數
     * @param {string} sqlKey 密碼可選參數
     * @returns {Promise<{password}>}
     * @memberof SqlManager
     */
    async enCode(password, sqlKey = GamaConstant_1.GamaConstant.DB_PASSWORD_KEY) {
        const daoName = models_1.GamaContext.getConnectionNames()[0];
        const rep = await this.sysExecTemplate(daoName + '.sqlexec', 'EncryptbypassphrasePassword.sql', {
            SQLKey: sqlKey,
            passwords: password
        });
        return rep[0].password;
    }
}
exports.default = SQLManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1FMTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2d0dG9vNDQvRGVza3RvcC9iYXNlQVBJL3NyYy8iLCJzb3VyY2VzIjpbIm1pY3JvU2VydmljZXMvU1FMTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsaUNBQWlDO0FBQ2pDLDRCQUEwQjtBQUMxQix5REFBc0Q7QUFDdEQsc0NBQXNEO0FBQ3RELHFEQUE4QztBQUU5Qyw2REFBMEQ7QUFFMUQsa0RBQTJDO0FBQzNDLHVFQUErRDtBQUMvRCx1RUFBb0U7QUFFcEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM1QztJQUtJO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxvQkFBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFDRCxJQUFXLE9BQU8sQ0FBQyxPQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFXLFFBQVEsQ0FBQyxRQUFRO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzlCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLGdCQUFnQjtRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssa0NBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsT0FBTyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3RDO2FBQU07WUFDSCxNQUFNLE9BQU8sR0FBRyxvQkFBVyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxVQUFpQixFQUFFLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JHLE9BQU8sTUFB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QztRQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQ2xDLE9BQU8sR0FBRyxVQUFpQixFQUMzQixpQ0FBaUMsRUFBRTtZQUMvQixNQUFNLEVBQUUsTUFBTTtZQUNkLFNBQVMsRUFBRSxRQUFRO1NBQ3RCLENBQ0osQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFnQixFQUFFLE1BQU0sR0FBRywyQkFBWSxDQUFDLGVBQWU7UUFDdkUsTUFBTSxPQUFPLEdBQUcsb0JBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FDbEMsT0FBTyxHQUFHLFVBQWlCLEVBQzNCLGlDQUFpQyxFQUFFO1lBQy9CLE1BQU0sRUFBRSxNQUFNO1lBQ2QsU0FBUyxFQUFFLFFBQVE7U0FDdEIsQ0FDSixDQUFDO1FBQ0YsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzNCLENBQUM7Q0FDSjtBQXhWRCw2QkF3VkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsb2c0anMgZnJvbSAna29hLWxvZzQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgR2FtYUNvbnN0YW50IH0gZnJvbSAnLi4vY29uZmlnL0dhbWFDb25zdGFudCc7XG5pbXBvcnQgeyBHYW1hQ29udGV4dCwgSVRyYW5zYWN0aW9uIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCBHYW1hRW50aXR5IGZyb20gJy4uL21vZGVscy9HYW1hRW50aXR5JztcbmltcG9ydCBHYW1hRXhjZXB0aW9ucyBmcm9tICcuLi9tb2RlbHMvR2FtYUV4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgTGlic0V4Y2VwdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvTGlic0V4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgSUFKb2lucywgSUFuZCwgSUNvbmRpdGlvbiwgSU9yLCBJUXVlcnlPcHRpb25zLCBJVW5pcXVlRmllbGQsIFNRTEpvaW5zIH0gZnJvbSAnLi4vdXRpbHMvRGFvT3BlcmF0b3InO1xuaW1wb3J0IEdhbWFVdGlscyBmcm9tICcuLi91dGlscy9HYW1hVXRpbHMnO1xuaW1wb3J0IHsgU1FMU2VydmVyVHlwZSB9IGZyb20gJy4vLi4vY29uZmlnL2VudW0uU1FMU2VydmVyVHlwZSc7XG5pbXBvcnQgeyBHYW1hSHR0cFN0YXR1c0NvZGUgfSBmcm9tICcuLy4uL2NvbmZpZy9HYW1hSHR0cFN0YXR1c0NvZGUnO1xuXG5jb25zdCBfbG9nID0gbG9nNGpzLmdldExvZ2dlcignU1FMTWFuYWdlcicpO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1FMTWFuYWdlcjxUPiB7XG4gICAgcHJpdmF0ZSBfcm9vdFBhdGg6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgX2NvbnRleHQ6IEdhbWFDb250ZXh0O1xuICAgIHByaXZhdGUgX1NRTFR5cGU6IFNRTFNlcnZlclR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IEdhbWFDb250ZXh0LmdldENvbnRleHQoKTtcbiAgICB9XG4gICAgcHVibGljIHNldCBzcWxUeXBlKHNxbFR5cGUpIHtcbiAgICAgICAgdGhpcy5fU1FMVHlwZSA9IHNxbFR5cGU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgcm9vdFBhdGgocm9vdFBhdGgpIHtcbiAgICAgICAgdGhpcy5fcm9vdFBhdGggPSByb290UGF0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X55uu5YmNRELnmoTmmYLplpNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSDlsLHmmK/nm67liY1EQueahOaZgumWk1xuICAgICAqIEBtZW1iZXJvZiBTUUxNYW5hZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldERCQ3VycmVudFRpbWUoKTogUHJvbWlzZTxEYXRlPiB7XG4gICAgICAgIGlmICh0aGlzLl9TUUxUeXBlID09PSBTUUxTZXJ2ZXJUeXBlLlVTRV8yMDA1KSB7XG4gICAgICAgICAgICByZXR1cm4gbW9tZW50KG5ldyBEYXRlKCkpLnRvRGF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZGFvTmFtZSA9IEdhbWFDb250ZXh0LmdldENvbm5lY3Rpb25OYW1lcygpWzBdO1xuICAgICAgICAgICAgY29uc3QgZGJ0aW1lID0gYXdhaXQgdGhpcy5zeXNFeGVjVGVtcGxhdGUoZGFvTmFtZSArICcuc3FsZXhlYycgYXMgYW55LCAnUXVlcnlEQkN1cnJlbnRUaW1lLnNxbCcsIHt9KTtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQoZGJ0aW1lWzBdLlRTKS50b0RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWft+ihjHNxbCBxdWVyeeaWh+S7tlxuICAgICAqIEBwYXJhbSBkYW9OYW1lXG4gICAgICogQHBhcmFtIHRlbXBsYXRlUGF0aFxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHBhcmFtIHRyYW5zXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4ZWNUZW1wbGF0ZShkYW9OYW1lOiBULCB0ZW1wbGF0ZVBhdGg6IHN0cmluZywgZGF0YTogYW55LCB0cmFucz8pOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBwYXRoID0gYXdhaXQgR2FtYVV0aWxzLmdldFBhdGgodGVtcGxhdGVQYXRoLCB1bmRlZmluZWQsIHRoaXMuX3Jvb3RQYXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGFvKGRhb05hbWUsIHRyYW5zKS5leGVjVGVtcGxhdGUodW5kZWZpbmVkLCBkYXRhLCB1bmRlZmluZWQsIGZhbHNlLCBwYXRoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDln7fooYxzeXNTcWwgcXVlcnnmlofku7ZcbiAgICAgKiBAcGFyYW0gZGFvTmFtZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZVBhdGhcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwYXJhbSB0cmFuc1xuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzeXNFeGVjVGVtcGxhdGUoZGFvTmFtZTogVCwgdGVtcGxhdGVQYXRoOiBzdHJpbmcsIGRhdGE6IGFueSwgdHJhbnM/KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGFvKGRhb05hbWUsIHRyYW5zKS5leGVjVGVtcGxhdGUodGVtcGxhdGVQYXRoLCBkYXRhLCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDln7fooYxzcWwgYmF0Y2jmlofku7YsIOWPg+aVuOeahueCum52YXJjaGFyKE1BWFgpXG4gICAgICogQHBhcmFtIGRhb05hbWVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGVQYXRoXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gdHJhbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZXhlY0JhdGNoKGRhb05hbWU6IFQsIHRlbXBsYXRlUGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIHRyYW5zPyk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHBhdGggPSBhd2FpdCBHYW1hVXRpbHMuZ2V0UGF0aCh0ZW1wbGF0ZVBhdGgsIHVuZGVmaW5lZCwgdGhpcy5fcm9vdFBhdGgpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSwgdHJhbnMpLmV4ZWNUZW1wbGF0ZSh1bmRlZmluZWQsIGRhdGEsIHVuZGVmaW5lZCwgdHJ1ZSwgcGF0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+W5b6XRGFv54mp5Lu2XG4gICAgICogQHBhcmFtIGRhb05hbWVcbiAgICAgKiBAcGFyYW0gdHJhbnNcbiAgICAgKi9cbiAgICBwcml2YXRlIGdldERhbyhkYW9OYW1lOiBULCB0cmFucz8pIHtcbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQodHJhbnMpKSB7XG4gICAgICAgICAgICByZXR1cm4gR2FtYUNvbnRleHQuZ2V0QmVhbihkYW9OYW1lIGFzIGFueSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJhbnMhLmdldERhbyhkYW9OYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwi+aJvuaMh+WumkRC55qEVGFibGXpgKDkvaDopoHnmoTmop3ku7ZcbiAgICAgKiDopoHlhYjoh6rlt7HntYTlkIjmg7PopoHmkJzlsIvnmoTmop3ku7ZcbiAgICAgKiDlpoLmnpzopoFKT0lO55qE5YuV5L2cLOWPr+S7peWPg+iAg1NRTEhlbHBlcizos4fmlpnlh7rkvobkuYvlvozlho3lgZpcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aRELnmoRUYWJsZU5hbWVcbiAgICAgKiBAcGFyYW0geyhJTyB8IElBbmQgfCBJT3IpfSBjb25kaXRpb24g5pCc5bCL55qE5qKd5Lu2XG4gICAgICogQHBhcmFtIHtJUXVlcnlPcHRpb25zfSBbZmllbGRzXSDlpoLmnpzkvaDnn6XpgZPkvaDmg7PopoHnmoTmrITkvY3lj6/ku6Us55u05o6l5oyH5a6aLOWmguaenOWPquacieS4gOWAi+iri+aUvuWFpemZo+WIl1sneHh4J11cbiAgICAgKiBAcGFyYW0ge0lUcmFuc2FjdGlvbn0gW3RyYW5zXSDkuovli5nkuqTmmJNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnlbXT59IFByb21pc2XnmoTos4fmlplcbiAgICAgKiBAbWVtYmVyb2YgU1FMXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHF1ZXJ5KFxuICAgICAgICBkYW9OYW1lOiBULFxuICAgICAgICBjb25kaXRpb246IElDb25kaXRpb24gfCBJQW5kIHwgSU9yLFxuICAgICAgICBvcHRpb25zPzogSVF1ZXJ5T3B0aW9ucyB8IHVuZGVmaW5lZCxcbiAgICAgICAgLi4uaUFKb2luczogU1FMSm9pbnNbXSk6IFByb21pc2U8YW55W10+IHtcblxuICAgICAgICBjb25zdCBvID0gb3B0aW9ucyBhcyBJUXVlcnlPcHRpb25zO1xuICAgICAgICBsZXQgZXhlY09wdGlvbiA9IHt9IGFzIElRdWVyeU9wdGlvbnM7XG4gICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChvKSkge1xuICAgICAgICAgICAgZXhlY09wdGlvbiA9IF8ub21pdEJ5KG8sIF8uaXNVbmRlZmluZWQpIGFzIElRdWVyeU9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGlBSm9pbnMpKSB7XG4gICAgICAgICAgICBfLmZvckVhY2goaUFKb2lucywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBleGVjT3B0aW9uID0gXy5hc3NpZ24oe30sIGV4ZWNPcHRpb24sIGRhdGEpIGFzIElRdWVyeU9wdGlvbnM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmdldERhbyhkYW9OYW1lKS5xdWVyeShcbiAgICAgICAgICAgIGNvbmRpdGlvbiwgZXhlY09wdGlvblxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwi+aJvuaMh+WumkRC55qEVGFibGXlhajpg6jos4fmlplcbiAgICAgKiDpgoTlj6/ku6XmjIflrprpnIDopoHnmoTmrITkvY0sXG4gICAgICogQHBhcmFtIHtUfSBkYW9OYW1lIOaMh+WumkRC55qEVGFibGVOYW1lXG4gICAgICogQHBhcmFtIHtJUXVlcnlPcHRpb25zfSBvcHRpb25zPyDmjIflrppEQueahOimgeengOWHuuS+hueahOashOS9jVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdPn0gUHJvbWlzZeeahOizh+aWmVxuICAgICAqIEBtZW1iZXJvZiBTUUxcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcXVlcnlBbGwoXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIG9wdGlvbnM/OiBJUXVlcnlPcHRpb25zIHwgdW5kZWZpbmVkLFxuICAgICAgICBpQUpvaW5zPzogSUFKb2lucyB8IHVuZGVmaW5lZCk6IFByb21pc2U8YW55W10+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeShkYW9OYW1lLCB7fSBhcyBJQ29uZGl0aW9uLCBvcHRpb25zLCBpQUpvaW5zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5rOo5oSPISEh5aaC5p6c6LOH5paZ5a2Y5Zyo6K6K5oiQVXBkYXRl5pyD5oqKY2hhbmdPYmroo6HpnaLmnInlgLznmoTmrITkvY3pg73kuIDotbfooqtVcGRhdGVcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aRELnmoRUYWJsZU5hbWVcbiAgICAgKiBAcGFyYW0geyhJTyB8IElBbmQgfCBJT3IpfSBjb25kaXRpb24g5oyH5a6a55qE5qKd5Lu2XG4gICAgICogQHBhcmFtIHtCYXNlRW50aXR5fSBjaGFuZ09iaiDkvaDmg7PopoHorormm7TnmoTnianku7bmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0lUcmFuc2FjdGlvbn0gW3RyYW5zXSDkuovli5nkuqTmmJNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnlbXT59IFByb21pc2XnmoTos4fmlplcbiAgICAgKiBAbWVtYmVyb2YgU1FMXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGluc2VydE9yVXBkYXRlKFxuICAgICAgICBkYW9OYW1lOiBULFxuICAgICAgICBjb25kaXRpb246IElDb25kaXRpb24gfCBJQW5kIHwgSU9yLFxuICAgICAgICBjaGFuZ09iajogR2FtYUVudGl0eSxcbiAgICAgICAgdHJhbnM/OiBJVHJhbnNhY3Rpb24pOiBQcm9taXNlPGFueVtdPiB7XG4gICAgICAgIGNvbnN0IGV4aXN0ID0gYXdhaXQgdGhpcy5jb3VudChkYW9OYW1lLCBjb25kaXRpb24pO1xuICAgICAgICByZXR1cm4gXy50b051bWJlcihleGlzdCkgPT09IDAgP1xuICAgICAgICAgICAgdGhpcy5pbnNlcnQoZGFvTmFtZSwgY2hhbmdPYmosIHRyYW5zKSA6XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShkYW9OYW1lLCBjb25kaXRpb24sIGNoYW5nT2JqLCB0cmFucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWmguaenOimgUpPSU7nmoTli5XkvZws5Y+v5Lul5Y+D6ICDU1FMSGVscGVyLOizh+aWmeWHuuS+huS5i+W+jOWGjeWBmlxuICAgICAqIEBwYXJhbSB7VH0gZGFvTmFtZSDmjIflrppEQueahFRhYmxlTmFtZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmjIflrprnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGNoYW5nT2JqIOS9oOaDs+imgeiuiuabtOeahOeJqeS7tuaineS7tlxuICAgICAqIEBwYXJhbSB7SVRyYW5zYWN0aW9ufSBbdHJhbnNdIOS6i+WLmeS6pOaYk1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueVtdPn0gUHJvbWlzZeeahOizh+aWmVxuICAgICAqIEBtZW1iZXJvZiBTUUxcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlKFxuICAgICAgICBkYW9OYW1lOiBULFxuICAgICAgICBjb25kaXRpb246IElDb25kaXRpb24gfCBJQW5kIHwgSU9yLFxuICAgICAgICBjaGFuZ09iajogR2FtYUVudGl0eSxcbiAgICAgICAgdHJhbnM/OiBJVHJhbnNhY3Rpb24pOiBQcm9taXNlPGFueVtdPiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGFvKGRhb05hbWUsIHRyYW5zKS51cGRhdGUoY2hhbmdPYmoudG9KU09OKCksIGNvbmRpdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWmguaenOimgUpPSU7nmoTli5XkvZws5Y+v5Lul5Y+D6ICDU1FMSGVscGVyLOizh+aWmeWHuuS+huS5i+W+jOWGjeWBmlxuICAgICAqIEBwYXJhbSB7VH0gZGFvTmFtZSDmjIflrppEQueahFRhYmxlTmFtZVxuICAgICAqIEBwYXJhbSB7YW55fSBvYmog5L2g5oOz6KaB5paw5aKe55qE54mp5Lu2XG4gICAgICogQHBhcmFtIHtJVHJhbnNhY3Rpb259IFt0cmFuc10g5LqL5YuZ5Lqk5piTXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSBQcm9taXNl55qE6LOH5paZXG4gICAgICogQG1lbWJlcm9mIFNRTFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBpbnNlcnQoZGFvTmFtZTogVCwgb2JqOiBhbnlbXSB8IGFueSwgdHJhbnM/OiBJVHJhbnNhY3Rpb24pOiBQcm9taXNlPGFueVtdPiB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBjb25zdCBhZGREYXRhID0gKG9iaiBpbnN0YW5jZW9mIEdhbWFFbnRpdHkpID8gb2JqLnRvSlNPTigpIDogb2JqO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGFvKGRhb05hbWUsIHRyYW5zKS5pbnNlcnQoYWRkRGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhT2JqOiBhbnlbXSA9IFtdO1xuICAgICAgICAgICAgaWYgKHRoaXMuX1NRTFR5cGUgPT09IFNRTFNlcnZlclR5cGUuVVNFXzIwMDUpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2gob2JqLCAoZWxtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhT2JqLnB1c2goKGVsbSBpbnN0YW5jZW9mIEdhbWFFbnRpdHkpID8gZWxtLnRvSlNPTigpIDogZWxtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzUHJvbWlzZXM6IGFueVtdID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IF8uc2l6ZShkYXRhT2JqKTsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICBzUHJvbWlzZXMucHVzaChhd2FpdCB0aGlzLmdldERhbyhkYW9OYW1lLCB0cmFucykuaW5zZXJ0KGRhdGFPYmpbaW5kZXhdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG9iamFycmF5OiBhbnlbXSA9IFtdO1xuICAgICAgICAgICAgICAgIF8uZm9yRWFjaChzUHJvbWlzZXMsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG9iamFycmF5LnB1c2goZGF0YVswXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamFycmF5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLmVhY2gob2JqLCAoZWxtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYXRhT2JqLnB1c2goKGVsbSBpbnN0YW5jZW9mIEdhbWFFbnRpdHkpID8gZWxtLnRvSlNPTigpIDogZWxtKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSwgdHJhbnMpLmluc2VydChkYXRhT2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIqumZpERC5L6d6YCg5L2g6Ly45YWl55qE5qKd5Lu2XG4gICAgICogQHBhcmFtIHtUfSBkYW9OYW1lIERC6LefVGFibGXlkI3lrZdcbiAgICAgKiBAcGFyYW0geyhJTyB8IElBbmQgfCBJT3IpfSBjb25kaXRpb24g5qKd5Lu2XG4gICAgICogQHBhcmFtIHtJVHJhbnNhY3Rpb259IFt0cmFuc10g5Lqk5piT5LqL5YuZXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDkvaDliKrpmaTnmoTos4fmlplcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyByZW1vdmUoXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIHRyYW5zPzogSVRyYW5zYWN0aW9uKTogUHJvbWlzZTxhbnlbXT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldERhbyhkYW9OYW1lLCB0cmFucykucmVtb3ZlKGNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5bmr5L2g6KiI566X6YCZ5YCLRELnmoTpgJnlgItUYWJsZeacieWkmuWwkeizh+aWmeeUqOeahFxuICAgICAqIEBwYXJhbSB7VH0gZGFvTmFtZSDmjIflrppEQlRhYmxlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDlm57lgrPmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBjb3VudChcbiAgICAgICAgZGFvTmFtZTogVCxcbiAgICAgICAgY29uZGl0aW9uOiBJQ29uZGl0aW9uIHwgSUFuZCB8IElPcik6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhbyhkYW9OYW1lKS5jb3VudChjb25kaXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW5q+S9oFN1bemAmeWAi0RC55qE6YCZ5YCLVGFibGXos4fmlpnnlKjnmoRcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aREJUYWJsZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmkJzlsIvnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0lRdWVyeU9wdGlvbnN9IFtmaWVsZHNdXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDlm57lgrPmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzdW0oXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIHVuaXF1ZWZpZWxkOiBJVW5pcXVlRmllbGQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSkuc3VtKGNvbmRpdGlvbiwgdW5pcXVlZmllbGQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW5q+S9oE1heOmAmeWAi0RC55qE6YCZ5YCLVGFibGXos4fmlpnnlKjnmoRcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aREJUYWJsZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmkJzlsIvnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0lRdWVyeU9wdGlvbnN9IFtmaWVsZHNdXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDlm57lgrPmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBtYXgoXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIHVuaXF1ZWZpZWxkOiBJVW5pcXVlRmllbGQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSkubWF4KGNvbmRpdGlvbiwgdW5pcXVlZmllbGQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOW5q+S9oE1pbumAmeWAi0RC55qE6YCZ5YCLVGFibGXos4fmlpnnlKjnmoRcbiAgICAgKiBAcGFyYW0ge1R9IGRhb05hbWUg5oyH5a6aREJUYWJsZVxuICAgICAqIEBwYXJhbSB7KElPIHwgSUFuZCB8IElPcil9IGNvbmRpdGlvbiDmkJzlsIvnmoTmop3ku7ZcbiAgICAgKiBAcGFyYW0ge0lRdWVyeU9wdGlvbnN9IFtmaWVsZHNdXG4gICAgICogQHJldHVybnMge1Byb21pc2U8YW55W10+fSDlm57lgrPmlbjlrZdcbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBtaW4oXG4gICAgICAgIGRhb05hbWU6IFQsXG4gICAgICAgIGNvbmRpdGlvbjogSUNvbmRpdGlvbiB8IElBbmQgfCBJT3IsXG4gICAgICAgIHVuaXF1ZWZpZWxkOiBJVW5pcXVlRmllbGQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW8oZGFvTmFtZSkubWluKGNvbmRpdGlvbiwgdW5pcXVlZmllbGQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWft+ihjHByb2NlZHVyZVxuICAgICAqIEBwYXJhbSBkYW9Qcm9kTmFtZVxuICAgICAqIEBwYXJhbSBhcmdzIOWkmuWPg+aVuFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHtyZWNvcmRzZXQsIHJldHVyblZhbHVlLCBwYXJhbWV0ZXJzfT59XG4gICAgICogQG1lbWJlcm9mIFNxbE1hbmFnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcnVuUHJvY2VkdXJlKFxuICAgICAgICBkYW9Qcm9kTmFtZTogVCwgLi4uYXJncyk6IFByb21pc2U8YW55W10+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcCA9IGF3YWl0IHRoaXMuZ2V0RGFvKGRhb1Byb2ROYW1lKS5ydW4oLi4uYXJncywge30pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhHYW1hSHR0cFN0YXR1c0NvZGUuUFJPQ0VEVVJFX1dBUk4sIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5q2k5pa55rOV5ZyoZ2FtYS1vcm0gVjPniYjkuYvlvozkuI3mlK/mj7RUcmFuc2FjdGlvblxuICAgICAqIOWft+ihjHByb2NlZHVyZSB3aXRoIFRyYW5zYWN0aW9uXG4gICAgICogQHBhcmFtIGRhb1Byb2ROYW1lXG4gICAgICogQHBhcmFtIHtJVHJhbnNhY3Rpb259IFt0cmFuc10g5Lqk5piT5LqL5YuZXG4gICAgICogQHBhcmFtIGFyZ3Mg5aSa5Y+D5pW4XG4gICAgICogQHJldHVybnMge1Byb21pc2U8e3JlY29yZHNldCwgcmV0dXJuVmFsdWUsIHBhcmFtZXRlcnN9Pn1cbiAgICAgKiBAbWVtYmVyb2YgU3FsTWFuYWdlclxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBydW5Qcm9jZWR1cmVUcmFucyhcbiAgICAgICAgZGFvUHJvZE5hbWU6IFQsIHRyYW5zLCAuLi5hcmdzKTogUHJvbWlzZTxhbnlbXT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVwID0gYXdhaXQgdGhpcy5nZXREYW8oZGFvUHJvZE5hbWUsIHRyYW5zKS5ydW4oLi4uYXJncywge30pO1xuICAgICAgICAgICAgcmV0dXJuIHJlcDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBMaWJzRXhjZXB0aW9ucyhHYW1hSHR0cFN0YXR1c0NvZGUuUFJPQ0VEVVJFX1dBUk4sIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Y+W5b6XU1FM5Yqg5a+GXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIOWkmuWPg+aVuFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcWxLZXkg5a+G56K85Y+v6YG45Y+D5pW4XG4gICAgICogQHJldHVybnMge1Byb21pc2U8e3Bhc3N3b3JkfT59XG4gICAgICogQG1lbWJlcm9mIFNxbE1hbmFnZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZGVDb2RlKHBhc3N3b3JkOiBCdWZmZXIsIHNxbEtleSA9IEdhbWFDb25zdGFudC5EQl9QQVNTV09SRF9LRVkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zdCBkYW9OYW1lID0gR2FtYUNvbnRleHQuZ2V0Q29ubmVjdGlvbk5hbWVzKClbMF07XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGhvJywgZGFvTmFtZSk7XG4gICAgICAgIGNvbnN0IHJlcCA9IGF3YWl0IHRoaXMuc3lzRXhlY1RlbXBsYXRlKFxuICAgICAgICAgICAgZGFvTmFtZSArICcuc3FsZXhlYycgYXMgYW55LFxuICAgICAgICAgICAgJ0RlY3J5cHRieXBhc3NwaHJhc2VQYXNzd29yZC5zcWwnLCB7XG4gICAgICAgICAgICAgICAgU1FMS2V5OiBzcWxLZXksXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRzOiBwYXNzd29yZFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZygndGhobycsIHJlcCk7XG4gICAgICAgIHJldHVybiByZXBbMF0ucGFzc3dvcmQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWPluW+l1NRTOino+WvhlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCDlpJrlj4PmlbhcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3FsS2V5IOWvhueivOWPr+mBuOWPg+aVuFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHtwYXNzd29yZH0+fVxuICAgICAqIEBtZW1iZXJvZiBTcWxNYW5hZ2VyXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGVuQ29kZShwYXNzd29yZDogc3RyaW5nLCBzcWxLZXkgPSBHYW1hQ29uc3RhbnQuREJfUEFTU1dPUkRfS0VZKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgZGFvTmFtZSA9IEdhbWFDb250ZXh0LmdldENvbm5lY3Rpb25OYW1lcygpWzBdO1xuICAgICAgICBjb25zdCByZXAgPSBhd2FpdCB0aGlzLnN5c0V4ZWNUZW1wbGF0ZShcbiAgICAgICAgICAgIGRhb05hbWUgKyAnLnNxbGV4ZWMnIGFzIGFueSxcbiAgICAgICAgICAgICdFbmNyeXB0YnlwYXNzcGhyYXNlUGFzc3dvcmQuc3FsJywge1xuICAgICAgICAgICAgICAgIFNRTEtleTogc3FsS2V5LFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkczogcGFzc3dvcmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlcFswXS5wYXNzd29yZDtcbiAgICB9XG59XG4iXX0=