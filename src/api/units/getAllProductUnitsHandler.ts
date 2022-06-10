import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";




export const getAllProductUnitsHandler = async (req:Request, res: Response, next:NextFunction)=>{



    try{


        const productUnits = await  prisma.productUnit.findMany()

        return res.status(StatusCodes.OK).json( buildResponse({ data:{ items:productUnits } }) )


    }catch(err){

        return next( new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"internal server error" }]))
    }

}