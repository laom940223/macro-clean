import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";



export const getAllCategoriesHandler = async(req:Request, res: Response, next: NextFunction )=>{


    try{

        const categories =  await prisma.category.findMany()


        return res.status(StatusCodes.OK).json(  buildResponse({ status: StatusCodes.OK, data: categories }) )

    }catch(err){


        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, ""))
    }

    

}