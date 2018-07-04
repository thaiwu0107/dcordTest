import 'reflect-metadata';

import { inject, injectable, unmanaged } from 'inversify';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';

import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
import APIManager from '../microServices/APIManager';
import SQLManager from '../microServices/SQLManager';
import GamaEntity from '../models/GamaEntity';
import GamaExceptions from '../models/GamaExceptions';
import GamaSQLHelper from '../utils/GamaSQLHelper';
import GamaUtils from '../utils/GamaUtils';
import { LibsExceptions } from './LibsExceptions';

@injectable()
export default abstract class GamaRepository<T> {
    protected _log = log4js.getLogger(this.constructor.name);
    protected abstract setPath(): any;
    protected apiManager: APIManager = new APIManager();
    protected sqlManager: SQLManager<T> = new SQLManager<T>();
    constructor(@unmanaged() sqlType) {
        this.sqlManager.rootPath = this.setPath();
        this.sqlManager.sqlType = sqlType;
    }
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<Date>}
     *
     * @memberOf BaseRepository
     */
    public async getDBCurrentTime(): Promise<Date> {
        return this.sqlManager.getDBCurrentTime();
    }

    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    public async getDBCurrentTimeString(): Promise<string> {
        return GamaUtils.DBTimeFormat(await this.sqlManager.getDBCurrentTime());
    }

    /**
     * password解密 (use DB)
     *
     * @param {(Buffer | object)} password
     * @returns {Promise<any>}
     *
     * @memberOf BaseRepository
     */
    public async deCode(password: Buffer | object): Promise<any> {
        if (_.isBuffer(password)) {
            return this.sqlManager.deCode(password as Buffer);
        } else if (_.isObject(password)) {
            const toBeBuffer = new Buffer(password as any, 'binary');
            return this.sqlManager.deCode(toBeBuffer);
        } else {
            throw new LibsExceptions(GamaHttpStatusCode.STATUS_FAIL, 'DECODE_PASSWORD_UNDEFIND_TYPE');
        }
    }

    /**
     * password加密 (use DB)
     *
     * @param {string} password
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    public async enCode(password: string): Promise<string> {
        return this.sqlManager.enCode(password);
    }

    /**
     * 目前暫不使用
     * @param {BaseEntity} entity
     * @returns {Promise<any>}
     * @author Mikeli
     * @memberOf BaseRepository
     */
    public async insert(entity: GamaEntity): Promise<any> {
        const daoName = entity.getGamaEntityDbName() + '.dao:' + entity.getGamaEntitytableName() as any;
        return this.sqlManager.insert(
            daoName, // 從entity 拿到 daoEnum , tableName
            entity
        );
    }
}
