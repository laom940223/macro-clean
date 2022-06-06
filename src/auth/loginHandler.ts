import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../server";
import { buildResponse } from "../utils/buildResponse";
import { comparePassword } from "../utils/password-utils";




export const loginHandler = async(req:Request, res: Response, next: NextFunction)=>{

    if(req.session.user){

        return res.json( buildResponse({ status: StatusCodes.OK, errors: null, data:{ message: "Already logged in" }  }) )
        // return res.json({message: "You are already logged in"})
    
    }

    const { email, password } = req.body

    const user= await prisma.user.findUnique({
                        where:{email}
                        })

    if(user){

        if(await comparePassword(password, user?.password)){


            req.session.user ={
                email: user.email,
                name: user.name,
                role: user.role
            }
        
            const{ email, id, name, role } = user

            return res
                .json(buildResponse<{message:string, user : {  id: number,email: string , name: string | null, role: string }}>({
                     status: StatusCodes.OK,
                    data:{ 
                        message: "Login successfully",
                        user: {
                            id, 
                            name,
                            email,
                            role
                        }
                    }  }))
        }

        

    }

    return res
            .status(StatusCodes.BAD_REQUEST)
            .json( 
                buildResponse(
                    { status: StatusCodes.BAD_REQUEST , 
                        errors : [{ 
                            message:`The username or password provided are incorrect `, 
                            field: "request", 
                            trace:null }] }) )

    
}