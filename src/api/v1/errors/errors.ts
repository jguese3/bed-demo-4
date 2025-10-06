import { HTTP_STATUS } from "../../../constants/httpConstants";

export class AppError extends Error {
    constructor(
        public message: string,
        public code: string,
        public statusCode: number
    ){
        super()
    }
}