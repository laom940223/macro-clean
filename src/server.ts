

import express, { Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()


app.listen(
    process.env.PORT,
    ()=>{
    console.log("Its Alive, on port: "+ process.env.PORT)
})