
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

		AdminService?: IRpcClientConfig;
		AgentService?: IRpcClientConfig;
		AppService?: IRpcClientConfig;
		BankingService?: IRpcClientConfig;
		CardService?: IRpcClientConfig;
		ConditionStateService?: IRpcClientConfig;
		ContactService?: IRpcClientConfig;
		CrmService?: IRpcClientConfig;
		CronService?: IRpcClientConfig;
		CryptoService?: IRpcClientConfig;
		DeliveryService?: IRpcClientConfig;
		FileStorage?: IRpcClientConfig;
		HistoryService?: IRpcClientConfig;
		MessageService?: IRpcClientConfig;
		NoticeService?: IRpcClientConfig;
		OperationService?: IRpcClientConfig;
		PaymentService?: IRpcClientConfig;
		StaticDataService?: IRpcClientConfig;
		UserService?: IRpcClientConfig;
		WalletService?: IRpcClientConfig;
		PubSubService?: IRpcClientConfig;
		ProcessingService?: IRpcClientConfig;
		RequestService?: IRpcClientConfig;
		ReportService?: IRpcClientConfig;
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
