import 'reflect-metadata';
export declare class GamaContext {
    context: any;
    static orm: any;
    constructor();
    getBean(name: string): any;
    getConnectionNames(): string[];
    static getConnectionNames(): string[];
    static init(pathdb: any, pathBeansPath: any): Promise<any>;
    static getBean(name: string): any;
    /**
     * 注意!!這是為了Mock注入的hook,單純為了注入依賴,非常規使用
     * 請不要隨意使用這個方法
     * @static
     * @param {*} mockOrm
     * @memberof Context
     */
    static setMockContext(mockOrm: any): void;
    static getContext(): any;
}
export interface ITransaction {
    begin(): Promise<any>;
    commit(): Promise<any>;
    rollback(): Promise<any>;
    getDao(tableName: string): any;
}
