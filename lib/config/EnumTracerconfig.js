"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnumTracerconfigSetting;
(function (EnumTracerconfigSetting) {
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoFilter"] = 0] = "NoFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["AllFilter"] = 1] = "AllFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoBaseFilter"] = 2] = "NoBaseFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoRepositoryFilter"] = 3] = "NoRepositoryFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoControllerFilter"] = 4] = "NoControllerFilter";
    EnumTracerconfigSetting[EnumTracerconfigSetting["NoServicFilter"] = 5] = "NoServicFilter";
})(EnumTracerconfigSetting = exports.EnumTracerconfigSetting || (exports.EnumTracerconfigSetting = {}));
function getEnumTracerconfigSetting(id) {
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
exports.getEnumTracerconfigSetting = getEnumTracerconfigSetting;
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
    '!*Servic:*'
];
const noBaseFilter = [
    '*Repository:*',
    '*Controller:*',
    '!Base*:*',
    '*Servic:*'
];
const noRepositoryFilter = [
    '*Repository:find*',
    '*Repository:add*',
    '*Repository:change*',
    '*Repository:delete*',
    '!*Controller:*',
    '!Base*:*',
    '!*Servic:*'
];
const noControllerFilter = [
    '!*Repository:*',
    '*Controller:*',
    '!Base*:*',
    '!*Servic:*'
];
const noServicFilter = [
    '!*Repository:*',
    '!*Controller:*',
    '!Base*:*',
    '*Servic:*'
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW51bVRyYWNlcmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2d0dG9vNDQvRGVza3RvcC9iYXNlQVBJL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9FbnVtVHJhY2VyY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBWSx1QkFPWDtBQVBELFdBQVksdUJBQXVCO0lBQy9CLDZFQUFRLENBQUE7SUFDUiwrRUFBUyxDQUFBO0lBQ1QscUZBQVksQ0FBQTtJQUNaLGlHQUFrQixDQUFBO0lBQ2xCLGlHQUFrQixDQUFBO0lBQ2xCLHlGQUFjLENBQUE7QUFDbEIsQ0FBQyxFQVBXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBT2xDO0FBQ0Qsb0NBQTJDLEVBQTJCO0lBQ2xFLFFBQVEsRUFBRSxFQUFFO1FBQ1IsUUFBUTtRQUNSLEtBQUssdUJBQXVCLENBQUMsUUFBUTtZQUNqQyxPQUFPLFFBQVEsQ0FBQztRQUNwQixLQUFLLHVCQUF1QixDQUFDLFlBQVk7WUFDckMsT0FBTyxZQUFZLENBQUM7UUFDeEIsS0FBSyx1QkFBdUIsQ0FBQyxrQkFBa0I7WUFDM0MsT0FBTyxrQkFBa0IsQ0FBQztRQUM5QixLQUFLLHVCQUF1QixDQUFDLGtCQUFrQjtZQUMzQyxPQUFPLGtCQUFrQixDQUFDO1FBQzlCLEtBQUssdUJBQXVCLENBQUMsY0FBYztZQUN2QyxPQUFPLGNBQWMsQ0FBQztLQUM3QjtBQUNMLENBQUM7QUFkRCxnRUFjQztBQUNELDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekIsTUFBTSxRQUFRLEdBQUc7SUFDYixLQUFLO0lBQ0wsYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qiw4QkFBOEI7Q0FDakMsQ0FBQztBQUNGLE1BQU0sU0FBUyxHQUFHO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsWUFBWTtDQUFDLENBQUM7QUFDbEIsTUFBTSxZQUFZLEdBQUc7SUFDakIsZUFBZTtJQUNmLGVBQWU7SUFDZixVQUFVO0lBQ1YsV0FBVztDQUFDLENBQUM7QUFDakIsTUFBTSxrQkFBa0IsR0FBRztJQUN2QixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVixZQUFZO0NBQUMsQ0FBQztBQUNsQixNQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsVUFBVTtJQUNWLFlBQVk7Q0FBQyxDQUFDO0FBQ2xCLE1BQU0sY0FBYyxHQUFHO0lBQ25CLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLFdBQVc7Q0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gRW51bVRyYWNlcmNvbmZpZ1NldHRpbmcge1xuICAgIE5vRmlsdGVyLFxuICAgIEFsbEZpbHRlcixcbiAgICBOb0Jhc2VGaWx0ZXIsXG4gICAgTm9SZXBvc2l0b3J5RmlsdGVyLFxuICAgIE5vQ29udHJvbGxlckZpbHRlcixcbiAgICBOb1NlcnZpY0ZpbHRlclxufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudW1UcmFjZXJjb25maWdTZXR0aW5nKGlkOiBFbnVtVHJhY2VyY29uZmlnU2V0dGluZyk6IHN0cmluZ1tdIHwgdW5kZWZpbmVkIHtcbiAgICBzd2l0Y2ggKGlkKSB7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNhc2UgRW51bVRyYWNlcmNvbmZpZ1NldHRpbmcuTm9GaWx0ZXI6XG4gICAgICAgICAgICByZXR1cm4gbm9GaWx0ZXI7XG4gICAgICAgIGNhc2UgRW51bVRyYWNlcmNvbmZpZ1NldHRpbmcuTm9CYXNlRmlsdGVyOlxuICAgICAgICAgICAgcmV0dXJuIG5vQmFzZUZpbHRlcjtcbiAgICAgICAgY2FzZSBFbnVtVHJhY2VyY29uZmlnU2V0dGluZy5Ob1JlcG9zaXRvcnlGaWx0ZXI6XG4gICAgICAgICAgICByZXR1cm4gbm9SZXBvc2l0b3J5RmlsdGVyO1xuICAgICAgICBjYXNlIEVudW1UcmFjZXJjb25maWdTZXR0aW5nLk5vQ29udHJvbGxlckZpbHRlcjpcbiAgICAgICAgICAgIHJldHVybiBub0NvbnRyb2xsZXJGaWx0ZXI7XG4gICAgICAgIGNhc2UgRW51bVRyYWNlcmNvbmZpZ1NldHRpbmcuTm9TZXJ2aWNGaWx0ZXI6XG4gICAgICAgICAgICByZXR1cm4gbm9TZXJ2aWNGaWx0ZXI7XG4gICAgfVxufVxuLy8gTk9URTog56ys5LiA5YCLKuaYr2NsYXNzLOesrOS6jOWAiyrmmK/mlrnms5Vcbi8vIE5PVEU6IOWKoOS4iiHlsLHmmK/kuI3opoEsKuWJjeW+jOWwseaYr+mXnOmNteWtl1xuY29uc3Qgbm9GaWx0ZXIgPSBbXG4gICAgJyo6KicsXG4gICAgJyFDb250ZXh0KjoqJyxcbiAgICAnIVNRTE1hbmFnZXIqOmdldERhbyonLFxuICAgICchU1FMTWFuYWdlcio6Z2V0REJDdXJyZW50KioqJ1xuXTtcbmNvbnN0IGFsbEZpbHRlciA9IFtcbiAgICAnISpSZXBvc2l0b3J5OionLFxuICAgICchKkNvbnRyb2xsZXI6KicsXG4gICAgJyFCYXNlKjoqJyxcbiAgICAnISpTZXJ2aWM6KiddO1xuY29uc3Qgbm9CYXNlRmlsdGVyID0gW1xuICAgICcqUmVwb3NpdG9yeToqJyxcbiAgICAnKkNvbnRyb2xsZXI6KicsXG4gICAgJyFCYXNlKjoqJyxcbiAgICAnKlNlcnZpYzoqJ107XG5jb25zdCBub1JlcG9zaXRvcnlGaWx0ZXIgPSBbXG4gICAgJypSZXBvc2l0b3J5OmZpbmQqJyxcbiAgICAnKlJlcG9zaXRvcnk6YWRkKicsXG4gICAgJypSZXBvc2l0b3J5OmNoYW5nZSonLFxuICAgICcqUmVwb3NpdG9yeTpkZWxldGUqJyxcbiAgICAnISpDb250cm9sbGVyOionLFxuICAgICchQmFzZSo6KicsXG4gICAgJyEqU2VydmljOionXTtcbmNvbnN0IG5vQ29udHJvbGxlckZpbHRlciA9IFtcbiAgICAnISpSZXBvc2l0b3J5OionLFxuICAgICcqQ29udHJvbGxlcjoqJyxcbiAgICAnIUJhc2UqOionLFxuICAgICchKlNlcnZpYzoqJ107XG5jb25zdCBub1NlcnZpY0ZpbHRlciA9IFtcbiAgICAnISpSZXBvc2l0b3J5OionLFxuICAgICchKkNvbnRyb2xsZXI6KicsXG4gICAgJyFCYXNlKjoqJyxcbiAgICAnKlNlcnZpYzoqJ107XG4iXX0=