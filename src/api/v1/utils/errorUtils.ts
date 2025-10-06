/**
 * Extracts
 * @param error The error object 
 * @returns The error message as a string
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

/**
 * Extracting the error code from Firebase or other errors
 * @param error - The error object
 * @returns - The error code as a string
 */
export const getErrorCode = (error: unknown): string => {
    if (error instanceof Error) {
        // Extracting error code from Firebase accepting use of any
        const firebaseError = error as any;
        return firebaseError.code || "UNKNOWN_ERROR";
    }

    return "UNKNOWN_ERROR";
};