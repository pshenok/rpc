import { ILogger, IPublishOptions, IRpcClientConfig, IRpcConfig, IRpcOptions } from '../types/types';
export declare class BaseRpcClient {
    protected logger: ILogger;
    protected config: IRpcConfig;
    protected serviceName: string;
    static counter: number;
    private rpcClient;
    protected cfg: IRpcClientConfig;
    constructor(logger: ILogger, config: IRpcConfig, serviceName: string);
    rpc<T>(method: string, data: any, options?: IRpcOptions): Promise<T>;
    publish(method: string, message: any, options?: IPublishOptions): Promise<void>;
}
