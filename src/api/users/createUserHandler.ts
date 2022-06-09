import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client"
import { validationResult  } from "express-validator"

import { prisma } from "../../server";
import { hashPassword } from "../../utils/password-utils";

import { StatusCodes } from "http-status-codes";
import { buildResponse } from "../../utils/buildResponse";
import { AppError } from "../../errors/appError";
import { UserDto } from "../../dto/UserDto";
import { formatValidationErrors } from "../../utils/formatValidationErrors";



export const createUserHandler = async (req:Request, res:Response, next: NextFunction)=>{

    // const { username, password, name, role, email} =req.body

    const valResult = validationResult(req)

    

    if(!valResult.isEmpty()){
    
        return next(new AppError(StatusCodes.BAD_REQUEST,  formatValidationErrors(valResult.mapped())))

    }


    


    const { password, confirmedPassword , email, name } = req.body


    if(password !== confirmedPassword){

        return next(new AppError(StatusCodes.BAD_REQUEST, [{ location:"confirmedPassword", message:"Passwords must match" }]))

    }



    const alreadyInUse = await prisma.user.findUnique({ where:{email } })

    if(alreadyInUse){
        return next( new AppError(StatusCodes.BAD_REQUEST, [{ location:"email", message:"Email is already taken select another one" }]))
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

            // const { password } = createdUser


            createdUser.id
            // console.log("")

            return res.json( buildResponse<UserDto>({ 
                        
                        data: {
                            
                            items:
                                [{
                                    id: createdUser.id,
                                    email: createdUser.email,
                                    name: createdUser.name,
                                    role: createdUser.role,
                                    createdAt: createdUser.createdAt  
                                }] 
                            }}))

    } catch(err){
        

        if(err instanceof Prisma.PrismaClientKnownRequestError  ){

            // console.log(err.message.split("`")[3])


            

            switch(err.code){
               
                
                // case "P2002":1
                //     return next(new AppError(StatusCodes.BAD_REQUEST, err.message, { [err.  ]: { msg: err.message, param: err.name, location:"body", value:null  }  })) 
                
                default: return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{location:"server", message:"Somethig went wrong in the server"}]))
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

        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{location:"server", message:"Somethig went wrong in the server"}]))
        // return res.json({message: " Error en el server"})
    }
        


    
}