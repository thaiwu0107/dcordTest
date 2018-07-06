import { CallInfo, InversifyTracer, ReturnInfo } from 'inversify-tracer';
import 'reflect-metadata';

// tslint:disable-next-line:no-submodule-imports
import { Parameter } from 'inversify-tracer/build/proxy-listener';
import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import { EnumTracerconfigSetting, getEnumTracerconfigSetting } from '../config/EnumTracerconfig';
import AnyEntity from '../models/AnyEntity';
import GamaEntity from '../models/BaseEntity';
import GamaUtils from '../utils/BaseUtils';

const _log = log4js.getLogger('Tracer');

const LOG_TOO_BIG = 5;
const STRING_TOO_BIG = 100;
const OBJ_TOO_BIG = 15;
const SIZE_TOO_BIG = 10;
const autoParse = (obj: any) => {
    if (_.isBuffer(obj)) {
        return '<BUFFER '
            + _.take(obj, LOG_TOO_BIG) + 'More ' + (_.size(obj) - LOG_TOO_BIG) + '.items>';
    } else if (_.isString(obj)) {
        return _.truncate(obj, {
            length: STRING_TOO_BIG,
            omission: ' <StringTooBig...>'
        });
    } else if (_.isNumber(obj)) {
        return obj;
    } else if (_.isDate(obj)) {
        return GamaUtils.DBTimeFormat(obj);
    } else if (obj instanceof GamaEntity) {
        return _.mapValues(obj.toJSON(), (v) => {
            if (_.isBuffer(v)) {
                return '<BUFFER '
                    + _.take(v, LOG_TOO_BIG) + 'More ' + (_.size(v) - LOG_TOO_BIG) + '.items>';
            } else if (_.isString(v)) {
                return _.truncate(v, {
                    length: STRING_TOO_BIG,
                    omission: ' <StringTooBig...>'
                });
            } else if (_.isNumber(v)) {
                return v;
            } else if (_.isDate(v)) {
                return GamaUtils.DBTimeFormat(v);
            } else if (_.size(v) > LOG_TOO_BIG) {
                return '<TOO-BIG-DATA '
                    + _.take(v, LOG_TOO_BIG) + 'More ' + (_.size(v) - LOG_TOO_BIG) + '.items>';
            } else {
                return v;
            }
        });
    } else if (_.isObject(obj)) {
        const keys = _.keys(obj);
        const size = _.size(keys);
        let newObj = obj;
        if (size > OBJ_TOO_BIG) {
            const tKeys = _.take(keys, OBJ_TOO_BIG);
            tKeys.push('TooBig');
            const tValues = _.take(_.values(obj), OBJ_TOO_BIG);
            tValues.push('More ' + (size - OBJ_TOO_BIG) + '.items');
            newObj = new AnyEntity().toObj(tKeys, tValues);
        }
        return _.mapValues(newObj, (ab) => {
            return autoParse(ab);
        });
    } else if (_.isArrayLikeObject(obj)) {
        const size = _.size(obj);
        let newObj = obj;
        if (size > SIZE_TOO_BIG) {
            newObj = _.take(obj, SIZE_TOO_BIG);
            newObj.push({
                TooBig: 'More ' + (size - OBJ_TOO_BIG) + '.items'
            });
        }
        return _.map(newObj, (o) => {
            return autoParse(o);
        });
    } else {
        if (_.size(obj) > LOG_TOO_BIG) {
            return '<TOO-BIG-DATA '
                + _.take(obj, LOG_TOO_BIG) + 'More ' + (_.size(obj) - LOG_TOO_BIG) + '.items>';
        }
        return obj;
    }
};
export default class IocTracer {
    public instance: InversifyTracer;
    public apply(iocData) {
        this.instance.apply(iocData);
    }
    constructor(filters: EnumTracerconfigSetting) {
        this.instance = new InversifyTracer({
            filters: getEnumTracerconfigSetting(filters),
            inspectReturnedPromise: true
        });
        this.instance.on('call', (callInfo: CallInfo) => {
            let parametersWithValue;
            parametersWithValue = callInfo.parameters.map((param: Parameter) => {
                let m;
                try {
                    m = JSON.stringify(autoParse(param.value));
                } catch {
                    m = '[Circular Json]';
                }
                return `\n  { ${param.name}: ` + m + ' }';
            });
            _log.debug('Call->', `${callInfo.className}.${callInfo.methodName}(`
                + parametersWithValue + '\n);');
        });
        this.instance.on('return', (returnInfo: ReturnInfo) => {
            if (returnInfo.result instanceof Error) {
                throw returnInfo.result;
            }
            let parametersWithValue;
            try {
                parametersWithValue = JSON.stringify(autoParse(returnInfo.result));
            } catch {
                parametersWithValue = returnInfo.result;
            }
            if (!_.endsWith(returnInfo.className, 'Controller')) {
                _log.debug('Return->',
                    `${returnInfo.className}.${returnInfo.methodName}() => \n  ${parametersWithValue}\n;`);
            }
        });
    }
}
