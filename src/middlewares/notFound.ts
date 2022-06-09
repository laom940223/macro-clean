import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/appError";





export const NotFound = async (req:Request, res:Response, next: NextFunction)=>{

    
     return next( new AppError(StatusCodes.NOT_FOUND, [{ location:"request", message  :`The path ${req.originalUrl} was not found` } ]))

}