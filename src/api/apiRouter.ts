import { Router } from "express";
import { protectedAdminRoute, protectedUserRoute } from "../middlewares/protectedRoutes";
import { usersRouter } from "./users/usersRouter";



export const apiRouter = Router()


apiRouter.use("/users", protectedAdminRoute , usersRouter)
