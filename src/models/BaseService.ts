import * as log4js from 'koa-log4';
import { provide } from '../ioc/ioc';

@provide('BaseService')
export default abstract class BaseService {
    protected _log = log4js.getLogger(this.constructor.name);
}
