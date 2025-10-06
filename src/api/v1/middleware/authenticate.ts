import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { AuthenticationError } from "../errors/errors";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";
import { auth } from "../../../../config/firebaseConfig";

const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader: string | undefined = req.headers.authorization;
        // Bearer token-id => splits into [0:"Bearer", 1:"token-id"]
        const token: string = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;

        if (!token) {
            next(
                new AuthenticationError(
                    "Unauthorized: No token provided",
                    "TOKEN_NOT_FOUND"
                )
            );
        }

        const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);
        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role;

        next();
    } catch (error: unknown) {
        if (error instanceof AuthenticationError) {
            next(error);
        } else if (error instanceof Error) {
            next(
                new AuthenticationError (
                    `Unauthorized: ${getErrorMessage(error)}`,
                    getErrorCode(error)
                )
            );
        } else {
            next(
                new AuthenticationError(
                    "Unauthorized: InvalidToken",
                    "TOKEN_INVALID"
                )
            )
        }
    }
};

export default authenticate;