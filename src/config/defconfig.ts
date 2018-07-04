export const isProdEnv: boolean = process.env.NODE_ENV === 'production';

export const domainName: string = ''; // '/APServer'

export interface IJwtconfig {
    active: boolean;
    privateKey: string;
    expired: any;
}
export const jwt: IJwtconfig = {
    active: true,
    privateKey: 'test',
    expired: '200y' // Eg: 60, "2 days", "10h", "7d", "200y"
};
// listen port
export const httpPort: number = 3000;
