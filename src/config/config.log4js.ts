import * as path from 'path';

export default {
    appenders: {
        out: {
            type: 'console',
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy/MM/dd hh:mm:ss.SSS}][%[%p%]] -> [%[%c%]]%n%[%m%]%n'
            }
        },
        app: {
            type: 'dateFile',
            pattern: '.yyyy-MM-dd',
            daysToKeep: 10,
            keepFileExt: true,
            filename: path.join(__dirname, '..', 'logs', 'Console.log')
        },
        request: {
            type: 'dateFile',
            pattern: '.yyyy-MM-dd',
            daysToKeep: 10,
            keepFileExt: true,
            filename: path.join(__dirname, '..', 'logs', 'Access.log')
        },
        errorFile: {
            type: 'dateFile',
            pattern: '.yyyy-MM-dd',
            daysToKeep: 10,
            keepFileExt: true,
            filename: path.join(__dirname, '..', 'logs', 'Error.log')
        },
        error: {
            type: 'logLevelFilter', appender: 'errorFile', level: 'error'
        }

    },
    categories: {
        default: { appenders: ['out', 'app', 'error'], level: 'debug' },
        request: { appenders: ['out', 'app', 'request'], level: 'info' },
        error: { appenders: ['errorFile'], level: 'error' }

    },
    replaceConsole: true
};
