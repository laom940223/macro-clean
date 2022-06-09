
import { getPrismaClient } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";
import { formatValidationErrors } from "../../utils/formatValidationErrors";



export const createCategoryHandler = async( req:Request, res: Response, next:NextFunction )=>{


    const valResult = validationResult(req)

    if(!valResult.isEmpty()){

        return next(new AppError(StatusCodes.BAD_REQUEST,  formatValidationErrors( valResult.mapped())))
    }

    const { name } = req.body

    try{

         const categoryExists =await prisma.category.findMany({
             where:{ 
                 name: name
             }
         })

         console.log(categoryExists)

         if(categoryExists.length>0){
             
             return next(new AppError(StatusCodes.BAD_REQUEST, [{ location:"name", message:"Category name is already in use" }]))
         }


       const createdCategory = await   prisma.category.create({
                data:{
                    name
                }
        })


        return res.status(StatusCodes.OK).json(  buildResponse({  data:{ items: [createdCategory]} })  )

    }catch(err){
        console.log(err)

        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"Something went wrong in the server" }]))

    }


}