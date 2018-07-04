export enum EnumTracerconfigSetting {
    NoFilter,
    AllFilter,
    NoBaseFilter,
    NoRepositoryFilter,
    NoControllerFilter,
    NoServicFilter
}
export function getEnumTracerconfigSetting(id: EnumTracerconfigSetting): string[] | undefined {
    switch (id) {
        default:
        case EnumTracerconfigSetting.NoFilter:
            return noFilter;
        case EnumTracerconfigSetting.NoBaseFilter:
            return noBaseFilter;
        case EnumTracerconfigSetting.NoRepositoryFilter:
            return noRepositoryFilter;
        case EnumTracerconfigSetting.NoControllerFilter:
            return noControllerFilter;
        case EnumTracerconfigSetting.NoServicFilter:
            return noServicFilter;
    }
}
// NOTE: 第一個*是class,第二個*是方法
// NOTE: 加上!就是不要,*前後就是關鍵字
const noFilter = [
    '*:*',
    '!Context*:*',
    '!SQLManager*:getDao*',
    '!SQLManager*:getDBCurrent***'
];
const allFilter = [
    '!*Repository:*',
    '!*Controller:*',
    '!Base*:*',
    '!*Servic:*'];
const noBaseFilter = [
    '*Repository:*',
    '*Controller:*',
    '!Base*:*',
    '*Servic:*'];
const noRepositoryFilter = [
    '*Repository:find*',
    '*Repository:add*',
    '*Repository:change*',
    '*Repository:delete*',
    '!*Controller:*',
    '!Base*:*',
    '!*Servic:*'];
const noControllerFilter = [
    '!*Repository:*',
    '*Controller:*',
    '!Base*:*',
    '!*Servic:*'];
const noServicFilter = [
    '!*Repository:*',
    '!*Controller:*',
    '!Base*:*',
    '*Servic:*'];
