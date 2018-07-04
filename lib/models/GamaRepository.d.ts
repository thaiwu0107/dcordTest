/// <reference types="node" />
import 'reflect-metadata';
import APIManager from '../microServices/APIManager';
import SQLManager from '../microServices/SQLManager';
import GamaEntity from '../models/GamaEntity';
export default abstract class GamaRepository<T> {
    protected _log: any;
    protected abstract setPath(): any;
    protected apiManager: APIManager;
    protected sqlManager: SQLManager<T>;
    constructor(sqlType: any);
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<Date>}
     *
     * @memberOf BaseRepository
     */
    getDBCurrentTime(): Promise<Date>;
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    getDBCurrentTimeString(): Promise<string>;
    /**
     * password解密 (use DB)
     *
     * @param {(Buffer | object)} password
     * @returns {Promise<any>}
     *
     * @memberOf BaseRepository
     */
    deCode(password: Buffer | object): Promise<any>;
    /**
     * password加密 (use DB)
     *
     * @param {string} password
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    enCode(password: string): Promise<string>;
    /**
     * 目前暫不使用
     * @param {BaseEntity} entity
     * @returns {Promise<any>}
     * @author Mikeli
     * @memberOf BaseRepository
     */
    insert(entity: GamaEntity): Promise<any>;
}
