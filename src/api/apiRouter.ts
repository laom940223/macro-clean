import { Router } from "express";
import {  protectedAdminRoute } from "../middlewares/protectedRoutes";
import { categoryRouter } from "./categories/categoryRouter";
import { productsRouter } from "./products/productsRouter";
import { usersRouter } from "./users/usersRouter";


export const apiRouter = Router()


apiRouter.use("/users", protectedAdminRoute , usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/categories", categoryRouter)
