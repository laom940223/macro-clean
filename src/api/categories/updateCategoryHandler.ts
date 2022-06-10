import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CategoryDto } from "../../dto/categoryDto";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";



export const updateCategoryHandler = async (req:Request, res: Response, next: NextFunction)=>{

    

    const { categoryId } = req.params
    const { name } = req.body

    try{


        const categoryToUpdate = await prisma.category.findUnique({ where:{ id: +categoryId } })


        if(!categoryToUpdate){

            return next( 
                    new AppError(
                            StatusCodes.NOT_FOUND, 
                                [{ location:"id", message:`The product with id: ${+categoryId} was not found` }]))
        }


        const updatedCategory = await prisma.category.update({ where:{ id: +categoryId}, data: { name: name }})

        return res.status(StatusCodes.OK).json( 
                        buildResponse<CategoryDto>(
                            { data:{ items: [updatedCategory] } }
                            )
                            )

    }catch(err){

        return next( new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"Something went wrong in the server" }]))
    }

}