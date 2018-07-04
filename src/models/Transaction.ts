import * as log4js from 'koa-log4';
import 'reflect-metadata';
import { GamaContext, ITransaction } from '.';

const _log = log4js.getLogger('Transaction');

export default class Transaction<T> implements ITransaction {
    private trans: any;
    constructor(private daoTransName: T) {
        this.trans = GamaContext.getContext().getBean(this.daoTransName);
    }
    public async begin(): Promise<any> {
        return this.trans.begin();
    }
    public async commit(): Promise<any> {
        return this.trans.commit();
    }
    public async rollback(): Promise<any> {
        return this.trans.rollback();
    }
    public getDao(tableName: string): any {
        return this.trans.getDao(tableName);
    }
}
