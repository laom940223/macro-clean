

import express from 'express'
import dotenv from 'dotenv'
import session from "express-session"
import uid from 'uid-safe'
import { PrismaClient } from"@prisma/client"
import { apiRouter } from './api/apiRouter'
import { authRouter } from './auth/authRouter'
import { createClient } from "redis"
import { __prod__ } from './consts/prod'
import { COOKIE_MAX_AGE } from './consts/cookkie-const'
import { NotFound } from './middlewares/notFound'
import { errorHandler } from './middlewares/error/errorHandler'



declare module 'express-session' {
    interface SessionData {
      user: {
          role: string | null
          email: string | null,
          name: string | null
      } | null;
    }
  }

dotenv.config()

export const prisma = new PrismaClient()

let RedisStore = require("connect-redis")(session)



const main = async ()=>{

    const app = express()

     let redisClient = createClient({ legacyMode: true })

    await redisClient.connect()
    
    app.use(
        session({

            store: new RedisStore({ client: redisClient }),
            saveUninitialized: false,
            secret: "keyboard cat",
            genid:  ()=>{
                return   uid.sync(18)
            },
            
            cookie:{
                path: '/', 
                httpOnly: true, 
                secure: __prod__, 
                maxAge: COOKIE_MAX_AGE
            },

            resave: false,
        })
    )

    app.use(express.json())
    

    app.use("/api", apiRouter)
    app.use(authRouter)

    app.use("*", NotFound)
    app.use(errorHandler)

    app.listen(
        process.env.PORT,
        ()=>{
        console.log("Its Alive, on port: "+ process.env.PORT)
    })

}


main()

// redis@v4

