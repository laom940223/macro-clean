import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryDto } from "../../dto/categoryDto";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";




export const getCategoryById= async( req: Request, res: Response, next: NextFunction)=>{

    const { categoryIdParam } = req.params


    try{

        const category= await prisma.category.findUnique({
            where:{
                id: +categoryIdParam
            }
        })


        return res.status(StatusCodes.OK).json(
            buildResponse<CategoryDto>( { status: StatusCodes.OK, data:category }  )
        )

    }catch(err){

        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong in the server"))
    }

        

    

}