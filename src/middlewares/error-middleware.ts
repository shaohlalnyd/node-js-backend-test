import {Response} from "express";

export class ErrorHandler {
    public statusCode: number;
    public message: string;

    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public handleError(res: Response) {
        res.status(this.statusCode).json({
            message: this.message,
        });
    }

}
