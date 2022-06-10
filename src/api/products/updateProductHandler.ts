import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { ProductDto } from "../../dto/productDto";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";
import { formatValidationErrors } from "../../utils/formatValidationErrors";




export const updateProductHandler =async  (req:Request, res: Response, next: NextFunction)=>{

    const { productId } = req.params 
 
    const valResult = validationResult(req)
    
    if(!valResult.isEmpty()){
    
        return next( new AppError(StatusCodes.BAD_REQUEST, formatValidationErrors(valResult.mapped()))) // valResult.mapped()) )
    }


    const { barcode, name, description, price, categoryId } = req.body

    try{

        const productToUpdate = await prisma.product.findUnique({ where: {
            id: productId
            }})


            // return res.json(productToUpdate)

            if(!productToUpdate){
                return next( 
                        new AppError(
                                StatusCodes.NOT_FOUND, 
                                [{ location:"request", message:`The product with id: ${productId} was not found` } ]))
            }

            

            if( !!categoryId  && (categoryId !== productToUpdate.categoryId)){
                
                const categoryToUpdate = await prisma.category.findUnique( { 
                                where:{
                                    id: categoryId
                                }})


                if(!categoryToUpdate){

                    return next(
                             new AppError(
                                    StatusCodes.BAD_REQUEST,
                                    [{location:"categoryId", message:"Please provide a valid category"}]
                             ))
                }
            }


            const updatedProduct = await prisma.product.update({
                where:{ 
                    id:productId
                },
                data:{
                    barcode: barcode || productToUpdate.barcode,
                    description: description || productToUpdate.description,
                    name: name || productToUpdate.name,
                    price: price || productToUpdate.price,
                    categoryId: categoryId || productToUpdate.categoryId
                    
                }
            })


            return res.status(StatusCodes.OK).json (

                    buildResponse<ProductDto>( { data:{ items: [ updatedProduct] } } )
                )


    }catch(err){

        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"something went wrong" }]))

    }


}