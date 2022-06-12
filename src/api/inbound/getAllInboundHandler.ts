import { NextFunction, Request, Response } from "express";


export const getAllInboundsHandler = async (req: Request, res: Response, next:NextFunction)=>{

    return res.json({ message:"List all inbounds"})

}