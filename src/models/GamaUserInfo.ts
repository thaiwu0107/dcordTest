import * as _ from 'lodash';
import GamaEntity from '../models/GamaEntity';
export default class GamaUserInfo extends GamaEntity {
    protected getList(): string[] {
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
    private _operatorSerial: number;
    private _operatorName: string;
    private _groupSerial: number;
    private _status: number;
    private _loginFail: number;
    private _lastPWChangedTime: string;
    private _workstationID: number;
    private _actionSection: string;
    private _sessionSerial: number;
    private _isSessionOpen: boolean;

    public set operatorSerial(value: number) {
        this._operatorSerial = value;
    }
    public get operatorSerial() {
        return this._operatorSerial;
    }
    public set operatorName(value: string) {
        this._operatorName = value;
    }
    public get operatorName() {
        return this._operatorName;
    }
    public set groupSerial(value: number) {
        this._groupSerial = value;
    }
    public get groupSerial() {
        return this._groupSerial;
    }
    public set status(value: number) {
        this._status = value;
    }
    public get status() {
        return this._status;
    }
    public set loginFail(value: number) {
        this._loginFail = value;
    }
    public get loginFail() {
        return this._loginFail;
    }
    public set lastPWChangedTime(value: string) {
        this._lastPWChangedTime = value;
    }
    public get lastPWChangedTime() {
        return this._lastPWChangedTime;
    }
    public set workstationID(value: number) {
        this._workstationID = value;
    }
    public get workstationID() {
        return this._workstationID;
    }
    public set actionSection(value: string) {
        this._actionSection = value;
    }
    public get actionSection() {
        return this._actionSection;
    }
    public set sessionSerial(value: number) {
        this._isSessionOpen = _.isUndefined(value) ? false : true;
        this._sessionSerial = value;
    }
    public get sessionSerial() {
        return this._sessionSerial;
    }
    public get isSessionOpen() {
        return this._isSessionOpen;
    }
}
