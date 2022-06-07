import { StatusCodes } from "http-status-codes"
import { AppError } from "../errors/appError"


interface AppResponse<T >{

    status: StatusCodes 
    data?: T | null
    errors?: AppErrorResponse[] | null

}


export interface AppErrorResponse {
    message: string
    field : string | null
    trace? : string | null
}


export const buildResponse = <T> ( { status, data = null, errors = null }  :AppResponse<T> ):AppResponse<T> =>{


    return {
        status, 
        data, 
        errors
    } as AppResponse<T>
}

