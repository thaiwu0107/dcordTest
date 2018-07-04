import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';

export default class NotImplemented {
    // tslint:disable-next-line:variable-name
    public status: GamaHttpStatusCode = GamaHttpStatusCode.Mock_Data;
    public message: any;
    // Not yet implemented
    constructor(msg?: any) {
        this.status = GamaHttpStatusCode.Mock_Data;
        this.message = msg ? msg : {};
    }
}
