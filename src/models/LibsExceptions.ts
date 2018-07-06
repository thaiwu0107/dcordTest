import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
import BaseExceptions from './BaseExceptions';

export class LibsExceptions extends BaseExceptions<BaseHttpStatusCode> {
    protected setType(): BaseHttpStatusCode {
        return BaseHttpStatusCode as any;
    }
}
