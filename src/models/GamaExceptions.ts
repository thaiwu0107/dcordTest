import * as _ from 'lodash';
import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';

export default abstract class GamaExceptions<T> extends Error {
    public status: GamaHttpStatusCode | T;
    public message: any;
    private _TType: any = this.setType();

    constructor(status: GamaHttpStatusCode | T, msg?: string | any) {
        super();
        if (msg instanceof GamaExceptions) {
            throw msg;
        }
        // gama-orm的底層錯誤處理
        if (!_.isUndefined(msg) && msg.name === 'RequestError') {
            msg = msg.message;
        }
        this.status = status;
        this.name = status ? status.toString() : '';
        this.message = msg ? { message: msg } : {
            message: _.isEmpty(GamaHttpStatusCode[status as number]) ?
                this._TType[status as number] :
                GamaHttpStatusCode[status as number]
        };
    }
    protected abstract setType(): T;

}
