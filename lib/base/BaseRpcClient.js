"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jayson = __importStar(require("jayson/promise"));
const json_stringify_safe_1 = __importDefault(require("json-stringify-safe"));
const RpcError_1 = require("../RpcError");
class BaseRpcClient {
    constructor(logger, config, serviceName) {
        this.logger = logger;
        this.config = config;
        this.serviceName = serviceName;
        this.cfg = this.config['rpc'][this.serviceName];
        if (!this.cfg) {
            throw new RpcError_1.RpcError(1, `Invalid config for ${this.serviceName}`);
        }
        this.rpcClient = jayson.Client.http(this.cfg.url);
    }
    async rpc(method, data, options) {
        const logger = options && options.logger || this.logger;
        BaseRpcClient.counter += 1;
        const count = BaseRpcClient.counter.toString(36).toUpperCase().padStart(6, '0');
        const prefix = Math.random().toString(36).toUpperCase().substr(-6);
        const reqId = logger.traceId || `${prefix}_${count}`;
        logger.info('RPC Request --->', {
            reqId: reqId,
            serviceName: this.serviceName,
            method: method,
        });
        const startTs = Date.now();
        let resp;
        try {
            resp = await this.rpcClient.request(method, data, reqId);
        }
        catch (err) {
            const duration = Date.now() - startTs;
            logger.error('RPC Response <---', {
                reqId: reqId,
                serviceName: this.serviceName,
                method: method,
                result: 'FAIL',
                duration: duration,
                error: json_stringify_safe_1.default(err),
            });
            throw err;
        }
        const duration = Date.now() - startTs;
        if (resp.error) {
            logger.warn('RPC Response <---', {
                reqId: reqId,
                serviceName: this.serviceName,
                method: method,
                result: 'ERROR',
                duration: duration,
                error: json_stringify_safe_1.default(resp.error),
            });
            throw new RpcError_1.RpcError(resp.error.code, resp.error.message, resp.error.data);
        }
        else {
            logger.info('RPC Response <---', {
                reqId: reqId,
                serviceName: this.serviceName,
                method: method,
                result: 'OK',
                duration: duration,
                error: null,
            });
            return resp.result;
        }
    }
    async publish(method, message, options) {
        const logger = options && options.logger || this.logger;
        const ignoreFails = options && options.ignoreFails || false;
        BaseRpcClient.counter += 1;
        const count = BaseRpcClient.counter.toString(36).toUpperCase().padStart(6, '0');
        const prefix = Math.random().toString(36).toUpperCase().substr(-6);
        const reqId = logger.traceId || `${prefix}_${count}`;
        logger.info('PUBLISH Request --->', {
            reqId: reqId,
            serviceName: this.serviceName,
            method: method,
        });
        const startTs = Date.now();
        try {
            const resp = await this.rpcClient.request(method, message, reqId);
            const duration = Date.now() - startTs;
            if (resp.error) {
                logger.warn('PUBLISH Response <---', {
                    reqId: reqId,
                    serviceName: this.serviceName,
                    method: method,
                    result: 'ERROR',
                    ignoreFails: ignoreFails,
                    duration: duration,
                    error: json_stringify_safe_1.default(resp.error),
                });
                if (!ignoreFails) {
                    throw new RpcError_1.RpcError(resp.error.code, resp.error.message, resp.error.data);
                }
            }
            else {
                logger.info('PUBLISH Response <---', {
                    reqId: reqId,
                    serviceName: this.serviceName,
                    method: method,
                    result: 'OK',
                    ignoreFails: ignoreFails,
                    duration: duration,
                    error: null,
                });
            }
        }
        catch (err) {
            const duration = Date.now() - startTs;
            logger.error('PUBLISH Response <---', {
                reqId: reqId,
                serviceName: this.serviceName,
                method: method,
                result: 'FAIL',
                ignoreFails: ignoreFails,
                duration: duration,
                error: json_stringify_safe_1.default(err),
            });
            if (!ignoreFails) {
                throw err;
            }
        }
    }
}
exports.BaseRpcClient = BaseRpcClient;
BaseRpcClient.counter = 0;
