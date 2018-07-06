import 'reflect-metadata';
import { provide } from '../../ioc/ioc';
import BaseRepository from '../../models/BaseRepository';

@provide('TestRepository')
export default class Repository extends BaseRepository {
    public async getIP(k: string): Promise<any> {
        return this.redisManger.get(k);
    }
    public async setIP(k: string, v: any, ex?: number): Promise<any> {
        return this.redisManger.set(k, v, ex);
    }
    public async incr(k: string): Promise<any> {
        return this.redisManger.incr(k);
    }
}
