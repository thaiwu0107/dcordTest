import 'reflect-metadata';

import { inject, injectable, unmanaged } from 'inversify';
import * as log4js from 'koa-log4';
import { provide } from '../ioc/ioc';
import RedisManger from '../microServices/RedisManager';

@provide('BaseRepository')
export default abstract class BaseRepository {
    protected _log = log4js.getLogger(this.constructor.name);
    constructor(@inject('RedisManger') protected redisManger: RedisManger) {
    }
}
