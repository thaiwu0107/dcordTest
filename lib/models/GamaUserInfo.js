"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const GamaEntity_1 = require("../models/GamaEntity");
class GamaUserInfo extends GamaEntity_1.default {
    getList() {
        return [
            'operatorSerial',
            'operatorName',
            'groupSerial',
            'groupSerial',
            'status',
            'loginFail',
            'lastPWChangedTime',
            'workstationID',
            'actionSection',
            'sessionSerial'
        ];
    }
    set operatorSerial(value) {
        this._operatorSerial = value;
    }
    get operatorSerial() {
        return this._operatorSerial;
    }
    set operatorName(value) {
        this._operatorName = value;
    }
    get operatorName() {
        return this._operatorName;
    }
    set groupSerial(value) {
        this._groupSerial = value;
    }
    get groupSerial() {
        return this._groupSerial;
    }
    set status(value) {
        this._status = value;
    }
    get status() {
        return this._status;
    }
    set loginFail(value) {
        this._loginFail = value;
    }
    get loginFail() {
        return this._loginFail;
    }
    set lastPWChangedTime(value) {
        this._lastPWChangedTime = value;
    }
    get lastPWChangedTime() {
        return this._lastPWChangedTime;
    }
    set workstationID(value) {
        this._workstationID = value;
    }
    get workstationID() {
        return this._workstationID;
    }
    set actionSection(value) {
        this._actionSection = value;
    }
    get actionSection() {
        return this._actionSection;
    }
    set sessionSerial(value) {
        this._isSessionOpen = _.isUndefined(value) ? false : true;
        this._sessionSerial = value;
    }
    get sessionSerial() {
        return this._sessionSerial;
    }
    get isSessionOpen() {
        return this._isSessionOpen;
    }
}
exports.default = GamaUserInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtYVVzZXJJbmZvLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nZ3R0b280NC9EZXNrdG9wL2Jhc2VBUEkvc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzL0dhbWFVc2VySW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRCQUE0QjtBQUM1QixxREFBOEM7QUFDOUMsa0JBQWtDLFNBQVEsb0JBQVU7SUFDdEMsT0FBTztRQUNiLE9BQU87WUFDSCxnQkFBZ0I7WUFDaEIsY0FBYztZQUNkLGFBQWE7WUFDYixhQUFhO1lBQ2IsUUFBUTtZQUNSLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsZUFBZTtZQUNmLGVBQWU7WUFDZixlQUFlO1NBQ2xCLENBQUM7SUFDTixDQUFDO0lBWUQsSUFBVyxjQUFjLENBQUMsS0FBYTtRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBQ0QsSUFBVyxjQUFjO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBVyxZQUFZLENBQUMsS0FBYTtRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFBVyxZQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBVyxXQUFXLENBQUMsS0FBYTtRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBVyxNQUFNLENBQUMsS0FBYTtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBQ0QsSUFBVyxNQUFNO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFXLFNBQVMsQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFXLFNBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFXLGlCQUFpQixDQUFDLEtBQWE7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBQ0QsSUFBVyxpQkFBaUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUM7SUFDbkMsQ0FBQztJQUNELElBQVcsYUFBYSxDQUFDLEtBQWE7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQVcsYUFBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQVcsYUFBYSxDQUFDLEtBQWE7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQVcsYUFBYTtRQUNwQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQVcsYUFBYSxDQUFDLEtBQWE7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUMxRCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBQ0QsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFBVyxhQUFhO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0NBQ0o7QUFwRkQsK0JBb0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEdhbWFFbnRpdHkgZnJvbSAnLi4vbW9kZWxzL0dhbWFFbnRpdHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtYVVzZXJJbmZvIGV4dGVuZHMgR2FtYUVudGl0eSB7XG4gICAgcHJvdGVjdGVkIGdldExpc3QoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJ29wZXJhdG9yU2VyaWFsJyxcbiAgICAgICAgICAgICdvcGVyYXRvck5hbWUnLFxuICAgICAgICAgICAgJ2dyb3VwU2VyaWFsJyxcbiAgICAgICAgICAgICdncm91cFNlcmlhbCcsXG4gICAgICAgICAgICAnc3RhdHVzJyxcbiAgICAgICAgICAgICdsb2dpbkZhaWwnLFxuICAgICAgICAgICAgJ2xhc3RQV0NoYW5nZWRUaW1lJyxcbiAgICAgICAgICAgICd3b3Jrc3RhdGlvbklEJyxcbiAgICAgICAgICAgICdhY3Rpb25TZWN0aW9uJyxcbiAgICAgICAgICAgICdzZXNzaW9uU2VyaWFsJ1xuICAgICAgICBdO1xuICAgIH1cbiAgICBwcml2YXRlIF9vcGVyYXRvclNlcmlhbDogbnVtYmVyO1xuICAgIHByaXZhdGUgX29wZXJhdG9yTmFtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgX2dyb3VwU2VyaWFsOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfc3RhdHVzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbG9naW5GYWlsOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfbGFzdFBXQ2hhbmdlZFRpbWU6IHN0cmluZztcbiAgICBwcml2YXRlIF93b3Jrc3RhdGlvbklEOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYWN0aW9uU2VjdGlvbjogc3RyaW5nO1xuICAgIHByaXZhdGUgX3Nlc3Npb25TZXJpYWw6IG51bWJlcjtcbiAgICBwcml2YXRlIF9pc1Nlc3Npb25PcGVuOiBib29sZWFuO1xuXG4gICAgcHVibGljIHNldCBvcGVyYXRvclNlcmlhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX29wZXJhdG9yU2VyaWFsID0gdmFsdWU7XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgb3BlcmF0b3JTZXJpYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVyYXRvclNlcmlhbDtcbiAgICB9XG4gICAgcHVibGljIHNldCBvcGVyYXRvck5hbWUodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9vcGVyYXRvck5hbWUgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHVibGljIGdldCBvcGVyYXRvck5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVyYXRvck5hbWU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgZ3JvdXBTZXJpYWwodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9ncm91cFNlcmlhbCA9IHZhbHVlO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGdyb3VwU2VyaWFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBTZXJpYWw7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgc3RhdHVzKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gdmFsdWU7XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgc3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGxvZ2luRmFpbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2xvZ2luRmFpbCA9IHZhbHVlO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGxvZ2luRmFpbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvZ2luRmFpbDtcbiAgICB9XG4gICAgcHVibGljIHNldCBsYXN0UFdDaGFuZ2VkVGltZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xhc3RQV0NoYW5nZWRUaW1lID0gdmFsdWU7XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgbGFzdFBXQ2hhbmdlZFRpbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0UFdDaGFuZ2VkVGltZTtcbiAgICB9XG4gICAgcHVibGljIHNldCB3b3Jrc3RhdGlvbklEKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fd29ya3N0YXRpb25JRCA9IHZhbHVlO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IHdvcmtzdGF0aW9uSUQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93b3Jrc3RhdGlvbklEO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGFjdGlvblNlY3Rpb24odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9hY3Rpb25TZWN0aW9uID0gdmFsdWU7XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgYWN0aW9uU2VjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvblNlY3Rpb247XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgc2Vzc2lvblNlcmlhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2lzU2Vzc2lvbk9wZW4gPSBfLmlzVW5kZWZpbmVkKHZhbHVlKSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2Vzc2lvblNlcmlhbCA9IHZhbHVlO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IHNlc3Npb25TZXJpYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXNzaW9uU2VyaWFsO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGlzU2Vzc2lvbk9wZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Nlc3Npb25PcGVuO1xuICAgIH1cbn1cbiJdfQ==