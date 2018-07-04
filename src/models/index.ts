import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import 'reflect-metadata';

/* istanbul ignore next */
export class GamaContext {
    public context: any;
    public static orm: any;
    constructor() {
        this.context = GamaContext.getContext();
    }
    public getBean(name: string) {
        return this.context.getBean(name);
    }
    public getConnectionNames() {
        return Object.keys(this.context._config.database);
    }
    public static getConnectionNames() {
        return Object.keys(GamaContext.orm._config.database);
    }

    public static async init(pathdb, pathBeansPath) {
        // tslint:disable-next-line:no-null-keyword
        this.orm = null;
        this.orm = await require('gama-orm')({
            beansPath: pathBeansPath,
            printSQL: true,
            database: pathdb
        });

        return this.orm;
    }
    public static getBean(name: string) {
        return this.orm.getBean(name);
    }

    /**
     * 注意!!這是為了Mock注入的hook,單純為了注入依賴,非常規使用
     * 請不要隨意使用這個方法
     * @static
     * @param {*} mockOrm
     * @memberof Context
     */
    public static setMockContext(mockOrm: any) {
        this.orm = mockOrm;
    }
    public static getContext() {
        return GamaContext.orm;
    }

}

export interface ITransaction {
    begin(): Promise<any>;
    commit(): Promise<any>;
    rollback(): Promise<any>;
    getDao(tableName: string): any;
}
