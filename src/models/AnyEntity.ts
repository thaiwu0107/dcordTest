import * as _ from 'lodash';
import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
import { LibsExceptions } from './LibsExceptions';
export default class AnyEntity {
    public toObj(keys: string | string[], values: any | any[]) {
        if (Array.isArray(keys)) {
            if (keys.length !== values.length) {
                throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL, 'keys 跟 values 長度不一致');
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
