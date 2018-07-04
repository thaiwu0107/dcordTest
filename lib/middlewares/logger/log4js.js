"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("koa-log4");
const _ = require("lodash");
const config_log4js_1 = require("../../config/config.log4js");
// configure log4js
log4js.configure(config_log4js_1.default);
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
exports.default = () => {
    const logger = log4js.getLogger('request');
    return log4js.koaLogger(logger, koaLog4jsOptions);
};
function getLogger(name) {
    const logger = log4js.getLogger(name);
    // logger.addContext('user', 'Mike'); // TODO : how to get ctx.state.user ??
    return logger;
}
exports.getLogger = getLogger;
function getAuthUser(token) {
    if (token && !_.isUndefined(token.user)) {
        return token.user.operatorName;
    }
    else {
        return 'anonymity';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nNGpzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nZ3R0b280NC9EZXNrdG9wL2Jhc2VBUEkvc3JjLyIsInNvdXJjZXMiOlsibWlkZGxld2FyZXMvbG9nZ2VyL2xvZzRqcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyw0QkFBNEI7QUFDNUIsOERBQXNEO0FBRXRELG1CQUFtQjtBQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDLHVCQUFZLENBQUMsQ0FBQztBQUUvQixNQUFNLGNBQWMsR0FBRyxnQ0FBZ0M7SUFDbkQsa0JBQWtCO0lBQ2xCLG9DQUFvQztJQUNwQyxzQ0FBc0M7SUFDdEMsZ0JBQWdCLENBQUM7QUFDckIsTUFBTSxnQkFBZ0IsR0FBRztJQUNyQixLQUFLLEVBQUUsTUFBTTtJQUNiLE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE1BQU0sRUFBRSxDQUFDO1lBQ0wsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDL0IsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLENBQUM7U0FDSixDQUFDO0NBQ0wsQ0FBQztBQUVGLGtCQUFlLEdBQUcsRUFBRTtJQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUM7QUFFRixtQkFBbUIsSUFBWTtJQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLDRFQUE0RTtJQUM1RSxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBVVEsOEJBQVM7QUFSbEIscUJBQXFCLEtBQUs7SUFDdEIsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNyQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQ2xDO1NBQU07UUFDSCxPQUFPLFdBQVcsQ0FBQztLQUN0QjtBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsb2c0anMgZnJvbSAna29hLWxvZzQnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZzRqc0NvbmZpZyBmcm9tICcuLi8uLi9jb25maWcvY29uZmlnLmxvZzRqcyc7XG5cbi8vIGNvbmZpZ3VyZSBsb2c0anNcbmxvZzRqcy5jb25maWd1cmUobG9nNGpzQ29uZmlnKTtcblxuY29uc3QgREVGQVVMVF9GT1JNQVQgPSAnWzpyZXNwb25zZS10aW1lIG1zXSA6dXNlcmlkIC0gJyArXG4gICAgJzpyZW1vdGUtYWRkciAtIC0nICtcbiAgICAnIFwiOm1ldGhvZCA6dXJsIEhUVFAvOmh0dHAtdmVyc2lvblwiJyArXG4gICAgJyA6c3RhdHVzIDpjb250ZW50LWxlbmd0aCBcIjpyZWZlcnJlclwiJyArXG4gICAgJyBcIjp1c2VyLWFnZW50XCInO1xuY29uc3Qga29hTG9nNGpzT3B0aW9ucyA9IHtcbiAgICBsZXZlbDogJ2F1dG8nLFxuICAgIGZvcm1hdDogREVGQVVMVF9GT1JNQVQsXG4gICAgdG9rZW5zOiBbe1xuICAgICAgICB0b2tlbjogJzp1c2VyaWQnLCBjb250ZW50OiAoY3R4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0QXV0aFVzZXIoY3R4LnN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1dXG59O1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICAgY29uc3QgbG9nZ2VyID0gbG9nNGpzLmdldExvZ2dlcigncmVxdWVzdCcpO1xuICAgIHJldHVybiBsb2c0anMua29hTG9nZ2VyKGxvZ2dlciwga29hTG9nNGpzT3B0aW9ucyk7XG59O1xuXG5mdW5jdGlvbiBnZXRMb2dnZXIobmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgbG9nZ2VyID0gbG9nNGpzLmdldExvZ2dlcihuYW1lKTtcbiAgICAvLyBsb2dnZXIuYWRkQ29udGV4dCgndXNlcicsICdNaWtlJyk7IC8vIFRPRE8gOiBob3cgdG8gZ2V0IGN0eC5zdGF0ZS51c2VyID8/XG4gICAgcmV0dXJuIGxvZ2dlcjtcbn1cblxuZnVuY3Rpb24gZ2V0QXV0aFVzZXIodG9rZW4pIHtcbiAgICBpZiAodG9rZW4gJiYgIV8uaXNVbmRlZmluZWQodG9rZW4udXNlcikpIHtcbiAgICAgICAgcmV0dXJuIHRva2VuLnVzZXIub3BlcmF0b3JOYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnYW5vbnltaXR5JztcbiAgICB9XG59XG5cbmV4cG9ydCB7IGdldExvZ2dlciB9O1xuIl19