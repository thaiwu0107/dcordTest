import * as log4js from 'koa-log4';

export default abstract class GamaController {
    protected _log = log4js.getLogger(this.constructor.name);
}
