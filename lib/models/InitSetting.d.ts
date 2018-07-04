import { Middleware } from 'koa';
import { EnumTracerconfigSetting } from '../config/EnumTracerconfig';
import IServerInitOnceEvent from '../ServerEvent/ServerInitOnceEvent';
export default class InitSetting {
    middlewares?: any[];
    domainName: string;
    mqSetting?: any;
    jwtPrivateKey: any;
    jwtActive?: any;
    httpPort: any;
    pathdb: any;
    pathBeansPath: any;
    log4?: () => Middleware;
    filters: EnumTracerconfigSetting;
    filtersOpen: boolean;
    unlessPath: RegExp[];
    corsWhitelist: string[];
    iniData: IServerInitOnceEvent[];
    constructor(_pathdb: any, _pathBeansPath: string, _httpPort: number, _jwtPrivateKey: string, _jwtActive?: boolean, _log4?: () => Middleware, filters?: EnumTracerconfigSetting, filtersOpen?: boolean);
}
