import * as _ from 'lodash';
import 'reflect-metadata';
import { inject, provide } from '../../ioc/ioc';
import BaseService from '../../models/BaseService';
import { LibsExceptions } from './../../models/LibsExceptions';
import Repository from './Repository';

@provide('TestService')
export default class Service extends BaseService {
    constructor(
        @inject('TestRepository') private repository: Repository) { super(); }

    public async test(ip: string): Promise<any> {
        const getip = await this.repository.getIP(ip);
        if (_.isNull(getip)) {
            await this.repository.setIP(ip, 1, 60);
            return { times: 1 };
        } else if (_.toNumber(getip) > 59) {
            throw new LibsExceptions(9001, 'ERROR');
        } else {
            const n = _.toNumber(getip) + 1;
            await this.repository.incr(ip);
            return { times: n };
        }
    }
}
