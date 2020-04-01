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
    async showBook(data, options) {
        const result = await this.rpc('showBook', data, options);
        return {
            id: result.id,
            name: result.name,
            info: result.info,
            authorId: result.authorId,
            fileUrl: result.fileUrl,
            releaseDate: result.releaseDate,
        };
    }
    async listBooks(data, options) {
        const result = await this.rpc('listBooks', data, options);
        return {
            total: result.total,
            items: result.items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    info: item.info,
                    authorId: item.authorId,
                    fileUrl: item.fileUrl,
                    releaseDate: item.releaseDate,
                };
            }),
        };
    }
    async updateBook(data, options) {
        const result = await this.rpc('updateBook', data, options);
        return {
            bookId: result.bookId,
        };
    }
    async deleteBook(data, options) {
        const result = await this.rpc('deleteBook', data, options);
        return {
            bookId: result.bookId,
        };
    }
    async createAuthor(data, options) {
        const result = await this.rpc('createAuthor', data, options);
        return {
            authorId: result.authorId,
        };
    }
    async showAuthor(data, options) {
        const result = await this.rpc('showAuthor', data, options);
        return {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            info: result.info,
            birthDate: result.birthDate,
        };
    }
    async listAuthors(data, options) {
        const result = await this.rpc('listAuthors', data, options);
        return {
            total: result.total,
            items: result.items.map((item) => {
                return {
                    id: item.id,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    info: item.info,
                    birthDate: item.birthDate,
                };
            }),
        };
    }
    async updateAuthor(data, options) {
        const result = await this.rpc('updateAuthor', data, options);
        return {
            authorId: result.authorId,
        };
    }
    async deleteAuthor(data, options) {
        const result = await this.rpc('deleteAuthor', data, options);
        return {
            authorId: result.authorId,
        };
    }
}
exports.BookServiceClient = BookServiceClient;
BookServiceClient.serviceName = 'BookService';
