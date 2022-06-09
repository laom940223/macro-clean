import { StatusCodes } from "http-status-codes"
import { AppError, ErrorDetail } from "../errors/appError"


interface DataWithPagination <T> {

    items: T[]
    itemCount: number,
    page: number 
    hasMore: boolean
}

interface DataWithoutPagination<T>{
    items: T[]
}

interface NoDataJustMessage{
    message: string
}

interface AppResponse<T>{
       
    data? :DataWithPagination<T> | DataWithoutPagination<T> | NoDataJustMessage  | null
    errors?: ErrorDetail[] | null

}



export const buildResponse = <T> ( { data = null, errors = null }  :AppResponse<T> ):AppResponse<T> =>{


    return {
        
        data, 
        errors
    } as AppResponse<T>
}

