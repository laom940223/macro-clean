import { Router } from "express";
import {  protectedAdminRoute } from "../middlewares/protectedRoutes";
import { categoryRouter } from "./categories/categoryRouter";
import { productsRouter } from "./products/productsRouter";
import { unitsRouter } from "./units/unitsRouter";
import { usersRouter } from "./users/usersRouter";


export const apiRouter = Router()


apiRouter.use("/users",  usersRouter)
apiRouter.use("/products", productsRouter)
apiRouter.use("/categories", categoryRouter)
apiRouter.use("/product-units", unitsRouter)
