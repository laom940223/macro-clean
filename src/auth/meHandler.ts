import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userInfo } from "os";
import { AppError } from "../errors/appError";
import { buildResponse } from "../utils/buildResponse";



export const meHandler = async (req:Request, res:Response, next:NextFunction)=>{


    // console.log("Req session " + req.session.user)
    
    if(req.session.user !== undefined){
        return res.json( buildResponse({   data: { items: [req.session.user]}  }) )
    }


    return next( new AppError(StatusCodes.UNAUTHORIZED, [{ location:"request", message:"Please log in" }]))

}