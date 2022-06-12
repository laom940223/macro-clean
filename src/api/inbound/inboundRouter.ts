import { Router } from "express";
import { getAllInboundsHandler } from "./getAllInboundHandler";




export const inboundsRouter = Router()


    inboundsRouter.get("/", getAllInboundsHandler)
