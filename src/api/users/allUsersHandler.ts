import { NextFunction, Request, Response } from "express";
import { prisma } from "../../server";



export const allUsersHandler = async (req:Request, res: Response, next:NextFunction)=>{

    

    const  users = await prisma.user.findMany()


    return res.json(users)
}