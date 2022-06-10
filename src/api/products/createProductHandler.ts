import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { ProductDto } from "../../dto/productDto";
import { AppError } from "../../errors/appError";

import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";
import { formatValidationErrors } from "../../utils/formatValidationErrors";


const DEFAULT_PRODUCT_DESCRIPTION = "Default product description"

export const createProductHandler = async (req:Request, res: Response, next: NextFunction)=>{


    const valResult = validationResult(req)


    if(!valResult.isEmpty()){
        
        return next( new AppError(StatusCodes.BAD_REQUEST, formatValidationErrors(valResult.mapped()))) // valResult.mapped()) )

    }
    
    const { barcode, name, description, price, categoryId } = req.body

    try{


        const category = await prisma.category.findUnique({ where: {
            id: categoryId
        } })




        // console.log(category)

        if(!category){
            // console.log("There is no category!!!")

            return next( new AppError(StatusCodes.BAD_REQUEST,  [{ location:"categoryId", message:"Provided category does not exist" }]))
        }

        // console.log("Before the attempt to create the product")


        
        
            const createdProduct = await prisma.product.create({
                data:{ 
                    name,
                    price,
                    barcode: barcode || null,
                    description: description || DEFAULT_PRODUCT_DESCRIPTION,
                    categoryId : categoryId
                }
            })

        return res.status(StatusCodes.OK).json(
            buildResponse<ProductDto>({ data:{
                    items: [createdProduct]

            }
                    
                
            
            })
        )


        

    }catch(err){


        if(err instanceof PrismaClientValidationError)
        {

            console.log(err)
            return res.json(err)
        }


        if(err instanceof PrismaClientKnownRequestError){

            console.log(err.message)
            return res.json(err)
        }
        // if()
        // console.log(typeof err)

        // return next( new AppError(StatusCodes.BAD_REQUEST, err.message))


        return res.json(err)

    }

     
        


    

}