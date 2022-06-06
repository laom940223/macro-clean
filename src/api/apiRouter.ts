import { Router } from "express";
import {  protectedUserRoute } from "../middlewares/protectedRoutes";
import { usersRouter } from "./users/usersRouter";



export const apiRouter = Router()


apiRouter.use("/users", protectedUserRoute , usersRouter)

