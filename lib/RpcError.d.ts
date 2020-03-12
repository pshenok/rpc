export declare class RpcError extends Error {
    code: number;
    message: string;
    data?: any;
    type: string;
    constructor(code: number, message: string, data?: any);
    toJSON(): {
        type: string;
        code: number;
        message: string;
        data?: any;
    };
    toString(): string;
}
