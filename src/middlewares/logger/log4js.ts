import * as log4js from 'koa-log4';
import * as _ from 'lodash';
import log4jsConfig from '../../config/config.log4js';

// configure log4js
log4js.configure(log4jsConfig);

const DEFAULT_FORMAT = '[:response-time ms] :userid - ' +
    ':remote-addr - -' +
    ' ":method :url HTTP/:http-version"' +
    ' :status :content-length ":referrer"' +
    ' ":user-agent"';
const koaLog4jsOptions = {
    level: 'auto',
    format: DEFAULT_FORMAT,
    tokens: [{
        token: ':userid', content: (ctx) => {
            return getAuthUser(ctx.state);
        }
    }]
};

export default () => {
    const logger = log4js.getLogger('request');
    return log4js.koaLogger(logger, koaLog4jsOptions);
};

function getLogger(name: string) {
    const logger = log4js.getLogger(name);
    // logger.addContext('user', 'Mike'); // TODO : how to get ctx.state.user ??
    return logger;
}

function getAuthUser(token) {
    if (token && !_.isUndefined(token.user)) {
        return token.user.operatorName;
    } else {
        return 'anonymity';
    }
}

export { getLogger };
