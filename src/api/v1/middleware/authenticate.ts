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
        const authHeader: string | unknown = req.headers.authorization;
    } catch (error: unknown)
}