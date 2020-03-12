"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRpcClient_1 = require("./base/BaseRpcClient");
class GeneralRpcClient {
    constructor(logger) {
        this.logger = logger;
        this.rpcClients = new Map();
    }
    async request(url, method, data, options) {
        let rpcClient = this.rpcClients.get(url);
        if (!rpcClient) {
            rpcClient = new BaseRpcClient_1.BaseRpcClient(this.logger, { rpc: { GeneralRpcClient: { url: url } } }, 'GeneralRpcClient');
            this.rpcClients.set(url, rpcClient);
        }
        const result = await rpcClient.rpc(method, data, options);
        return result;
    }
}
exports.GeneralRpcClient = GeneralRpcClient;
