import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { comparePassword } from "../utils/password-utils";




export const loginHandler = async(req:Request, res: Response, next: NextFunction)=>{

    if(req.session.user){
        return res.json({message: "You are already logged in"})
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
        
            return res.json({message: "Login successfull"})
        }

        }

    return res.json(user)
}