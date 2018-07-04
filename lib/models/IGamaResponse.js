"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GamaHttpStatusCode_1 = require("../config/GamaHttpStatusCode");
class IGamaResponse {
    constructor() {
        this.status = GamaHttpStatusCode_1.GamaHttpStatusCode.STATUS_OK;
    }
    set $status(value) {
        this.status = value;
    }
    get $status() {
        return this.status;
    }
}
exports.default = IGamaResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUdhbWFSZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2d0dG9vNDQvRGVza3RvcC9iYXNlQVBJL3NyYy8iLCJzb3VyY2VzIjpbIm1vZGVscy9JR2FtYVJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBQWtFO0FBRWxFO0lBQUE7UUFDYyxXQUFNLEdBQXVCLHVDQUFrQixDQUFDLFNBQVMsQ0FBQztJQVF4RSxDQUFDO0lBTkcsSUFBVyxPQUFPLENBQUMsS0FBeUI7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFURCxnQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdhbWFIdHRwU3RhdHVzQ29kZSB9IGZyb20gJy4uL2NvbmZpZy9HYW1hSHR0cFN0YXR1c0NvZGUnO1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBJR2FtYVJlc3BvbnNlIHtcbiAgICBwcm90ZWN0ZWQgc3RhdHVzOiBHYW1hSHR0cFN0YXR1c0NvZGUgPSBHYW1hSHR0cFN0YXR1c0NvZGUuU1RBVFVTX09LO1xuXG4gICAgcHVibGljIHNldCAkc3RhdHVzKHZhbHVlOiBHYW1hSHR0cFN0YXR1c0NvZGUpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSB2YWx1ZTtcbiAgICB9XG4gICAgcHVibGljIGdldCAkc3RhdHVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0dXM7XG4gICAgfVxufVxuIl19