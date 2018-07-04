import 'reflect-metadata';
import { ITransaction } from '.';
export default class Transaction<T> implements ITransaction {
    private daoTransName;
    private trans;
    constructor(daoTransName: T);
    begin(): Promise<any>;
    commit(): Promise<any>;
    rollback(): Promise<any>;
    getDao(tableName: string): any;
}
