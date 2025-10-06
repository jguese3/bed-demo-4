import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Base error class for all application error
 * Extends the built-in Error class to include an error code and status code
 * 
 * This abstract class provides:
 * - A consistent structure accross our app
 * - HTTP status codes for an API responses
 */
export class AppError extends Error {
    /**
     * Creates a new AppError instance
     * @param message The error message
     * @param code The error code
     * @param statusCode An http response code
     */
    constructor(
        public message: string,
        public code: string,
        public statusCode: number
    ){
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}