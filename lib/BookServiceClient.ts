import {BaseRpcClient} from './base/BaseRpcClient';
import {IRpcConfig, ILogger, IRpcOptions} from './types/types';
import {
	ICreateBookData, ICreateBookResult,
} from './types/book-service.types';


export class BookServiceClient extends BaseRpcClient {
	static serviceName = 'BookService';

	constructor (
		logger: ILogger,
		config: IRpcConfig,
	) {
		super(logger, config, BookServiceClient.serviceName);
	}

	public async createBook (data: ICreateBookData, options?: IRpcOptions): Promise<ICreateBookResult> {
		const result = await this.rpc<ICreateBookResult>('createBook', data, options);

		return {
			bookId: result.bookId,
		};
	}
}
