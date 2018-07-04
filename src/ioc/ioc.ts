import { Container, inject } from 'inversify';
import { autoProvide, buildProviderModule, fluentProvide, provide } from 'inversify-binding-decorators';
import { interfaces, InversifyKoaServer, TYPE } from 'inversify-koa-utils';
import 'reflect-metadata';

import * as log4js from 'koa-log4';
import * as _ from 'lodash';

// set up container
const container = new Container();
const provideNamed = (identifier, name) => {
    return fluentProvide(identifier)
        .inSingletonScope()
        .whenTargetNamed(name)
        .done(true);
};
export { container, autoProvide, provide, provideNamed, inject };
