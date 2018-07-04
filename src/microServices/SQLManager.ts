import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import * as moment from 'moment';
import 'reflect-metadata';
import { GamaConstant } from '../config/GamaConstant';
import { GamaContext, ITransaction } from '../models';
import GamaEntity from '../models/GamaEntity';
import GamaExceptions from '../models/GamaExceptions';
import { LibsExceptions } from '../models/LibsExceptions';
import { IAJoins, IAnd, ICondition, IOr, IQueryOptions, IUniqueField, SQLJoins } from '../utils/DaoOperator';
import GamaUtils from '../utils/GamaUtils';
import { SQLServerType } from './../config/enum.SQLServerType';
import { GamaHttpStatusCode } from './../config/GamaHttpStatusCode';

const _log = log4js.getLogger('SQLManager');
export default class SQLManager<T> {
    private _rootPath: string;
    protected _context: GamaContext;
    private _SQLType: SQLServerType;

    constructor() {
        this._context = GamaContext.getContext();
    }
    public set sqlType(sqlType) {
        this._SQLType = sqlType;
    }
    public set rootPath(rootPath) {
        this._rootPath = rootPath;
    }
    /**
     * 取得目前DB的時間
     * @returns {Promise<any>} 就是目前DB的時間
     * @memberof SQLManager
     */
    public async getDBCurrentTime(): Promise<Date> {
        if (this._SQLType === SQLServerType.USE_2005) {
            return moment(new Date()).toDate();
        } else {
            const daoName = GamaContext.getConnectionNames()[0];
            const dbtime = await this.sysExecTemplate(daoName + '.sqlexec' as any, 'QueryDBCurrentTime.sql', {});
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
    public async execTemplate(daoName: T, templatePath: string, data: any, trans?): Promise<any> {
        const path = await GamaUtils.getPath(templatePath, undefined, this._rootPath);
        return this.getDao(daoName, trans).execTemplate(undefined, data, undefined, false, path);
    }

    /**
     * 執行sysSql query文件
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    public async sysExecTemplate(daoName: T, templatePath: string, data: any, trans?): Promise<any> {
        return this.getDao(daoName, trans).execTemplate(templatePath, data, undefined, false);
    }

    /**
     * 執行sql batch文件, 參數皆為nvarchar(MAXX)
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    public async execBatch(daoName: T, templatePath: string, data: any, trans?): Promise<any> {
        const path = await GamaUtils.getPath(templatePath, undefined, this._rootPath);
        return this.getDao(daoName, trans).execTemplate(undefined, data, undefined, true, path);
    }

    /**
     * 取得Dao物件
     * @param daoName
     * @param trans
     */
    private getDao(daoName: T, trans?) {
        if (_.isUndefined(trans)) {
            return GamaContext.getBean(daoName as any);
        } else {
            return trans!.getDao(daoName);
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
    public async query(
        daoName: T,
        condition: ICondition | IAnd | IOr,
        options?: IQueryOptions | undefined,
        ...iAJoins: SQLJoins[]): Promise<any[]> {

        const o = options as IQueryOptions;
        let execOption = {} as IQueryOptions;
        if (!_.isUndefined(o)) {
            execOption = _.omitBy(o, _.isUndefined) as IQueryOptions;
        }
        if (!_.isUndefined(iAJoins)) {
            _.forEach(iAJoins, (data) => {
                execOption = _.assign({}, execOption, data) as IQueryOptions;
            });
        }
        const result = await this.getDao(daoName).query(
            condition, execOption
        );
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
    public async queryAll(
        daoName: T,
        options?: IQueryOptions | undefined,
        iAJoins?: IAJoins | undefined): Promise<any[]> {

        return this.query(daoName, {} as ICondition, options, iAJoins);
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
    public async insertOrUpdate(
        daoName: T,
        condition: ICondition | IAnd | IOr,
        changObj: GamaEntity,
        trans?: ITransaction): Promise<any[]> {
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
    public async update(
        daoName: T,
        condition: ICondition | IAnd | IOr,
        changObj: GamaEntity,
        trans?: ITransaction): Promise<any[]> {

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
    public async insert(daoName: T, obj: any[] | any, trans?: ITransaction): Promise<any[]> {
        if (!Array.isArray(obj)) {
            const addData = (obj instanceof GamaEntity) ? obj.toJSON() : obj;
            return this.getDao(daoName, trans).insert(addData);
        } else {
            const dataObj: any[] = [];
            if (this._SQLType === SQLServerType.USE_2005) {
                _.each(obj, (elm, index) => {
                    dataObj.push((elm instanceof GamaEntity) ? elm.toJSON() : elm);
                });
                const sPromises: any[] = [];
                for (let index = 0; index < _.size(dataObj); index++) {
                    sPromises.push(await this.getDao(daoName, trans).insert(dataObj[index]));
                }
                const objarray: any[] = [];
                _.forEach(sPromises, (data) => {
                    objarray.push(data[0]);
                });
                return objarray;
            } else {
                _.each(obj, (elm, index) => {
                    dataObj.push((elm instanceof GamaEntity) ? elm.toJSON() : elm);
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
    public async remove(
        daoName: T,
        condition: ICondition | IAnd | IOr,
        trans?: ITransaction): Promise<any[]> {

        return this.getDao(daoName, trans).remove(condition);
    }

    /**
     * 幫你計算這個DB的這個Table有多少資料用的
     * @param {T} daoName 指定DBTable
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    public async count(
        daoName: T,
        condition: ICondition | IAnd | IOr): Promise<any> {
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
    public async sum(
        daoName: T,
        condition: ICondition | IAnd | IOr,
        uniquefield: IUniqueField): Promise<any> {
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
    public async max(
        daoName: T,
        condition: ICondition | IAnd | IOr,
        uniquefield: IUniqueField): Promise<any> {
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
    public async min(
        daoName: T,
        condition: ICondition | IAnd | IOr,
        uniquefield: IUniqueField): Promise<any> {
        return this.getDao(daoName).min(condition, uniquefield);
    }

    /**
     * 執行procedure
     * @param daoProdName
     * @param args 多參數
     * @returns {Promise<{recordset, returnValue, parameters}>}
     * @memberof SqlManager
     */
    public async runProcedure(
        daoProdName: T, ...args): Promise<any[]> {
        try {
            const rep = await this.getDao(daoProdName).run(...args, {});
            return rep;
        } catch (error) {
            throw new LibsExceptions(GamaHttpStatusCode.PROCEDURE_WARN, error.message);
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
    public async runProcedureTrans(
        daoProdName: T, trans, ...args): Promise<any[]> {
        try {
            const rep = await this.getDao(daoProdName, trans).run(...args, {});
            return rep;
        } catch (error) {
            throw new LibsExceptions(GamaHttpStatusCode.PROCEDURE_WARN, error.message);
        }
    }

    /**
     * 取得SQL加密
     * @param password 多參數
     * @param {string} sqlKey 密碼可選參數
     * @returns {Promise<{password}>}
     * @memberof SqlManager
     */
    public async deCode(password: Buffer, sqlKey = GamaConstant.DB_PASSWORD_KEY): Promise<any> {
        const daoName = GamaContext.getConnectionNames()[0];
        console.log('thho', daoName);
        const rep = await this.sysExecTemplate(
            daoName + '.sqlexec' as any,
            'DecryptbypassphrasePassword.sql', {
                SQLKey: sqlKey,
                passwords: password
            }
        );
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
    public async enCode(password: string, sqlKey = GamaConstant.DB_PASSWORD_KEY): Promise<any> {
        const daoName = GamaContext.getConnectionNames()[0];
        const rep = await this.sysExecTemplate(
            daoName + '.sqlexec' as any,
            'EncryptbypassphrasePassword.sql', {
                SQLKey: sqlKey,
                passwords: password
            }
        );
        return rep[0].password;
    }
}
