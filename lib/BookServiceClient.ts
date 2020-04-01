import {BaseRpcClient} from './base/BaseRpcClient';
import {IRpcConfig, ILogger, IRpcOptions} from './types/types';
import {
	ICreateBookData, ICreateBookResult,
	ICreateAuthorData, ICreateAuthorResult,
	IUpdateBookData, IUpdateBookResult,
	IDeleteBookData, IDeleteBookResult,
	IShowBookData, IShowBookResult,
	IListBooksData, IListBooksResult,
	IShowAuthorData, IShowAuthorResult,
	IListAuthorsData, IListAuthorsResult,
	IUpdateAuthorData, IUpdateAuthorResult,
	IDeleteAuthorData, IDeleteAuthorResult,
} from './types/book-service.types';


export class BookServiceClient extends BaseRpcClient {
	static serviceName = 'BookService';

	constructor (
		logger: ILogger,
		config: IRpcConfig,
	) {
		super(logger, config, BookServiceClient.serviceName);
	}

	public async createBook (data: ICreateBookData, options?: IRpcOptions): Promise<ICreateBookResult> {
		const result = await this.rpc<ICreateBookResult>('createBook', data, options);

		return {
			bookId: result.bookId,
		};
	}

	public async showBook (data: IShowBookData, options?: IRpcOptions): Promise<IShowBookResult> {
		const result = await this.rpc<IShowBookResult>('showBook', data, options);

		return {
			id:          result.id,
			name:        result.name,
			info:        result.info,
			authorId:    result.authorId,
			fileUrl:     result.fileUrl,
			releaseDate: result.releaseDate,

		};
	}

	public async listBooks (data: IListBooksData, options?: IRpcOptions): Promise<IListBooksResult> {
		const result = await this.rpc<IListBooksResult>('listBooks', data, options);

		return {
			total: result.total,
			items: result.items.map((item) => {
				return {
					id:          item.id,
					name:        item.name,
					info:        item.info,
					authorId:    item.authorId,
					fileUrl:     item.fileUrl,
					releaseDate: item.releaseDate,
				};
			}),
		};
	}

	public async updateBook (data: IUpdateBookData, options?: IRpcOptions): Promise<IUpdateBookResult> {
		const result = await this.rpc<IUpdateBookResult>('updateBook', data, options);

		return {
			bookId: result.bookId,
		};
	}

	public async deleteBook (data: IDeleteBookData, options?: IRpcOptions): Promise<IDeleteBookResult> {
		const result = await this.rpc<IDeleteBookResult>('deleteBook', data, options);

		return {
			bookId: result.bookId,
		};
	}

	public async createAuthor (data: ICreateAuthorData, options?: IRpcOptions): Promise<ICreateAuthorResult> {
		const result = await this.rpc<ICreateAuthorResult>('createAuthor', data, options);

		return {
			authorId: result.authorId,
		};
	}

	public async showAuthor (data: IShowAuthorData, options?: IRpcOptions): Promise<IShowAuthorResult> {
		const result = await this.rpc<IShowAuthorResult>('showAuthor', data, options);

		return {
			id:        result.id,
			firstName: result.firstName,
			lastName:  result.lastName,
			info:      result.info,
			birthDate: result.birthDate,
		};
	}

	public async listAuthors (data: IListAuthorsData, options?: IRpcOptions): Promise<IListAuthorsResult> {
		const result = await this.rpc<IListAuthorsResult>('listAuthors', data, options);

		return {
			total: result.total,
			items: result.items.map((item) => {
				return {
					id:        item.id,
					firstName: item.firstName,
					lastName:  item.lastName,
					info:      item.info,
					birthDate: item.birthDate,
				};
			}),
		};
	}

	public async updateAuthor (data: IUpdateAuthorData, options?: IRpcOptions): Promise<IUpdateAuthorResult> {
		const result = await this.rpc<IUpdateAuthorResult>('updateAuthor', data, options);

		return {
			authorId: result.authorId,
		};
	}

	public async deleteAuthor (data: IDeleteAuthorData, options?: IRpcOptions): Promise<IDeleteAuthorResult> {
		const result = await this.rpc<IDeleteAuthorResult>('deleteAuthor', data, options);

		return {
			authorId: result.authorId,
		};
	}
}
