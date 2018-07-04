import 'reflect-metadata';
export default interface IServerInitOnceEvent {
    init(): any;
    doOnce(): any;
    end(): any;
}
