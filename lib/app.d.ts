/// <reference types="node" />
import { Server } from 'http';
import InitSetting from './models/InitSetting';
export default class GServer {
    private main;
    private serverInitOnceEvents;
    private koaServer;
    constructor(initSetting: InitSetting);
    start(): Promise<Server>;
}
