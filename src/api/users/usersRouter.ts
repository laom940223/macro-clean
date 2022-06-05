
import { Router } from "express"
import { allUsersHandler } from "./allUsersHandler"
import { createUserHandler } from "./createUserHandler"


export const usersRouter = Router()


    usersRouter.get("/", allUsersHandler )
    usersRouter.post("/", createUserHandler)