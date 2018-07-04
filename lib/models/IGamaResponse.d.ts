import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
export default abstract class IGamaResponse {
    protected status: GamaHttpStatusCode;
    $status: GamaHttpStatusCode;
}
