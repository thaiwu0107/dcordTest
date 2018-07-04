import { Container, inject } from 'inversify';
import { autoProvide, provide } from 'inversify-binding-decorators';
import 'reflect-metadata';
declare const container: Container;
declare const provideNamed: (identifier: any, name: any) => (target: any) => any;
export { container, autoProvide, provide, provideNamed, inject };
