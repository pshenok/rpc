import { ILogger, IRpcOptions } from './types/types';
export declare class GeneralRpcClient {
    private logger;
    private rpcClients;
    constructor(logger: ILogger);
    request<T>(url: string, method: string, data: any, options?: IRpcOptions): Promise<T>;
}
