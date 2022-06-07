import { Router } from "express";
import {  protectedAdminRoute } from "../middlewares/protectedRoutes";
import { usersRouter } from "./users/usersRouter";


export const apiRouter = Router()


apiRouter.use("/users", usersRouter)

