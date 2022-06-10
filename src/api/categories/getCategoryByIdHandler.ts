import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { CategoryDto } from "../../dto/categoryDto";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";




export const getCategoryById= async( req: Request, res: Response, next: NextFunction)=>{

    const { categoryIdParam } = req.params

    
    let  parsedIdParam =parseInt(categoryIdParam)

    
    if(isNaN(parsedIdParam)){

        return next(new AppError(StatusCodes.BAD_REQUEST, [{ location:"path", message:"Params need to be a number" }]))

    }
    
    

    

    try{

        const category= await prisma.category.findUnique({
            where:{
                id: +categoryIdParam
            }
        })


        return res.status(StatusCodes.OK).json(
            buildResponse<CategoryDto>( {  data:{ items: [category!]} }  )
        )

    }catch(err){

        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"Something went wrong in the server" }]))
    }

        

    

}