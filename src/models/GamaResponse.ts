import DocChanged from './DocChanged';
import IGamaResponse from './IGamaResponse';
import NotImplemented from './NotImplemented';

export default class GamaResponse extends IGamaResponse {
    private result: any;

    constructor(response: any) {
        super();
        if (response instanceof NotImplemented || response instanceof DocChanged) {
            this.$status = response.status;
            this.$result = response.message;
        } else {
            this.$result = response;
        }
    }

    public set $result(value: any) {
        this.result = value; // Utils.deeplyToCamelCase
    }
    public get $result() {
        return this.result;
    }
}
