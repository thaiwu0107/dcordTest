import * as _ from 'lodash';
import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';

export default abstract class BaseExceptions<T> extends Error {
    public status: BaseHttpStatusCode | T;
    public message: any;
    private _TType: any = this.setType();

    constructor(status: BaseHttpStatusCode | T, msg?: string | any) {
        super();
        if (msg instanceof BaseExceptions) {
            throw msg;
        }
        if (!_.isUndefined(msg) && msg.name === 'RequestError') {
            msg = msg.message;
        }
        this.status = status;
        this.name = status ? status.toString() : '';
        this.message = msg ? { message: msg } : {
            message: _.isEmpty(BaseHttpStatusCode[status as number]) ?
                this._TType[status as number] :
                BaseHttpStatusCode[status as number]
        };
    }
    protected abstract setType(): T;

}
