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
}
