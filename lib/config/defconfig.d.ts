export declare const isProdEnv: boolean;
export declare const domainName: string;
export interface IJwtconfig {
    active: boolean;
    privateKey: string;
    expired: any;
}
export declare const jwt: IJwtconfig;
export declare const httpPort: number;
