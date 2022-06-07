import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";



export const getAllProductsHandler = async (req:Request, res:Response, next:NextFunction)=>{


    try{

        const products = await prisma.product.findMany({ take:5 })


    return res.status(StatusCodes.OK).json( buildResponse({ status:StatusCodes.OK, data:products }) )


    }

    catch(err){

        return next(err)
    }

    }