import { InversifyTracer } from 'inversify-tracer';
import 'reflect-metadata';
import { EnumTracerconfigSetting } from '../config/EnumTracerconfig';
export default class IocTracer {
    instance: InversifyTracer;
    apply(iocData: any): void;
    constructor(filters: EnumTracerconfigSetting);
}
