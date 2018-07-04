import { Server } from 'http';
import { buildProviderModule } from 'inversify-binding-decorators';
import { InversifyKoaServer } from 'inversify-koa-utils';
import * as Redis from 'ioredis';
import { Middleware } from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as jwt from 'koa-jwt';
import * as log4js from 'koa-log4';
import * as multer from 'koa-multer';
import * as Router from 'koa-router';
import * as cors from 'koa2-cors';
import * as _ from 'lodash';
import * as defConfig from './config/defconfig';
import { container } from './ioc/ioc';
import IocTracer from './ioc/iocTracer';
import koaLog4js from './middlewares/logger/log4js';
import GamaResponse from './models/GamaResponse';
import InitSetting from './models/InitSetting';
import IServerInitOnceEvent from './ServerEvent/ServerInitOnceEvent';

const log = log4js.getLogger('App');
export default class GServer {
    private main: Promise<any>;
    private serverInitOnceEvents: IServerInitOnceEvent[] | undefined;
    private koaServer: Server;
    constructor(initSetting: InitSetting) {
        let middlewares;
        let domainName;
        // let mqSetting;
        let jwtPrivateKey;
        let jwtActive;
        let httpPort;
        let corsWhitelist;
        let log4: () => Middleware;
        if (!_.isUndefined(initSetting)) {
            middlewares = _.isUndefined(initSetting.middlewares) ? undefined : initSetting.middlewares;
            if (_.size(middlewares) === 0) {
                middlewares = undefined;
            }
            this.serverInitOnceEvents = _.isUndefined(initSetting.iniData) ? undefined : initSetting.iniData;
            corsWhitelist = _.isUndefined(initSetting.corsWhitelist) ? undefined : initSetting.corsWhitelist;
            domainName = _.isUndefined(initSetting.domainName) ? undefined : initSetting.domainName;
            // mqSetting = _.isUndefined(initSetting.mqSetting) ? undefined : initSetting.mqSetting;
            jwtPrivateKey = _.isUndefined(initSetting.jwtPrivateKey) ?
                defConfig.jwt.privateKey : initSetting.jwtPrivateKey;
            jwtActive = _.isUndefined(initSetting.jwtActive) ? defConfig.jwt.active : initSetting.jwtActive;
            httpPort = _.isUndefined(initSetting.httpPort) ? defConfig.httpPort : initSetting.httpPort;
            httpPort = _.isUndefined(initSetting.httpPort) ? defConfig.httpPort : initSetting.httpPort;
            log4 = _.isFunction(initSetting.log4) ? koaLog4js : initSetting.log4!;
            container.load(buildProviderModule());
            if (initSetting.filtersOpen) {
                const iocTracer = new IocTracer(initSetting.filters);
                iocTracer.apply(container);
            }
        }
        this.main = Promise.resolve(new Redis(initSetting.pathdb))
            .then((redis) => {
                const changePromis: any = redis;
                changePromis.Promise = global.Promise;
                const rootRouter = new Router({
                    prefix: _.isUndefined(domainName) ? '' : domainName
                });
                // create server
                const server = new InversifyKoaServer(container, rootRouter);
                server
                    .setConfig((app) => {
                        app.use(async (ctx, next) => {
                            try {
                                await next();
                            } catch (err) {
                                const response = new GamaResponse(err.message);
                                const statusArray = _.map(_.toString(err.status));
                                if (_.size(statusArray) === 4 &&
                                    statusArray[0] in ['8', '9', '7', '6', '5', '4', '3', '2', '1', '0']) {
                                    // 這邊map是因為要抓取第一個數字開頭等於9就會跑error
                                    if (statusArray[0] === '9') {
                                        log.error(err.status, err.message, JSON.stringify(ctx.state.user) || '');
                                    } else {
                                        log.warn(err.status, err.message, JSON.stringify(ctx.state.user) || '');
                                    }
                                    response.$status = err.status;
                                } else {
                                    ctx.status = err.status || 500;
                                    log.error(err.stack, JSON.stringify(ctx.state.user) || '');
                                    response.$status = ctx.status;
                                    ctx.app.emit('error', err, ctx);
                                }

                                ctx.body = response;
                            }
                        })
                            .use(cors({
                                origin: async (ctx) => {
                                    // const withoutHttpsIP = _.replace(ctx.request.header.origin, 'https://', '');
                                    // const ip = _.split(withoutHttpsIP, ':', 1)[0];
                                    // const findIP = await redis.get(ip);
                                    // if (_.isUndefined(findIP)) {
                                    //     redis.set(ip, 1, 'EX', 60);
                                    // } else if (_.toNumber(findIP) > 60) {
                                    //     ctx.throw(422, new Error('ERROR'));
                                    // } else {
                                    //     redis.set(ip, _.toNumber(findIP) + 1);
                                    // }
                                    if (_.isUndefined(corsWhitelist) ||
                                        _.size(corsWhitelist) === 0) {
                                        return '*';
                                    } else if (_.includes(corsWhitelist, ctx.header.origin)) {
                                        return '*';
                                    } else {
                                        ctx.status = 404;
                                        ctx.throw(422, new Error('Not Allow Cors'));
                                        return false;
                                    }
                                }
                            }))
                            .use(log4())
                            .use(multer({
                                storage: multer.memoryStorage()
                            }).any())
                            .use(bodyParser({
                                strict: false,
                                onerror: (err, ctx) => {
                                    log.error(err);
                                    ctx.throw(422, new Error('body parse error'));
                                }
                            }));
                        if (!_.isUndefined(middlewares) && _.size(middlewares) !== 0) {
                            _.forEach(middlewares, (middleware) => {
                                app.use(middleware);
                            });
                        }
                        app.use(jwt({ secret: jwtPrivateKey, passthrough: !jwtActive })
                            .unless({
                                path: _.isUndefined(initSetting.unlessPath) ? [] : initSetting.unlessPath
                            }));
                    })
                    .setErrorConfig((app) => {
                        app.use((ctx, next) => {
                            log.error(ctx.status, ctx.message, JSON.stringify(ctx.state.user) || '');
                            next();
                        });
                    });
                this.koaServer = server.build().listen(httpPort);
                if (!_.isUndefined(this.serverInitOnceEvents) && _.size(this.serverInitOnceEvents) !== 0) {
                    _.forEach(this.serverInitOnceEvents, (element) => {
                        element.init();
                    });
                }
                log.info('Http started listening on http://localhost:%s ...', httpPort);
            })
            .catch((e) => {
                log.error(e);
            });
    }
    public async start() {
        await Promise.all([this.main]);
        if (!_.isUndefined(this.serverInitOnceEvents) && _.size(this.serverInitOnceEvents) !== 0) {
            _.forEach(this.serverInitOnceEvents, (element) => {
                element.doOnce();
                element.end();
            });
        }
        return this.koaServer;
    }
}
