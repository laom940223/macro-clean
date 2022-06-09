import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { __prod__ } from "../../consts/prod";
import { AppError } from "../../errors/appError";

import { buildResponse } from "../../utils/buildResponse";




export const errorHandler = async (
            error: AppError, 
            req:Request, 
            res: Response, 
            next: NextFunction)=>{
    

    res.status( error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)


    
    
    
    const response = buildResponse({ 
                        
                        data: null, 
                        errors: error.errorsDetails || [{  location:"unknown", message:error.message, stack : __prod__ ? "" : error.stack }]
                    })

    return res.json(response)

    

}