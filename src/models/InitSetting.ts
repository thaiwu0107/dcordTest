import { Middleware } from 'koa';
import { EnumTracerconfigSetting } from '../config/EnumTracerconfig';
import IServerInitOnceEvent from '../ServerEvent/ServerInitOnceEvent';

export default class InitSetting {

    public middlewares?: any[];
    public domainName: string;
    public mqSetting?;
    public jwtPrivateKey;
    public jwtActive?;
    public httpPort;
    public pathdb: any;
    public pathBeansPath: any;
    public log4?: () => Middleware;
    public filters: EnumTracerconfigSetting;
    public filtersOpen: boolean;
    public unlessPath: RegExp[];
    public corsWhitelist: string[];
    public iniData: IServerInitOnceEvent[];

    constructor(
        _pathdb: any, _pathBeansPath: string,
        _httpPort: number, _jwtPrivateKey: string, _jwtActive: boolean = false,
        _log4?: () => Middleware, filters: EnumTracerconfigSetting = EnumTracerconfigSetting.NoFilter,
        filtersOpen: boolean = true
    ) {
        this.pathdb = _pathdb;
        this.log4 = _log4;
        this.pathBeansPath = _pathBeansPath;
        this.jwtPrivateKey = _jwtPrivateKey;
        this.jwtActive = _jwtActive;
        this.httpPort = _httpPort;
        this.filters = filters;
        this.filtersOpen = filtersOpen;
    }
}
