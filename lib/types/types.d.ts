
export interface ILogger {
	traceId: string;
	debug (msg: string, data?: object): void;
	info (msg: string, data?: object): void;
	warn (msg: string, data?: object): void;
	error (msg: string, data?: object): void;
}

export interface IRpcConfig {
	rpc: {
		GeneralRpcClient?: IRpcClientConfig,

		BookService?: IRpcClientConfig;
	};
}

export interface IRpcClientConfig {
	url: string;
}

export interface IListData {
	skip?: number;
	limit?: number;
	sort?: Array<{
		field: string;
		order?: string;
	}>;
}

export interface IListResult<T> {
	total: number;
	items: T[];
}

export interface IRpcOptions {
	logger?: ILogger;
}

export interface IPublishOptions {
	logger?: ILogger;
	ignoreFails?: boolean;
}
