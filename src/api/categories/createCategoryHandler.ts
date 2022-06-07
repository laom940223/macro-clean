
import { getPrismaClient } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";



export const createCategoryHandler = async( req:Request, res: Response, next:NextFunction )=>{


    const valResult = validationResult(req)

    if(!valResult.isEmpty()){
        return next(new AppError(StatusCodes.BAD_REQUEST, "", valResult.mapped()))
    }

    const { name } = req.body

    try{

       const createdCategory = await   prisma.category.create({
                data:{
                    name
                }
        })


        return res.status(StatusCodes.OK).json(  buildResponse({ status: StatusCodes.OK, data: createdCategory })  )

    }catch(err){


        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong with the server"))

    }


}