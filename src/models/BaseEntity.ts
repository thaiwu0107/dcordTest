import { validate, validateSync } from 'class-validator';
import * as _ from 'lodash';
import { BaseHttpStatusCode } from '../config/BaseHttpStatusCode';
import { LibsExceptions } from '../models/LibsExceptions';

export default abstract class BaseEntity {

    protected abstract getList(): string[];
    /**
     * Creates an instance of BasEntity.
     * @param {*} [source] 自動對應k-v,
     * @param {boolean} [isVaild] 盡量不要在這裡同步驗證,使用非同步vaild驗證比較好(才不會阻塞event loop線程)
     * @memberof GamaEntity
     */
    constructor(source?: any, isVaild?: boolean) {
        if (source) {
            const properties: string[] = this.getList();
            properties.forEach((property) => {
                if (!_.isUndefined(source[property])) {
                    this[property] = source[property];
                }
            });
            if (isVaild) {
                this.validateSync();
            }
        }
    }

    private listAllProperties(): string[] {
        return this.getList();
    }

    public toJSON(): any {
        const properties: string[] = this.listAllProperties();
        const dataObject: any = {};
        properties.forEach((property) => {
            if ((this)[property] !== undefined) {
                dataObject[property] = (this)[property];
            }
        });
        return dataObject;
    }

    public fields(): string[] {
        return this.listAllProperties();
    }

    public async vaild() {
        const errorsP = validate(this, { skipMissingProperties: true });
        const errors = await errorsP;
        if (errors.length > 0) {
            const messages: string[] = [];
            errors.forEach((err) => {
                messages.push(_.trimStart(err.property, '_'));
            });
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                this.constructor.name + ' : data format error, field: ' + _.toString(messages));
        }
    }

    private validateSync() {
        const errors = validateSync(this, { skipMissingProperties: true });
        if (errors.length > 0) {
            const messages: string[] = [];
            errors.forEach((err) => {
                messages.push(_.trimStart(err.property, '_'));
            });
            throw new LibsExceptions(BaseHttpStatusCode.STATUS_FAIL,
                this.constructor.name + ' : data format error, field: ' + _.toString(messages));
        }
    }
}
