import {IListResult} from './types';

export interface IBook {
	id: string;
	authorId?: string;
	name: string;
	releaseDate?: Date;
	text: string;
}

export interface ICreateBookData {
	name: string;
	text: string;
	authorId?: string;
	releaseDate?: Date;
}

export interface ICreateBookResult {
	bookId: string;
}
