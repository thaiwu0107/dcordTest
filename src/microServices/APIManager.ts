import * as fs from 'fs';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import * as moment from 'moment';
import * as path from 'path';
import 'reflect-metadata';
import { del, get, patch, post, put } from 'request';
import { promisify } from 'util';
import { LibsExceptions } from '../models/LibsExceptions';
import { GamaHttpStatusCode } from './../config/GamaHttpStatusCode';

const _log = log4js.getLogger('APIManger');
export default class APIManger {
    private agentOptions: undefined | {
        certFile?: string,
        keyFile?: string,
        ca?: string,
        passphrase?: string,
        securityOptions?: string,
        secureProtocol?: string
    } = undefined;
    private auth: undefined | {
        user?: string,
        pass?: string,
        bearer?: string,
        sendImmediately?: boolean
    };
    private get;
    private del;
    private patch;
    private post;
    private put;
    constructor(
        authData?: {
            user?: string,
            pass?: string,
            bearer?: string,
            sendImmediately?: boolean
        },
        cadata?: {
            certFile?: string,
            keyFile?: string,
            ca?: string,
            passphrase?: string,
            securityOptions?: string,
            secureProtocol?: string
        }) {
        this.agentOptions = _.isUndefined(cadata) ? undefined : _.omitBy(cadata, _.isUndefined);
        this.auth = _.isUndefined(authData) ? undefined : _.omitBy(authData, _.isUndefined);
        const [getPm, postPm, patchPm, deletePm, putPm] = [get, post, patch, del, put].map(promisify);
        this.get = getPm;
        this.post = postPm;
        this.patch = patchPm;
        this.del = deletePm;
        this.put = putPm;
    }
    /**
     * httpGet
     */
    public async httpGet(
        url: string,
        params?: any,
        authData?: {
            user?: string,
            pass?: string,
            bearer?: string,
            sendImmediately?: boolean
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            auth: _.isUndefined(authData) ? this.auth : authData
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.get(reqData);
    }
    /**
     * httpsGet
     */
    public async httpsGet(
        url: string, params?: any,
        cadata?: {
            certFile?: string,
            keyFile?: string,
            ca?: string,
            passphrase?: string,
            securityOptions?: string,
            secureProtocol?: string
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            agentOptions: _.isUndefined(cadata) ? this.agentOptions : _.omitBy(cadata, _.isUndefined)
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.get(reqData);
    }
    /**
     * httpPost
     */
    public async httpPost(
        url: string, requestBody, params?: any, authData?: {
            user?: string,
            pass?: string,
            bearer?: string,
            sendImmediately?: boolean
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            auth: _.isUndefined(authData) ? this.auth : authData,
            json: true,
            body: JSON.stringify(requestBody)
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.post(reqData);
    }
    /**
     * httpsPost
     */
    public async httpsPost(
        url: string, requestBody, params?: any,
        cadata?: {
            certFile?: string,
            keyFile?: string,
            ca?: string,
            passphrase?: string,
            securityOptions?: string,
            secureProtocol?: string
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            agentOptions: _.isUndefined(cadata) ? this.agentOptions : _.omitBy(cadata, _.isUndefined),
            json: true, body: JSON.stringify(requestBody)
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.post(reqData);
    }
    /**
     * httpPostFormData
     */
    public async httpPostFormData(
        url: string, formData, params?: any, authData?: {
            user?: string,
            pass?: string,
            bearer?: string,
            sendImmediately?: boolean
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            auth: _.isUndefined(authData) ? this.auth : authData,
            formData
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.post(reqData);
    }
    /**
     * httpsPostFormData
     */
    public async httpsPostFormData(
        url: string, formData, params?: any,
        cadata?: {
            certFile?: string,
            keyFile?: string,
            ca?: string,
            passphrase?: string,
            securityOptions?: string,
            secureProtocol?: string
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            agentOptions: _.isUndefined(cadata) ? this.agentOptions : _.omitBy(cadata, _.isUndefined),
            formData
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.post(reqData);
    }
    /**
     * httpPut
     */
    public async httpPut(
        url: string, requestBody, params?: any,
        authData?: {
            user?: string,
            pass?: string,
            bearer?: string,
            sendImmediately?: boolean
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            auth: _.isUndefined(authData) ? this.auth : authData,
            json: true,
            body: JSON.stringify(requestBody)
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.put(reqData);
    }
    /**
     * httpsPut
     */
    public async httpsPut(
        url: string, requestBody, params?: any,
        cadata?: {
            certFile?: string,
            keyFile?: string,
            ca?: string,
            passphrase?: string,
            securityOptions?: string,
            secureProtocol?: string
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            agentOptions: _.isUndefined(cadata) ? this.agentOptions : _.omitBy(cadata, _.isUndefined),
            json: true, body: JSON.stringify(requestBody)
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.put(reqData);
    }
    /**
     * httpPutFormData
     */
    public async httpPutFormData(
        url: string, formData, params?: any, authData?: {
            user?: string,
            pass?: string,
            bearer?: string,
            sendImmediately?: boolean
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            auth: _.isUndefined(authData) ? this.auth : authData,
            formData
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.put(reqData);
    }
    /**
     * httpsPut
     */
    public async httpsPutFormData(
        url: string, formData, params?: any,
        cadata?: {
            certFile?: string,
            keyFile?: string,
            ca?: string,
            passphrase?: string,
            securityOptions?: string,
            secureProtocol?: string
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            agentOptions: _.isUndefined(cadata) ? this.agentOptions : _.omitBy(cadata, _.isUndefined), formData
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.put(reqData);
    }
    /**
     * httpPatch
     */
    public async httpPatch(
        url: string, requestBody, params?: any, authData?: {
            user?: string,
            pass?: string,
            bearer?: string,
            sendImmediately?: boolean
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            auth: _.isUndefined(authData) ? this.auth : authData,
            json: true,
            body: JSON.stringify(requestBody)
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.patch(reqData);
    }
    /**
     * httpsPatch
     */
    public async httpsPatch(
        url: string, requestBody, params?: any,
        cadata?: {
            certFile?: string,
            keyFile?: string,
            ca?: string,
            passphrase?: string,
            securityOptions?: string,
            secureProtocol?: string
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            agentOptions: _.isUndefined(cadata) ? this.agentOptions : _.omitBy(cadata, _.isUndefined),
            json: true, body: JSON.stringify(requestBody)
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.patch(reqData);
    }
    /**
     * httpDelete
     */
    public async httpDelete(
        url: string, params?: any, authData?: {
            user?: string,
            pass?: string,
            bearer?: string,
            sendImmediately?: boolean
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            auth: _.isUndefined(authData) ? this.auth : authData
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.del(reqData);
    }
    /**
     * httpsDelete
     */
    public async httpsDelete(
        url: string, params?: any,
        cadata?: {
            certFile?: string,
            keyFile?: string,
            ca?: string,
            passphrase?: string,
            securityOptions?: string,
            secureProtocol?: string
        }): Promise<any> {
        const baseData = {
            url: 'http://' + url,
            agentOptions: _.isUndefined(cadata) ? this.agentOptions : _.omitBy(cadata, _.isUndefined)
        };
        const reqData = _.isUndefined(params) ? baseData : _.assign(baseData, { qs: params });
        return this.del(reqData);
    }
}
