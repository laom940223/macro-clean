

import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from"@prisma/client"


dotenv.config()

const app = express()


const prisma = new PrismaClient()

app.get("/users", async (req:Request, res:Response)=>{


    const users = await prisma.user.findMany()
    
    console.log(users)

    return res.json(users)
})

app.listen(
    process.env.PORT,
    ()=>{
    console.log("Its Alive, on port: "+ process.env.PORT)
})