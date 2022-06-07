import { StatusCodes } from "http-status-codes";
import { AppErrorResponse } from "../utils/buildResponse";
import { ValidationError } from 'express-validator'


export class AppError extends Error {


    statusCode: StatusCodes
    validationErrors : Record<string, ValidationError> | null
    

    constructor(statusCode: StatusCodes, message: string , validationErrors: Record<string, ValidationError> | null  ){

        super(message)
        this.statusCode= statusCode
        this.validationErrors = validationErrors

    }

}