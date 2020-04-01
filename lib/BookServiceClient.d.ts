import { BaseRpcClient } from './base/BaseRpcClient';
import { IRpcConfig, ILogger, IRpcOptions } from './types/types';
import { ICreateBookData, ICreateBookResult, ICreateAuthorData, ICreateAuthorResult, IUpdateBookData, IUpdateBookResult, IDeleteBookData, IDeleteBookResult, IShowBookData, IShowBookResult, IListBooksData, IListBooksResult, IShowAuthorData, IShowAuthorResult, IListAuthorsData, IListAuthorsResult, IUpdateAuthorData, IUpdateAuthorResult, IDeleteAuthorData, IDeleteAuthorResult } from './types/book-service.types';
export declare class BookServiceClient extends BaseRpcClient {
    static serviceName: string;
    constructor(logger: ILogger, config: IRpcConfig);
    createBook(data: ICreateBookData, options?: IRpcOptions): Promise<ICreateBookResult>;
    showBook(data: IShowBookData, options?: IRpcOptions): Promise<IShowBookResult>;
    listBooks(data: IListBooksData, options?: IRpcOptions): Promise<IListBooksResult>;
    updateBook(data: IUpdateBookData, options?: IRpcOptions): Promise<IUpdateBookResult>;
    deleteBook(data: IDeleteBookData, options?: IRpcOptions): Promise<IDeleteBookResult>;
    createAuthor(data: ICreateAuthorData, options?: IRpcOptions): Promise<ICreateAuthorResult>;
    showAuthor(data: IShowAuthorData, options?: IRpcOptions): Promise<IShowAuthorResult>;
    listAuthors(data: IListAuthorsData, options?: IRpcOptions): Promise<IListAuthorsResult>;
    updateAuthor(data: IUpdateAuthorData, options?: IRpcOptions): Promise<IUpdateAuthorResult>;
    deleteAuthor(data: IDeleteAuthorData, options?: IRpcOptions): Promise<IDeleteAuthorResult>;
}
