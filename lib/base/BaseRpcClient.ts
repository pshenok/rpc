import * as jayson from 'jayson/promise';
import stringify from 'json-stringify-safe';
import {RpcError} from '../RpcError';
import {ILogger, IPublishOptions, IRpcClientConfig, IRpcConfig, IRpcOptions} from '../types/types';


export class BaseRpcClient {
	static counter = 0;

	private rpcClient: jayson.HttpClient;
	protected cfg: IRpcClientConfig;

	constructor (
		protected logger: ILogger,
		protected config: IRpcConfig,
		protected serviceName: string,
	) {
		this.cfg = this.config['rpc'][this.serviceName as keyof IRpcConfig['rpc']]!;

		if (!this.cfg) {
			throw new RpcError(1, `Invalid config for ${this.serviceName}`);
		}

		this.rpcClient = (jayson.Client.http as any)(this.cfg.url);
	}

	async rpc<T> (method: string, data: any, options?: IRpcOptions): Promise<T> {
		const logger = options && options.logger || this.logger;

		BaseRpcClient.counter += 1;
		const count = BaseRpcClient.counter.toString(36).toUpperCase().padStart(6, '0');
		const prefix = Math.random().toString(36).toUpperCase().substr(-6);
		const reqId = logger.traceId || `${prefix}_${count}`;

		logger.info('RPC Request --->', {
			reqId:       reqId,
			serviceName: this.serviceName,
			method:      method,
		});

		const startTs = Date.now();
		let resp: any;

		try {
			resp = await this.rpcClient.request(method, data, reqId);
		} catch (err) {
			const duration = Date.now() - startTs;

			logger.error('RPC Response <---', {
				reqId:       reqId,
				serviceName: this.serviceName,
				method:      method,
				result:      'FAIL',
				duration:    duration,
				error:       stringify(err),
			});

			throw err;
		}

		const duration = Date.now() - startTs;

		if (resp.error) {
			logger.warn('RPC Response <---', {
				reqId:       reqId,
				serviceName: this.serviceName,
				method:      method,
				result:      'ERROR',
				duration:    duration,
				error:       stringify(resp.error),
			});

			throw new RpcError(resp.error.code, resp.error.message, resp.error.data);

		} else {
			logger.info('RPC Response <---', {
				reqId:       reqId,
				serviceName: this.serviceName,
				method:      method,
				result:      'OK',
				duration:    duration,
				error:       null,
			});

			return resp.result;
		}
	}

	async publish (method: string, message: any, options?: IPublishOptions): Promise<void> {
		const logger = options && options.logger || this.logger;
		const ignoreFails = options && options.ignoreFails || false;

		BaseRpcClient.counter += 1;
		const count = BaseRpcClient.counter.toString(36).toUpperCase().padStart(6, '0');
		const prefix = Math.random().toString(36).toUpperCase().substr(-6);
		const reqId = logger.traceId || `${prefix}_${count}`;

		logger.info('PUBLISH Request --->', {
			reqId:       reqId,
			serviceName: this.serviceName,
			method:      method,
		});

		const startTs = Date.now();

		try {
			const resp = await this.rpcClient.request(method, message, reqId);

			const duration = Date.now() - startTs;

			if (resp.error) {
				logger.warn('PUBLISH Response <---', {
					reqId:       reqId,
					serviceName: this.serviceName,
					method:      method,
					result:      'ERROR',
					ignoreFails: ignoreFails,
					duration:    duration,
					error:       stringify(resp.error),
				});

				if (!ignoreFails) {
					throw new RpcError(resp.error.code, resp.error.message, resp.error.data);
				}

			} else {
				logger.info('PUBLISH Response <---', {
					reqId:       reqId,
					serviceName: this.serviceName,
					method:      method,
					result:      'OK',
					ignoreFails: ignoreFails,
					duration:    duration,
					error:       null,
				});
			}

		} catch (err) {
			const duration = Date.now() - startTs;

			logger.error('PUBLISH Response <---', {
				reqId:       reqId,
				serviceName: this.serviceName,
				method:      method,
				result:      'FAIL',
				ignoreFails: ignoreFails,
				duration:    duration,
				error:       stringify(err),
			});

			if (!ignoreFails) {
				throw err;
			}
		}
	}
}
