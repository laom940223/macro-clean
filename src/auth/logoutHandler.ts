import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/appError";
import { buildResponse } from "../utils/buildResponse";



export const  logoutHandler = async (req: Request, res: Response, next:NextFunction)=>{


 

    

    if( req.session) { 
    

        req.session.destroy((err)=>{
             
            if(err){    
                  res.status(400).send('Unable to log out')
                  return next(err)
            } 

        })
    
        res.clearCookie('connect.sid') // clean up!

    
    }
    
    

    return res
            .status(StatusCodes.OK)
            .json(
                buildResponse({
                    data: {
                        message: "Log out succesfully"
                    }
                })
            )
                    

}