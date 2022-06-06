import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { __prod__ } from "../../consts/prod";
import { AppError } from "../../errors/appError";




export const errorHandler = async (error: AppError, req:Request, res: Response, next: NextFunction)=>{


    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)

    return res.json({
        status: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        errors:[{
            message: error.message || "Internal server error",
            trace :  !__prod__ ? error.stack : "Stack"
        }]
            
    })

    

}