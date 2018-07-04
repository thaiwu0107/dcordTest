import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';

export default abstract class IGamaResponse {
    protected status: GamaHttpStatusCode = GamaHttpStatusCode.STATUS_OK;

    public set $status(value: GamaHttpStatusCode) {
        this.status = value;
    }
    public get $status() {
        return this.status;
    }
}
