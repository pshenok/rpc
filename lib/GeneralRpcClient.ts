import {BaseRpcClient} from './base/BaseRpcClient';
import {ILogger, IRpcOptions} from './types/types';


export class GeneralRpcClient {
	private rpcClients: Map<string, BaseRpcClient>;

	constructor (
		private logger: ILogger,
	) {
		this.rpcClients = new Map();
	}

	public async request<T> (url: string, method: string, data: any, options?: IRpcOptions): Promise<T> {
		let rpcClient = this.rpcClients.get(url);

		if (!rpcClient) {
			rpcClient = new BaseRpcClient(this.logger, {rpc: {GeneralRpcClient: {url: url}}}, 'GeneralRpcClient');
			this.rpcClients.set(url, rpcClient);
		}

		const result = await rpcClient.rpc<T>(method, data, options);

		return result;
	}
}
