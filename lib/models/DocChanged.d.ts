import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
export default class DocChanged {
    status: GamaHttpStatusCode;
    message: any;
    constructor(msg?: any, forswagger?: any);
}
