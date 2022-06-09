import { StatusCodes } from "http-status-codes";



export interface ErrorDetail {

    location: string
    message: string
    stack?: string 
}



export class AppError extends Error {


    statusCode: StatusCodes
    errorsDetails: ErrorDetail[] | null
    // type : "validation" | "runtime"
    
    

    constructor(statusCode: StatusCodes,  errorsDetails: ErrorDetail[] ){

        super("Default message")
        this.statusCode= statusCode
        this.errorsDetails = errorsDetails || []

    }

}


