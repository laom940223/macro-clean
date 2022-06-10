import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ProductDto } from "../../dto/productDto";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";




export const getOneProductHandler = async (req:Request, res: Response, next: NextFunction)=>{

    const { productId } = req.params

    

    try{

        const product = await prisma.product.findUnique({
            where:{
                id:productId
            }
        })

        if(!product){
            return next(new AppError(StatusCodes.NOT_FOUND, [{ location:"request", message:`The product with id: ${productId} was not found` }]))
        }
 
        return res.status(StatusCodes.OK).json( buildResponse<ProductDto>( { data:{ items: [product]} }))

    }catch(err){

        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"Somehing went wrong in the server" }]))

    }


}