import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
import GamaExceptions from './GamaExceptions';
export declare class LibsExceptions extends GamaExceptions<GamaHttpStatusCode> {
    protected setType(): GamaHttpStatusCode;
}
