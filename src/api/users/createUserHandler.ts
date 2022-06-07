import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client"
import { validationResult  } from "express-validator"

import { prisma } from "../../server";
import { hashPassword } from "../../utils/password-utils";
import { formatValidationErrors } from "../../errors/formatValidationErrors";
import { StatusCodes } from "http-status-codes";
import { buildResponse } from "../../utils/buildResponse";
import { AppError } from "../../errors/appError";



export const createUserHandler = async (req:Request, res:Response, next: NextFunction)=>{

    // const { username, password, name, role, email} =req.body

    const valResult = validationResult(req)

    

    if(!valResult.isEmpty()){
    
        return next(new AppError(StatusCodes.BAD_REQUEST, "", valResult.mapped()))

    }


    


    const { password, confirmedPassword , email, name } = req.body


    if(password !== confirmedPassword){

        return next(new AppError(StatusCodes.BAD_REQUEST, "", { "confirmedPassword": { msg:"Passwords must match", param:"confirmedPassword",value:null, location:'body' } }))

    }



    const alreadyInUse = await prisma.user.findUnique({ where:{email } })

    if(alreadyInUse){
        return next( new AppError(StatusCodes.BAD_REQUEST, "", { "email":{  param:"email", msg:"Email is already in use", location:"body", value:null } }))
    }


    const hashedPassword = await hashPassword(password)


    try{
        const createdUser = await prisma.user.create({
            data:{
                    password: hashedPassword,
                    email,
                    role:"USER",
                    name,
                }
            })


            // console.log("")

            return res.json( buildResponse({ status:StatusCodes.OK, data: createdUser, errors: null }) )

    } catch(err){
        

        if(err instanceof Prisma.PrismaClientKnownRequestError  ){

            // console.log(err.message.split("`")[3])


            

            switch(err.code){
               
                
                // case "P2002":1
                //     return next(new AppError(StatusCodes.BAD_REQUEST, err.message, { [err.  ]: { msg: err.message, param: err.name, location:"body", value:null  }  })) 
                
                default: return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Something went wrong in the server", null ))
            }

            // console.log("Error message: " +err.message)
            // console.log("Meta: " + err.meta)
            // console.log("name: "+ err.name )

            // console.log("Prisma Error")
        }


        if( err instanceof Prisma.PrismaClientValidationError){

            // console.log(err)

        }
        
        console.log(err)

        return next( new  AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Soomething went wrong in the server", null))
        // return res.json({message: " Error en el server"})
    }
        


    
}