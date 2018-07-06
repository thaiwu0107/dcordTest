import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';

export default class NotImplemented {
    // tslint:disable-next-line:variable-name
    public status: BaseHttpStatusCode = BaseHttpStatusCode.Mock_Data;
    public message: any;
    // Not yet implemented
    constructor(msg?: any) {
        this.status = BaseHttpStatusCode.Mock_Data;
        this.message = msg ? msg : {};
    }
}
