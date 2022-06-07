import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";


const DEFAULT_PRODUCT_DESCRIPTION = "Default product description"

export const createProductHandler = async (req:Request, res: Response, next: NextFunction)=>{


    const valResult = validationResult(req)


    if(!valResult.isEmpty()){

        return next( new AppError(StatusCodes.BAD_REQUEST, "There was an error in the server", valResult.mapped()) )

    }
    
    const { barcode, name, description, price, categoryId } = req.body

    try{


        const category = await prisma.category.findUnique({ where: {
            id: categoryId
        } })




        // console.log(category)

        if(!category){
            // console.log("There is no category!!!")

            return next( new AppError(StatusCodes.BAD_REQUEST, "",  { category: { param: "category", msg:"Need to provide an existant category", location:"body", value:null } } ))
        }

        // console.log("Before the attempt to create the product")


        
        
            await prisma.product.create({
                data:{ 
                    name,
                    price,
                    barcode: barcode || null,
                    description: description || DEFAULT_PRODUCT_DESCRIPTION,
                    categoryId : categoryId
                }
            })

        // return

        

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

     
        


    return res.status(StatusCodes.OK).json( buildResponse({ status:StatusCodes.OK, data:req.body }) )

}