import * as _ from 'lodash';
import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
import GamaExceptions from './GamaExceptions';

export class LibsExceptions extends GamaExceptions<GamaHttpStatusCode> {
    protected setType(): GamaHttpStatusCode {
        return GamaHttpStatusCode as any;
    }
}
