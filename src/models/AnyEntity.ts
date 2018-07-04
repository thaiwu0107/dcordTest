import * as _ from 'lodash';
import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
import GamaExceptions from '../models/GamaExceptions';
import { LibsExceptions } from './LibsExceptions';
export default class AnyEntity {
    public toObj(keys: string | string[], values: any | any[]) {
        if (Array.isArray(keys)) {
            if (keys.length !== values.length) {
                throw new LibsExceptions(GamaHttpStatusCode.STATUS_FAIL, 'keys 跟 values 長度不一致');
            }
            keys.forEach((key, i, arr) => {
                this[key] = values[i];
            });
        } else {
            this[keys] = values;
        }
        return _.omit(_.omitBy(this, _.isUndefined), 'toObj') as any;
    }
}
