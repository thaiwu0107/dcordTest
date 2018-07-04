export default abstract class GamaEntity {
    protected abstract getList(): string[];
    private gamaEntityDbName;
    private gamaEntitytableName;
    getGamaEntityDbName(): string;
    protected setGamaEntityDbName(name: string): void;
    getGamaEntitytableName(): string;
    protected setGamaEntitytableName(name: string): void;
    /**
     * Creates an instance of GamaEntity.
     * @param {*} [source] 自動對應k-v,
     * @param {boolean} [isVaild] 盡量不要在這裡同步驗證,使用非同步vaild驗證比較好(才不會阻塞event loop線程)
     * @memberof GamaEntity
     */
    constructor(source?: any, isVaild?: boolean);
    private listAllProperties;
    toJSON(): any;
    fields(): string[];
    vaild(): Promise<void>;
    private validateSync;
}
