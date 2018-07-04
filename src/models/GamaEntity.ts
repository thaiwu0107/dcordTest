import { validate, validateSync } from 'class-validator';
import * as _ from 'lodash';

import { GamaHttpStatusCode } from '../config/GamaHttpStatusCode';
import { LibsExceptions } from '../models/LibsExceptions';

export default abstract class GamaEntity {

    protected abstract getList(): string[];
    private gamaEntityDbName: string;
    private gamaEntitytableName: string;

    public getGamaEntityDbName() {
        return this.gamaEntityDbName;
    }

    protected setGamaEntityDbName(name: string) {
        this.gamaEntityDbName = name;
    }

    public getGamaEntitytableName() {
        return this.gamaEntitytableName;
    }

    protected setGamaEntitytableName(name: string) {
        this.gamaEntitytableName = name;
    }

    /**
     * Creates an instance of GamaEntity.
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
            throw new LibsExceptions(GamaHttpStatusCode.STATUS_FAIL,
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
            throw new LibsExceptions(GamaHttpStatusCode.STATUS_FAIL,
                this.constructor.name + ' : data format error, field: ' + _.toString(messages));
        }
    }
}
