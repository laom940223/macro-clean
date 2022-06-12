import { ProductUnit } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";
import { formatValidationErrors } from "../../utils/formatValidationErrors";



export const getOneProductUnitHandler = async (req: Request, res: Response, next: NextFunction)=>{


    const errors=  validationResult(req)

    if(!errors.isEmpty()){

        return next( new AppError(StatusCodes.BAD_REQUEST, formatValidationErrors(errors.mapped()) ))
    }

    const  { unitId } = req.params

    

    try{

        const unit = await prisma.productUnit.findUnique( { where: { id: +unitId }  } )

        return res.status(StatusCodes.OK).json( buildResponse<ProductUnit>( { data:{ items: [unit!]} } ) )

    }catch(err){

        

        return next( new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"Something went wrong in the server" }]))
    }


}