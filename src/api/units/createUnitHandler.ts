import { ProductUnit } from "@prisma/client";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";
import { formatValidationErrors } from "../../utils/formatValidationErrors";




export const createUnitHandler = async (req: Request, res: Response, next: NextFunction)=>{



    const valResult = validationResult(req)

    if(!valResult.isEmpty()){
        return next( new AppError(StatusCodes.BAD_REQUEST,formatValidationErrors(valResult.mapped()) ))
    }


    const { name, contraction } = req.body

    try{



        const existingUnit = await prisma.productUnit.findFirst({ where:{ name: name ,contraction:contraction} })


        if(existingUnit){

            return next(new AppError(StatusCodes.BAD_REQUEST, [{ location:"name", message : "This unit is already taken" }]))

        }

        const createdUnit = await prisma.productUnit.create({ 
             data:{
                 name: name,
                 contraction: contraction 
             }
        })


        return res.status(StatusCodes.OK).json(
                    buildResponse<ProductUnit>({ data:{ items:[ createdUnit] } })        
                )

    }catch(err){


        if( err instanceof PrismaClientKnownRequestError  ){

            // console.log(err.)


            if(err.code==="P2002"){

                // err.meta

                return next( new AppError(StatusCodes.BAD_REQUEST, [{ location:"contraction" , message:"This contrain is already taken" }]) )

            }

        }

        

        return next( new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"Internal server error" }]))
    }






}