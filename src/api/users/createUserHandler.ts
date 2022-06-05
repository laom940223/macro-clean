import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client"
import { prisma } from "../../server";
import { hashPassword } from "../../utils/password-utils";



export const createUserHandler = async (req:Request, res:Response, next: NextFunction)=>{

    // const { username, password, name, role, email} =req.body
    const { password, email, name, username } = req.body


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

            return res.json(createdUser)

    } catch(err){
        

        if(err instanceof Prisma.PrismaClientKnownRequestError){

            console.log("Error message: " +err.message)
            console.log("Meta: " + err.meta)
            console.log("name: "+ err.name )
        }

        
        return res.json({message: " Error en el server"})
    }
        


    
}