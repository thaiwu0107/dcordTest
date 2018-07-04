/// <reference types="node" />
import 'reflect-metadata';
import { GamaConstant } from '../config/GamaConstant';
import { GamaContext, ITransaction } from '../models';
import GamaEntity from '../models/GamaEntity';
import { IAJoins, IAnd, ICondition, IOr, IQueryOptions, IUniqueField, SQLJoins } from '../utils/DaoOperator';
export default class SQLManager<T> {
    private _rootPath;
    protected _context: GamaContext;
    private _SQLType;
    constructor();
    sqlType: any;
    rootPath: any;
    /**
     * 取得目前DB的時間
     * @returns {Promise<any>} 就是目前DB的時間
     * @memberof SQLManager
     */
    getDBCurrentTime(): Promise<Date>;
    /**
     * 執行sql query文件
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    execTemplate(daoName: T, templatePath: string, data: any, trans?: any): Promise<any>;
    /**
     * 執行sysSql query文件
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    sysExecTemplate(daoName: T, templatePath: string, data: any, trans?: any): Promise<any>;
    /**
     * 執行sql batch文件, 參數皆為nvarchar(MAXX)
     * @param daoName
     * @param templatePath
     * @param data
     * @param trans
     */
    execBatch(daoName: T, templatePath: string, data: any, trans?: any): Promise<any>;
    /**
     * 取得Dao物件
     * @param daoName
     * @param trans
     */
    private getDao;
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
    query(daoName: T, condition: ICondition | IAnd | IOr, options?: IQueryOptions | undefined, ...iAJoins: SQLJoins[]): Promise<any[]>;
    /**
     * 尋找指定DB的Table全部資料
     * 還可以指定需要的欄位,
     * @param {T} daoName 指定DB的TableName
     * @param {IQueryOptions} options? 指定DB的要秀出來的欄位
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    queryAll(daoName: T, options?: IQueryOptions | undefined, iAJoins?: IAJoins | undefined): Promise<any[]>;
    /**
     * 注意!!!如果資料存在變成Update會把changObj裡面有值的欄位都一起被Update
     * @param {T} daoName 指定DB的TableName
     * @param {(IO | IAnd | IOr)} condition 指定的條件
     * @param {BaseEntity} changObj 你想要變更的物件條件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    insertOrUpdate(daoName: T, condition: ICondition | IAnd | IOr, changObj: GamaEntity, trans?: ITransaction): Promise<any[]>;
    /**
     * 如果要JOIN的動作,可以參考SQLHelper,資料出來之後再做
     * @param {T} daoName 指定DB的TableName
     * @param {(IO | IAnd | IOr)} condition 指定的條件
     * @param {BaseEntity} changObj 你想要變更的物件條件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    update(daoName: T, condition: ICondition | IAnd | IOr, changObj: GamaEntity, trans?: ITransaction): Promise<any[]>;
    /**
     * 如果要JOIN的動作,可以參考SQLHelper,資料出來之後再做
     * @param {T} daoName 指定DB的TableName
     * @param {any} obj 你想要新增的物件
     * @param {ITransaction} [trans] 事務交易
     * @returns {Promise<any[]>} Promise的資料
     * @memberof SQL
     */
    insert(daoName: T, obj: any[] | any, trans?: ITransaction): Promise<any[]>;
    /**
     * 刪除DB依造你輸入的條件
     * @param {T} daoName DB跟Table名字
     * @param {(IO | IAnd | IOr)} condition 條件
     * @param {ITransaction} [trans] 交易事務
     * @returns {Promise<any[]>} 你刪除的資料
     * @memberof SqlManager
     */
    remove(daoName: T, condition: ICondition | IAnd | IOr, trans?: ITransaction): Promise<any[]>;
    /**
     * 幫你計算這個DB的這個Table有多少資料用的
     * @param {T} daoName 指定DBTable
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    count(daoName: T, condition: ICondition | IAnd | IOr): Promise<any>;
    /**
     * 幫你Sum這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    sum(daoName: T, condition: ICondition | IAnd | IOr, uniquefield: IUniqueField): Promise<any>;
    /**
     * 幫你Max這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    max(daoName: T, condition: ICondition | IAnd | IOr, uniquefield: IUniqueField): Promise<any>;
    /**
     * 幫你Min這個DB的這個Table資料用的
     * @param {T} daoName 指定DBTable
     * @param {(IO | IAnd | IOr)} condition 搜尋的條件
     * @param {IQueryOptions} [fields]
     * @returns {Promise<any[]>} 回傳數字
     * @memberof SqlManager
     */
    min(daoName: T, condition: ICondition | IAnd | IOr, uniquefield: IUniqueField): Promise<any>;
    /**
     * 執行procedure
     * @param daoProdName
     * @param args 多參數
     * @returns {Promise<{recordset, returnValue, parameters}>}
     * @memberof SqlManager
     */
    runProcedure(daoProdName: T, ...args: any[]): Promise<any[]>;
    /**
     * 此方法在gama-orm V3版之後不支援Transaction
     * 執行procedure with Transaction
     * @param daoProdName
     * @param {ITransaction} [trans] 交易事務
     * @param args 多參數
     * @returns {Promise<{recordset, returnValue, parameters}>}
     * @memberof SqlManager
     */
    runProcedureTrans(daoProdName: T, trans: any, ...args: any[]): Promise<any[]>;
    /**
     * 取得SQL加密
     * @param password 多參數
     * @param {string} sqlKey 密碼可選參數
     * @returns {Promise<{password}>}
     * @memberof SqlManager
     */
    deCode(password: Buffer, sqlKey?: GamaConstant): Promise<any>;
    /**
     * 取得SQL解密
     * @param {string} password 多參數
     * @param {string} sqlKey 密碼可選參數
     * @returns {Promise<{password}>}
     * @memberof SqlManager
     */
    enCode(password: string, sqlKey?: GamaConstant): Promise<any>;
}
