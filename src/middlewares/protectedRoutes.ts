import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/appError";



export const protectedUserRoute = async( req:Request, res: Response, next:NextFunction)=>{


    const { user } = req.session
    

    if(!user){

        return  next( new AppError(StatusCodes.UNAUTHORIZED,[{ location: "request", message:"Need to be authenticated to access this route" }]))
    
    }

    return next()

}


export const protectedAdminRoute = async (req: Request, res: Response, next:NextFunction)=>{

    const { user } = req.session

    if(!user){
        return  next( new AppError(StatusCodes.UNAUTHORIZED, [{ location: "request", message:"Need to be authenticated to access this route" }]) )
    }


    if(user.role!== "ADMIN"){
        return  next( new AppError(StatusCodes.UNAUTHORIZED, [{ location: "Request", message:"You don't have permission to acces this route" }]) )
    }
}


