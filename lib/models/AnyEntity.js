"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const GamaHttpStatusCode_1 = require("../config/GamaHttpStatusCode");
const LibsExceptions_1 = require("./LibsExceptions");
class AnyEntity {
    toObj(keys, values) {
        if (Array.isArray(keys)) {
            if (keys.length !== values.length) {
                throw new LibsExceptions_1.LibsExceptions(GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_FAIL, 'keys 跟 values 長度不一致');
            }
            keys.forEach((key, i, arr) => {
                this[key] = values[i];
            });
        }
        else {
            this[keys] = values;
        }
        return _.omit(_.omitBy(this, _.isUndefined), 'toObj');
    }
}
exports.default = AnyEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW55RW50aXR5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nZ3R0b280NC9EZXNrdG9wL2Jhc2VBUEkvc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzL0FueUVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRCQUE0QjtBQUM1QixxRUFBa0U7QUFFbEUscURBQWtEO0FBQ2xEO0lBQ1csS0FBSyxDQUFDLElBQXVCLEVBQUUsTUFBbUI7UUFDckQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUMvQixNQUFNLElBQUksK0JBQWMsQ0FBQyx1Q0FBa0IsQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUMsQ0FBQzthQUNuRjtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7U0FDdkI7UUFDRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sQ0FBUSxDQUFDO0lBQ2pFLENBQUM7Q0FDSjtBQWRELDRCQWNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgR2FtYUh0dHBTdGF0dXNDb2RlIH0gZnJvbSAnLi4vY29uZmlnL0dhbWFIdHRwU3RhdHVzQ29kZSc7XG5pbXBvcnQgR2FtYUV4Y2VwdGlvbnMgZnJvbSAnLi4vbW9kZWxzL0dhbWFFeGNlcHRpb25zJztcbmltcG9ydCB7IExpYnNFeGNlcHRpb25zIH0gZnJvbSAnLi9MaWJzRXhjZXB0aW9ucyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbnlFbnRpdHkge1xuICAgIHB1YmxpYyB0b09iaihrZXlzOiBzdHJpbmcgfCBzdHJpbmdbXSwgdmFsdWVzOiBhbnkgfCBhbnlbXSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXlzKSkge1xuICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoICE9PSB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IExpYnNFeGNlcHRpb25zKEdhbWFIdHRwU3RhdHVzQ29kZS5TVEFUVVNfRkFJTCwgJ2tleXMg6LefIHZhbHVlcyDplbfluqbkuI3kuIDoh7QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleXMuZm9yRWFjaCgoa2V5LCBpLCBhcnIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZXNbaV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXNba2V5c10gPSB2YWx1ZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF8ub21pdChfLm9taXRCeSh0aGlzLCBfLmlzVW5kZWZpbmVkKSwgJ3RvT2JqJykgYXMgYW55O1xuICAgIH1cbn1cbiJdfQ==