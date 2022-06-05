import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";



export const  logoutHandler = async (req: Request, res: Response, next:NextFunction)=>{


    if(!req.session.user){
        return res.status(StatusCodes.OK).json()
    }


    req.session.user =null

    return res.status(StatusCodes.OK).json({message:"Logout successfully"})

}