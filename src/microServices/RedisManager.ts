import * as Redis from 'ioredis';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import 'reflect-metadata';
import { provide } from '../ioc/ioc';

const _log = log4js.getLogger('RedisManger');
@provide('RedisManger')
export default class RedisManger {
    protected redis = new Redis();
    constructor() {
        const changePromis: any = this.redis;
        changePromis.Promise = global.Promise;
    }
    public async set(k: string, v: any, ex?: number) {
        if (_.isUndefined(ex)) {
            return this.redis.set(k, v);
        } else {
            await this.redis.set(k, v);
            return this.redis.expire(k, ex);
        }
    }
    public async get(k: string) {
        return this.redis.get(k);
    }
    public async incr(k: string) {
        return this.redis.incr(k);
    }
}
