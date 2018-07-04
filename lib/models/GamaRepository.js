"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const log4js = require("koa-log4");
const _ = require("lodash");
const GamaHttpStatusCode_1 = require("../config/GamaHttpStatusCode");
const APIManager_1 = require("../microServices/APIManager");
const SQLManager_1 = require("../microServices/SQLManager");
const GamaUtils_1 = require("../utils/GamaUtils");
const LibsExceptions_1 = require("./LibsExceptions");
let GamaRepository = class GamaRepository {
    constructor(sqlType) {
        this._log = log4js.getLogger(this.constructor.name);
        this.apiManager = new APIManager_1.default();
        this.sqlManager = new SQLManager_1.default();
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
    async getDBCurrentTime() {
        return this.sqlManager.getDBCurrentTime();
    }
    /**
     * 取得系統時間(from DB)
     *
     * @returns {Promise<string>}
     *
     * @memberOf BaseRepository
     */
    async getDBCurrentTimeString() {
        return GamaUtils_1.default.DBTimeFormat(await this.sqlManager.getDBCurrentTime());
    }
    /**
     * password解密 (use DB)
     *
     * @param {(Buffer | object)} password
     * @returns {Promise<any>}
     *
     * @memberOf BaseRepository
     */
    async deCode(password) {
        if (_.isBuffer(password)) {
            return this.sqlManager.deCode(password);
        }
        else if (_.isObject(password)) {
            const toBeBuffer = new Buffer(password, 'binary');
            return this.sqlManager.deCode(toBeBuffer);
        }
        else {
            throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'DECODE_PASSWORD_UNDEFIND_TYPE');
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
    async enCode(password) {
        return this.sqlManager.enCode(password);
    }
    /**
     * 目前暫不使用
     * @param {BaseEntity} entity
     * @returns {Promise<any>}
     * @author Mikeli
     * @memberOf BaseRepository
     */
    async insert(entity) {
        const daoName = entity.getGamaEntityDbName() + '.dao:' + entity.getGamaEntitytableName();
        return this.sqlManager.insert(daoName, // 從entity 拿到 daoEnum , tableName
        entity);
    }
};
GamaRepository = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.unmanaged()),
    __metadata("design:paramtypes", [Object])
], GamaRepository);
exports.default = GamaRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtYVJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dndHRvbzQ0L0Rlc2t0b3AvYmFzZUFQSS9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvR2FtYVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0QkFBMEI7QUFFMUIseUNBQTBEO0FBQzFELG1DQUFtQztBQUNuQyw0QkFBNEI7QUFFNUIscUVBQWtFO0FBQ2xFLDREQUFxRDtBQUNyRCw0REFBcUQ7QUFJckQsa0RBQTJDO0FBQzNDLHFEQUFrRDtBQUdsRCxJQUE4QixjQUFjLEdBQTVDO0lBS0ksWUFBeUIsT0FBTztRQUp0QixTQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9DLGVBQVUsR0FBZSxJQUFJLG9CQUFVLEVBQUUsQ0FBQztRQUMxQyxlQUFVLEdBQWtCLElBQUksb0JBQVUsRUFBSyxDQUFDO1FBRXRELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxnQkFBZ0I7UUFDekIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxzQkFBc0I7UUFDL0IsT0FBTyxtQkFBUyxDQUFDLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUF5QjtRQUN6QyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFrQixDQUFDLENBQUM7U0FDckQ7YUFBTSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNILE1BQU0sSUFBSSwrQkFBYyxDQUFDLHVDQUFrQixDQUFDLFdBQVcsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDO1NBQzdGO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQWdCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBa0I7UUFDbEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQyxzQkFBc0IsRUFBUyxDQUFDO1FBQ2hHLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ3pCLE9BQU8sRUFBRSxpQ0FBaUM7UUFDMUMsTUFBTSxDQUNULENBQUM7SUFDTixDQUFDO0NBQ0osQ0FBQTtBQTVFNkIsY0FBYztJQUQzQyxzQkFBVSxFQUFFO0lBTUksV0FBQSxxQkFBUyxFQUFFLENBQUE7O0dBTEUsY0FBYyxDQTRFM0M7a0JBNUU2QixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcblxuaW1wb3J0IHsgaW5qZWN0LCBpbmplY3RhYmxlLCB1bm1hbmFnZWQgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0ICogYXMgbG9nNGpzIGZyb20gJ2tvYS1sb2c0JztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgR2FtYUh0dHBTdGF0dXNDb2RlIH0gZnJvbSAnLi4vY29uZmlnL0dhbWFIdHRwU3RhdHVzQ29kZSc7XG5pbXBvcnQgQVBJTWFuYWdlciBmcm9tICcuLi9taWNyb1NlcnZpY2VzL0FQSU1hbmFnZXInO1xuaW1wb3J0IFNRTE1hbmFnZXIgZnJvbSAnLi4vbWljcm9TZXJ2aWNlcy9TUUxNYW5hZ2VyJztcbmltcG9ydCBHYW1hRW50aXR5IGZyb20gJy4uL21vZGVscy9HYW1hRW50aXR5JztcbmltcG9ydCBHYW1hRXhjZXB0aW9ucyBmcm9tICcuLi9tb2RlbHMvR2FtYUV4Y2VwdGlvbnMnO1xuaW1wb3J0IEdhbWFTUUxIZWxwZXIgZnJvbSAnLi4vdXRpbHMvR2FtYVNRTEhlbHBlcic7XG5pbXBvcnQgR2FtYVV0aWxzIGZyb20gJy4uL3V0aWxzL0dhbWFVdGlscyc7XG5pbXBvcnQgeyBMaWJzRXhjZXB0aW9ucyB9IGZyb20gJy4vTGlic0V4Y2VwdGlvbnMnO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBHYW1hUmVwb3NpdG9yeTxUPiB7XG4gICAgcHJvdGVjdGVkIF9sb2cgPSBsb2c0anMuZ2V0TG9nZ2VyKHRoaXMuY29uc3RydWN0b3IubmFtZSk7XG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHNldFBhdGgoKTogYW55O1xuICAgIHByb3RlY3RlZCBhcGlNYW5hZ2VyOiBBUElNYW5hZ2VyID0gbmV3IEFQSU1hbmFnZXIoKTtcbiAgICBwcm90ZWN0ZWQgc3FsTWFuYWdlcjogU1FMTWFuYWdlcjxUPiA9IG5ldyBTUUxNYW5hZ2VyPFQ+KCk7XG4gICAgY29uc3RydWN0b3IoQHVubWFuYWdlZCgpIHNxbFR5cGUpIHtcbiAgICAgICAgdGhpcy5zcWxNYW5hZ2VyLnJvb3RQYXRoID0gdGhpcy5zZXRQYXRoKCk7XG4gICAgICAgIHRoaXMuc3FsTWFuYWdlci5zcWxUeXBlID0gc3FsVHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Y+W5b6X57O757Wx5pmC6ZaTKGZyb20gREIpXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEYXRlPn1cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBCYXNlUmVwb3NpdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXREQkN1cnJlbnRUaW1lKCk6IFByb21pc2U8RGF0ZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmdldERCQ3VycmVudFRpbWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlj5blvpfns7vntbHmmYLplpMoZnJvbSBEQilcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0REJDdXJyZW50VGltZVN0cmluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gR2FtYVV0aWxzLkRCVGltZUZvcm1hdChhd2FpdCB0aGlzLnNxbE1hbmFnZXIuZ2V0REJDdXJyZW50VGltZSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXNzd29yZOino+WvhiAodXNlIERCKVxuICAgICAqXG4gICAgICogQHBhcmFtIHsoQnVmZmVyIHwgb2JqZWN0KX0gcGFzc3dvcmRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqXG4gICAgICogQG1lbWJlck9mIEJhc2VSZXBvc2l0b3J5XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGRlQ29kZShwYXNzd29yZDogQnVmZmVyIHwgb2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgaWYgKF8uaXNCdWZmZXIocGFzc3dvcmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmRlQ29kZShwYXNzd29yZCBhcyBCdWZmZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNPYmplY3QocGFzc3dvcmQpKSB7XG4gICAgICAgICAgICBjb25zdCB0b0JlQnVmZmVyID0gbmV3IEJ1ZmZlcihwYXNzd29yZCBhcyBhbnksICdiaW5hcnknKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNxbE1hbmFnZXIuZGVDb2RlKHRvQmVCdWZmZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEdhbWFIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ0RFQ09ERV9QQVNTV09SRF9VTkRFRklORF9UWVBFJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXNzd29yZOWKoOWvhiAodXNlIERCKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkXG4gICAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBCYXNlUmVwb3NpdG9yeVxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBlbkNvZGUocGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNxbE1hbmFnZXIuZW5Db2RlKHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDnm67liY3mmqvkuI3kvb/nlKhcbiAgICAgKiBAcGFyYW0ge0Jhc2VFbnRpdHl9IGVudGl0eVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICogQGF1dGhvciBNaWtlbGlcbiAgICAgKiBAbWVtYmVyT2YgQmFzZVJlcG9zaXRvcnlcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgaW5zZXJ0KGVudGl0eTogR2FtYUVudGl0eSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IGRhb05hbWUgPSBlbnRpdHkuZ2V0R2FtYUVudGl0eURiTmFtZSgpICsgJy5kYW86JyArIGVudGl0eS5nZXRHYW1hRW50aXR5dGFibGVOYW1lKCkgYXMgYW55O1xuICAgICAgICByZXR1cm4gdGhpcy5zcWxNYW5hZ2VyLmluc2VydChcbiAgICAgICAgICAgIGRhb05hbWUsIC8vIOW+nmVudGl0eSDmi7/liLAgZGFvRW51bSAsIHRhYmxlTmFtZVxuICAgICAgICAgICAgZW50aXR5XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19