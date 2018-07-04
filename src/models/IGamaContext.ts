import GamaResponse from '../models/GamaResponse';
import GamaUserInfo from '../models/GamaUserInfo';

/**
 * 定義ctx內部可能目前用到的屬性
 * 如果使用裝飾器的會導致ctx被攔截,所有屬性都要從裝飾器內部取得
 * @export
 * @interface IContext
 */
export default interface IGamaContext {
    request: IBody;
    body: GamaResponse | any;
    params: IString;
    req: IReq;
    query: IString;
    type: string;
    state: { user: GamaUserInfo };
}

export interface IReq {
    files: IFiles[];
    pipe: any;
}

export interface IFiles {
    buffer: any | any[];
}

export interface IBody {
    body: IReqData;
}

export interface IReqData {
    reqData: IObj;
    [key: string]: string | any;
}

export interface IObj {
    [key: string]: any | any[];
}

export interface IString {
    [key: string]: IString;
}
type LinkedList = string & { [key: string]: any };
