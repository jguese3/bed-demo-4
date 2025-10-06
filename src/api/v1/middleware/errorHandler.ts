import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../models/responseModel";

const errorHandler = (
    err: Error | null,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (!err) {
        console.error("Error: null or undefined error received");
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("An unexpected error occured", "UNKNOWN_ERROR")
        )
    }

    console.error(`Error: ${err?.message}`);
    console.error(`Stack: ${err?.stack}`);

    if (err instanceof AppError) {
        res.status(err.statusCode).json(errorResponse(err.message, err.code))
    } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            errorResponse("An unexpected error occurred", "UKNOWN_ERROR")
        );
    }
}

export default errorHandler;
