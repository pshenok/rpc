"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_stringify_safe_1 = __importDefault(require("json-stringify-safe"));
class RpcError extends Error {
    constructor(code, message, data) {
        super();
        this.code = code;
        this.message = message;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
        this.type = this.constructor.name;
    }
    toJSON() {
        return {
            type: this.type,
            code: this.code,
            message: this.message,
            data: this.data,
        };
    }
    toString() {
        return `${this.type}: { ` +
            `type: ${this.type}, ` +
            `code: ${this.code}, ` +
            `message: ${this.message}, ` +
            `data: ${json_stringify_safe_1.default(this.data)} ` +
            '}';
    }
}
exports.RpcError = RpcError;
