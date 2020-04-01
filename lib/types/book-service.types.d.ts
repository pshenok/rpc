import {IListResult} from './types';

export interface IBook {
	id: string;
	name: string;
	fileUrl: string;
	info: string;
	authorId?: string;
	releaseDate?: Date;
}

export interface IAuthor {
	id: string;
	firstName: string;
	lastName: string;
	info: string;
	birthDate: Date;
}

export interface ICreateBookData {
	name: string;
	info: string;
	fileUrl: string;
	authorId?: string;
	releaseDate?: Date;
}

export interface ICreateBookResult {
	bookId: string;
	filter?: {
		[key:string]: any;
	}
}

export interface IShowBookData {
	bookId: string;
}

export interface IShowBookResult extends IBook {}

export interface IListBooksData {
	limit?: number;
	filter?: {
		[key:string]: any;
	}
}

export interface IListBooksResult extends IListResult<IBook> {}

export interface IUpdateBookData {
	id: string;
	name?: string;
	info?: string;
	fileUrl?: string;
	authorId?: string;
	releaseDate?: Date;
}

export interface IUpdateBookResult {
	bookId: string;
}

export interface IDeleteBookData {
	bookId: string;
}

export interface IDeleteBookResult {
	bookId: string;
}

export interface ICreateAuthorData {
	firstName: string;
	lastName: string;
	info: string;
	birthDate: Date;
}

export interface ICreateAuthorResult {
	authorId: string;
}

export interface IShowAuthorData {
	authorId: string;
	filter?: {
		[key:string]: any;
	}
}

export interface IShowAuthorResult extends IAuthor {}

export interface IListAuthorsData {
	limit?: number;
	filter?: {
		[key:string]: any;
	}
}

export interface IListAuthorsResult extends IListResult<IAuthor> {}

export interface IUpdateAuthorData {
	id: string;
	firstName: string;
	lastName: string;
	info: string;
	birthDate: Date;
}

export interface IUpdateAuthorResult {
	authorId: string;
}

export interface IDeleteAuthorData {
	authorId: string;
}

export interface IDeleteAuthorResult {
	authorId: string;
}