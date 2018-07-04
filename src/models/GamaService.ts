import * as log4js from 'koa-log4';

export default abstract class GamaService {
    protected _log = log4js.getLogger(this.constructor.name);
}
