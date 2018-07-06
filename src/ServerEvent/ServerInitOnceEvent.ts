import * as log4js from 'koa-log4';
import 'reflect-metadata';

const _log = log4js.getLogger('ServerInitOnceEvent');
export default interface IServerInitOnceEvent {
    init();
    doOnce(): any;
    end();
}
