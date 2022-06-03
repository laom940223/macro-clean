import { NextFunction, Request, Response } from "express"




export const MainErrorHandler = (req:Request, res:Response, next:NextFunction )=>{


    return res.json({
        message:"This is the default error page"
    })
}