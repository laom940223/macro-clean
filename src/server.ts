

import express, { Response } from 'express'
import { MainErrorHandler } from './errors/globalhandler'


const app = express()



app.get("/", (_, res:Response   )=>{

    
    return res.json({message:"Hello World"})
})

app.use(MainErrorHandler)

app.listen(
    4000,
    ()=>{
    console.log("Its Aliv3")
})
