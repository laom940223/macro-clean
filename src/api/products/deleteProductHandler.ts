import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductDto } from "../../dto/productDto";
import { UserDto } from "../../dto/UserDto";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";




export const deleteProductHandler =async (req:Request, res: Response, next:NextFunction)=>{

    const { productId } = req.params

    

    if(!productId){

        return next(
                new AppError(
                        StatusCodes.BAD_REQUEST,
                            [{ location:"request", message:"Id was not provided" }]
                          ))
    }



    try{

        const productToDelete = await prisma.product.findUnique({ where:{id: productId} })


        if(!productToDelete){

            return next( new AppError (StatusCodes.NOT_FOUND, [ {  location:"id", message:"The product you were trying to erase was not found" } ] ))
        }

        await prisma.product.delete({ where:{ id: productToDelete.id} })

        return res.status(StatusCodes.OK).json(

            buildResponse({ data:{ message:"Product deleted succesfully" } })

        )

    }catch(err){

        return next( new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"Something was wrong in the server" }]))
    }

}