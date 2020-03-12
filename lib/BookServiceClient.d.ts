import { BaseRpcClient } from './base/BaseRpcClient';
import { IRpcConfig, ILogger, IRpcOptions } from './types/types';
import { ICreateBookData, ICreateBookResult } from './types/book-service.types';
export declare class BookServiceClient extends BaseRpcClient {
    static serviceName: string;
    constructor(logger: ILogger, config: IRpcConfig);
    createBook(data: ICreateBookData, options?: IRpcOptions): Promise<ICreateBookResult>;
}
