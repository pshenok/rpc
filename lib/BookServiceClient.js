"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRpcClient_1 = require("./base/BaseRpcClient");
class BookServiceClient extends BaseRpcClient_1.BaseRpcClient {
    constructor(logger, config) {
        super(logger, config, BookServiceClient.serviceName);
    }
    async createBook(data, options) {
        const result = await this.rpc('createBook', data, options);
        return {
            bookId: result.bookId,
        };
    }
}
exports.BookServiceClient = BookServiceClient;
BookServiceClient.serviceName = 'BookService';
