import 'reflect-metadata';
export default class APIManger {
    private agentOptions;
    private auth;
    private get;
    private del;
    private patch;
    private post;
    private put;
    constructor(authData?: {
        user?: string;
        pass?: string;
        bearer?: string;
        sendImmediately?: boolean;
    }, cadata?: {
        certFile?: string;
        keyFile?: string;
        ca?: string;
        passphrase?: string;
        securityOptions?: string;
        secureProtocol?: string;
    });
    /**
     * httpGet
     */
    httpGet(url: string, params?: any, authData?: {
        user?: string;
        pass?: string;
        bearer?: string;
        sendImmediately?: boolean;
    }): Promise<any>;
    /**
     * httpsGet
     */
    httpsGet(url: string, params?: any, cadata?: {
        certFile?: string;
        keyFile?: string;
        ca?: string;
        passphrase?: string;
        securityOptions?: string;
        secureProtocol?: string;
    }): Promise<any>;
    /**
     * httpPost
     */
    httpPost(url: string, requestBody: any, params?: any, authData?: {
        user?: string;
        pass?: string;
        bearer?: string;
        sendImmediately?: boolean;
    }): Promise<any>;
    /**
     * httpsPost
     */
    httpsPost(url: string, requestBody: any, params?: any, cadata?: {
        certFile?: string;
        keyFile?: string;
        ca?: string;
        passphrase?: string;
        securityOptions?: string;
        secureProtocol?: string;
    }): Promise<any>;
    /**
     * httpPostFormData
     */
    httpPostFormData(url: string, formData: any, params?: any, authData?: {
        user?: string;
        pass?: string;
        bearer?: string;
        sendImmediately?: boolean;
    }): Promise<any>;
    /**
     * httpsPostFormData
     */
    httpsPostFormData(url: string, formData: any, params?: any, cadata?: {
        certFile?: string;
        keyFile?: string;
        ca?: string;
        passphrase?: string;
        securityOptions?: string;
        secureProtocol?: string;
    }): Promise<any>;
    /**
     * httpPut
     */
    httpPut(url: string, requestBody: any, params?: any, authData?: {
        user?: string;
        pass?: string;
        bearer?: string;
        sendImmediately?: boolean;
    }): Promise<any>;
    /**
     * httpsPut
     */
    httpsPut(url: string, requestBody: any, params?: any, cadata?: {
        certFile?: string;
        keyFile?: string;
        ca?: string;
        passphrase?: string;
        securityOptions?: string;
        secureProtocol?: string;
    }): Promise<any>;
    /**
     * httpPutFormData
     */
    httpPutFormData(url: string, formData: any, params?: any, authData?: {
        user?: string;
        pass?: string;
        bearer?: string;
        sendImmediately?: boolean;
    }): Promise<any>;
    /**
     * httpsPut
     */
    httpsPutFormData(url: string, formData: any, params?: any, cadata?: {
        certFile?: string;
        keyFile?: string;
        ca?: string;
        passphrase?: string;
        securityOptions?: string;
        secureProtocol?: string;
    }): Promise<any>;
    /**
     * httpPatch
     */
    httpPatch(url: string, requestBody: any, params?: any, authData?: {
        user?: string;
        pass?: string;
        bearer?: string;
        sendImmediately?: boolean;
    }): Promise<any>;
    /**
     * httpsPatch
     */
    httpsPatch(url: string, requestBody: any, params?: any, cadata?: {
        certFile?: string;
        keyFile?: string;
        ca?: string;
        passphrase?: string;
        securityOptions?: string;
        secureProtocol?: string;
    }): Promise<any>;
    /**
     * httpDelete
     */
    httpDelete(url: string, params?: any, authData?: {
        user?: string;
        pass?: string;
        bearer?: string;
        sendImmediately?: boolean;
    }): Promise<any>;
    /**
     * httpsDelete
     */
    httpsDelete(url: string, params?: any, cadata?: {
        certFile?: string;
        keyFile?: string;
        ca?: string;
        passphrase?: string;
        securityOptions?: string;
        secureProtocol?: string;
    }): Promise<any>;
}
