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

/**
 * Class representation of an authentication error
 * Extends the AppError to include verification and user identity
 * Used for invalid tokens, expired tokens, etc. 
 *                      something is of in validation
 */
export class AuthenticationError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHENTICATION_ERROR",
        statusCode: number = HTTP_STATUS.UNAUTHORIZED
    ) {
        super(message, code, statusCode);
    }
}

/**
 * Class representing an authorization error
 * Extends the AppError to include role-based access
 * Used for insufficient permission and role violatons
 */
export class AuthorizarionError extends AppError {
    constructor(
        message: string,
        code: string = "AUTHORIZATION_ERROR",
        statusCode: number = HTTP_STATUS.FORBIDDEN
    ) {
        super(message, code, statusCode);
    }
}