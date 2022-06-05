

import express, { Response } from 'express'
import { apiRouter } from './api/api-router'
import { MainErrorHandler } from './errors/global-error-handler'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use("/api", apiRouter)


app.use(MainErrorHandler)

app.listen(
    process.env.PORT,
    ()=>{
    console.log("Its Alive, on port: "+ process.env.PORT)
})