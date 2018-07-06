import * as log4js from 'koa-log4';
import { provide } from '../ioc/ioc';

@provide('BaseController')
export default abstract class BaseController {
    protected _log = log4js.getLogger(this.constructor.name);
}
