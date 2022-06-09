import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../server";
import { buildResponse } from "../utils/buildResponse";
import { comparePassword } from "../utils/password-utils";
import { validationResult } from 'express-validator'
import { AppError } from "../errors/appError";
import { UserDto } from "../dto/UserDto";
import { formatValidationErrors } from "../utils/formatValidationErrors";



export const loginHandler = async(req:Request, res: Response, next: NextFunction)=>{


    
    if(req.session.user){

        return res.status(StatusCodes.OK).json( buildResponse({ data:{ message: "Already logged in" }  }) )
        
    
    }

    const errors = validationResult(req)

    if(!errors.isEmpty()){

        return next(
                new AppError(
                    StatusCodes.BAD_REQUEST, 
                    formatValidationErrors( errors.mapped())
                     ))

    }


    const { email, password } = req.body

    // return res.json({message: "testing"})

    const user= await prisma.user.findUnique({
                        where:{email}
                        })

    if(user){

        

        if(await comparePassword(password, user?.password)){

            req.session.user ={
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        
            // const{ email, id, name, role } = user

            return res
                .status(StatusCodes.OK)
                .json(
                    buildResponse<UserDto>({
                        
                        data: {
                            items:[{
                                id: user.id,
                                name: user.name,
                                email:user.email,
                                role:user.role
                            }]

                        }, errors:null  }))
        }

        

    }

    return next(
                new AppError(
                    StatusCodes.BAD_REQUEST, 

                    [ 
                       {
                           location:"password",
                           message:"Please check password"
                       },
                       { 
                           location:"email",
                           message:"Please check email"
                       }
                            
                    ]
                     ))
    
        
}