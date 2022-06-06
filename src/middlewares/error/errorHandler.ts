import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { __prod__ } from "../../consts/prod";
import { AppError } from "../../errors/appError";
import { AppErrorResponse, buildResponse } from "../../utils/buildResponse";




export const errorHandler = async (error: AppError, req:Request, res: Response, next: NextFunction)=>{


    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)

    const errors = [{
        message: error.message || "Internal server error",
        trace :  !__prod__ ? error.stack : "Stack",
        field: null
    }] as AppErrorResponse[]

    const response = buildResponse({ 
                        status: error.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
                        data: null, 
                        errors
                    })

    return res.json(response)

    

}