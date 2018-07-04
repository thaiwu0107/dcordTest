"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocChanged_1 = require("./DocChanged");
const IGamaResponse_1 = require("./IGamaResponse");
const NotImplemented_1 = require("./NotImplemented");
class GamaResponse extends IGamaResponse_1.default {
    constructor(response) {
        super();
        if (response instanceof NotImplemented_1.default || response instanceof DocChanged_1.default) {
            this.$status = response.status;
            this.$result = response.message;
        }
        else {
            this.$result = response;
        }
    }
    set $result(value) {
        this.result = value; // Utils.deeplyToCamelCase
    }
    get $result() {
        return this.result;
    }
}
exports.default = GamaResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2FtYVJlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nZ3R0b280NC9EZXNrdG9wL2Jhc2VBUEkvc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzL0dhbWFSZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUFzQztBQUN0QyxtREFBNEM7QUFDNUMscURBQThDO0FBRTlDLGtCQUFrQyxTQUFRLHVCQUFhO0lBR25ELFlBQVksUUFBYTtRQUNyQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksUUFBUSxZQUFZLHdCQUFjLElBQUksUUFBUSxZQUFZLG9CQUFVLEVBQUU7WUFDdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztTQUNuQzthQUFNO1lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsS0FBVTtRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLDBCQUEwQjtJQUNuRCxDQUFDO0lBQ0QsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQW5CRCwrQkFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG9jQ2hhbmdlZCBmcm9tICcuL0RvY0NoYW5nZWQnO1xuaW1wb3J0IElHYW1hUmVzcG9uc2UgZnJvbSAnLi9JR2FtYVJlc3BvbnNlJztcbmltcG9ydCBOb3RJbXBsZW1lbnRlZCBmcm9tICcuL05vdEltcGxlbWVudGVkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtYVJlc3BvbnNlIGV4dGVuZHMgSUdhbWFSZXNwb25zZSB7XG4gICAgcHJpdmF0ZSByZXN1bHQ6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHJlc3BvbnNlOiBhbnkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKHJlc3BvbnNlIGluc3RhbmNlb2YgTm90SW1wbGVtZW50ZWQgfHwgcmVzcG9uc2UgaW5zdGFuY2VvZiBEb2NDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLiRzdGF0dXMgPSByZXNwb25zZS5zdGF0dXM7XG4gICAgICAgICAgICB0aGlzLiRyZXN1bHQgPSByZXNwb25zZS5tZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kcmVzdWx0ID0gcmVzcG9uc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0ICRyZXN1bHQodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLnJlc3VsdCA9IHZhbHVlOyAvLyBVdGlscy5kZWVwbHlUb0NhbWVsQ2FzZVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0ICRyZXN1bHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICB9XG59XG4iXX0=