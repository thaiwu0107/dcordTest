import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
export default abstract class GamaExceptions<T> extends Error {
    status: GamaHttpStatusCode | T;
    message: any;
    private _TType;
    constructor(status: GamaHttpStatusCode | T, msg?: string | any);
    protected abstract setType(): T;
}
