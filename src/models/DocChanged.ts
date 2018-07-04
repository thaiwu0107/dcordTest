import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';

// 之前已經實作,但是文件有更新還要再配合修改可以先暫時用new DocChanged包起來
export default class DocChanged {
    // tslint:disable-next-line:variable-name
    public status: GamaHttpStatusCode = GamaHttpStatusCode.Mock_Data;
    public message: any;
    // Not yet implemented
    constructor(msg?: any, forswagger?: any) {
        this.status = GamaHttpStatusCode.Mock_Data;
        this.message = forswagger ? forswagger : {};
    }
}
