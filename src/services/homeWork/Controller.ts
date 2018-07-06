import { controller, httpGet, TYPE } from 'inversify-koa-utils';
import * as _ from 'lodash';
import { inject, provideNamed } from '../../ioc/ioc';
import BaseController from '../../models/BaseController';
import BaseResponse from '../../models/BaseResponse';
import IContext from '../../models/IContext';
import Service from './Service';
@provideNamed(TYPE.Controller, 'TestController')
@controller('/test')
export default class TestController extends BaseController {
    constructor(
        @inject('TestService') private service: Service) { super(); }

    @httpGet('/')
    public async test(ctx: IContext) {
        let withoutHttpsIP = _.replace(ctx.request.header.origin, 'http://', '');
        withoutHttpsIP = _.replace(ctx.request.header.origin, 'https://', '');
        const ip = _.split(withoutHttpsIP, ':', 1)[0];
        ctx.body = new BaseResponse(await this.service.test(ip));
    }
}
