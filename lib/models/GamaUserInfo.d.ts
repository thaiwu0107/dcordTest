import GamaEntity from '../models/GamaEntity';
export default class GamaUserInfo extends GamaEntity {
    protected getList(): string[];
    private _operatorSerial;
    private _operatorName;
    private _groupSerial;
    private _status;
    private _loginFail;
    private _lastPWChangedTime;
    private _workstationID;
    private _actionSection;
    private _sessionSerial;
    private _isSessionOpen;
    operatorSerial: number;
    operatorName: string;
    groupSerial: number;
    status: number;
    loginFail: number;
    lastPWChangedTime: string;
    workstationID: number;
    actionSection: string;
    sessionSerial: number;
    readonly isSessionOpen: boolean;
}
