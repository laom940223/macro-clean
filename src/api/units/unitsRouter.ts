import { Router } from "express";
import { body, param as expressParam } from "express-validator";
import { getOneProductHandler } from "../products/getOneProductHandler";
import { createUnitHandler } from "./createUnitHandler";
import { getAllProductUnitsHandler } from "./getAllProductUnitsHandler";
import { getOneProductUnitHandler } from "./getOneProductUnitHandler";




export const unitsRouter = Router()


unitsRouter.post("/", 
            body("name")
                .exists().withMessage("Need to provide a name for the unit")
                .isLength({ min:2, max:50 }) .withMessage("Must be at least 2 characters long"),

            body("contraction")
                .exists().withMessage("Need to provide a contraction for the unit")
            ,
            createUnitHandler)


unitsRouter.get("/", getAllProductUnitsHandler)

unitsRouter.get("/:unitId",

                expressParam("unitId")
                    .isNumeric()
                    .withMessage("unitId needs to be a number")
                    ,getOneProductUnitHandler)
            
                