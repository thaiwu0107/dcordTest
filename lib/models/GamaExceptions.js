"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const GamaHttpStatusCode_1 = require("../config/GamaHttpStatusCode");
class GamaExceptions extends Error {
    constructor(status, msg) {
        super();
        this._TType = this.setType();
        if (msg instanceof GamaExceptions) {
            throw msg;
        }
        // gama-orm的底層錯誤處理
        if (!_.isUndefined(msg) && msg.name === 'RequestError') {
            msg = msg.message;
        }
        this.status = status;
        this.name = status ? status.toString() : '';
        this.message = msg ? { message: msg } : {
            message: _.isEmpty(GamaHttpStatusCode_1.GamaHttpStatusCode[status]) ?
                this._TType[status] :
                GamaHttpStatusCode_1.GamaHttpStatusCode[status]
        };
    }
}
exports.default = GamaExceptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtYUV4Y2VwdGlvbnMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dndHRvbzQ0L0Rlc2t0b3AvYmFzZUFQSS9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvR2FtYUV4Y2VwdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBNEI7QUFDNUIscUVBQWtFO0FBRWxFLG9CQUFnRCxTQUFRLEtBQUs7SUFLekQsWUFBWSxNQUE4QixFQUFFLEdBQWtCO1FBQzFELEtBQUssRUFBRSxDQUFDO1FBSEosV0FBTSxHQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUlqQyxJQUFJLEdBQUcsWUFBWSxjQUFjLEVBQUU7WUFDL0IsTUFBTSxHQUFHLENBQUM7U0FDYjtRQUNELGtCQUFrQjtRQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtZQUNwRCxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztTQUNyQjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHVDQUFrQixDQUFDLE1BQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLHVDQUFrQixDQUFDLE1BQWdCLENBQUM7U0FDM0MsQ0FBQztJQUNOLENBQUM7Q0FHSjtBQXhCRCxpQ0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBHYW1hSHR0cFN0YXR1c0NvZGUgfSBmcm9tICcuLi9jb25maWcvR2FtYUh0dHBTdGF0dXNDb2RlJztcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgR2FtYUV4Y2VwdGlvbnM8VD4gZXh0ZW5kcyBFcnJvciB7XG4gICAgcHVibGljIHN0YXR1czogR2FtYUh0dHBTdGF0dXNDb2RlIHwgVDtcbiAgICBwdWJsaWMgbWVzc2FnZTogYW55O1xuICAgIHByaXZhdGUgX1RUeXBlOiBhbnkgPSB0aGlzLnNldFR5cGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHN0YXR1czogR2FtYUh0dHBTdGF0dXNDb2RlIHwgVCwgbXNnPzogc3RyaW5nIHwgYW55KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChtc2cgaW5zdGFuY2VvZiBHYW1hRXhjZXB0aW9ucykge1xuICAgICAgICAgICAgdGhyb3cgbXNnO1xuICAgICAgICB9XG4gICAgICAgIC8vIGdhbWEtb3Jt55qE5bqV5bGk6Yyv6Kqk6JmV55CGXG4gICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChtc2cpICYmIG1zZy5uYW1lID09PSAnUmVxdWVzdEVycm9yJykge1xuICAgICAgICAgICAgbXNnID0gbXNnLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gICAgICAgIHRoaXMubmFtZSA9IHN0YXR1cyA/IHN0YXR1cy50b1N0cmluZygpIDogJyc7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1zZyA/IHsgbWVzc2FnZTogbXNnIH0gOiB7XG4gICAgICAgICAgICBtZXNzYWdlOiBfLmlzRW1wdHkoR2FtYUh0dHBTdGF0dXNDb2RlW3N0YXR1cyBhcyBudW1iZXJdKSA/XG4gICAgICAgICAgICAgICAgdGhpcy5fVFR5cGVbc3RhdHVzIGFzIG51bWJlcl0gOlxuICAgICAgICAgICAgICAgIEdhbWFIdHRwU3RhdHVzQ29kZVtzdGF0dXMgYXMgbnVtYmVyXVxuICAgICAgICB9O1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2V0VHlwZSgpOiBUO1xuXG59XG4iXX0=