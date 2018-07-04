declare const _default: {
    appenders: {
        out: {
            type: string;
            layout: {
                type: string;
                pattern: string;
            };
        };
        app: {
            type: string;
            pattern: string;
            daysToKeep: number;
            keepFileExt: boolean;
            filename: string;
        };
        request: {
            type: string;
            pattern: string;
            daysToKeep: number;
            keepFileExt: boolean;
            filename: string;
        };
        errorFile: {
            type: string;
            pattern: string;
            daysToKeep: number;
            keepFileExt: boolean;
            filename: string;
        };
        error: {
            type: string;
            appender: string;
            level: string;
        };
    };
    categories: {
        default: {
            appenders: string[];
            level: string;
        };
        request: {
            appenders: string[];
            level: string;
        };
        error: {
            appenders: string[];
            level: string;
        };
    };
    replaceConsole: boolean;
};
export default _default;
