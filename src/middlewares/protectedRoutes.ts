import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";



export const protectedUserRoute = async( req:Request, res: Response, next:NextFunction)=>{


    const { user } = req.session
    

    if(!user){

        return  res.status(StatusCodes.UNAUTHORIZED).json({message:" Please log in"})
    
    }

    return next()

}


export const protectedAdminRoute = async (req: Request, res: Response, next:NextFunction)=>{

    const { user } = req.session

    if(!user){
        return  res.status(StatusCodes.UNAUTHORIZED).json({message:" Please log in"})
    }


    if(user.role!== "ADMIN"){
        return  res.status(StatusCodes.UNAUTHORIZED).json({message:"You don't have the permission to be here"})
    }
}


