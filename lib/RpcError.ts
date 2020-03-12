import stringify from 'json-stringify-safe';


export class RpcError extends Error {
	public type: string;

	constructor (
		public code: number,
		public message: string,
		public data?: any,
	) {
		super();
		Error.captureStackTrace(this, this.constructor);

		this.type = this.constructor.name;
	}

	public toJSON (): {type: string; code: number; message: string; data?: any} {
		return {
			type:    this.type,
			code:    this.code,
			message: this.message,
			data:    this.data,
		};
	}

	public toString (): string {
		return `${this.type}: { ` +
			`type: ${this.type}, ` +
			`code: ${this.code}, ` +
			`message: ${this.message}, ` +
			`data: ${stringify(this.data)} ` +
			'}';
	}
}
