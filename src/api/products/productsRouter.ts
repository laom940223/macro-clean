import {  Router } from "express";
import { body } from "express-validator";
import { createProductHandler } from "./createProductHandler";
import { getAllProductsHandler } from "./getAllProductsHandler";




export const productsRouter = Router()


    
    productsRouter.get("/", getAllProductsHandler )

    productsRouter.post("/",
    

            body("name") 
                .exists().withMessage("Need to provide a name for the product")
                .isLength({ min: 5, max: 30  })
                    .withMessage("Name must be between 5 and 30 characters long")
            ,
            
            body("price")
                .exists().withMessage("Need to provide a price for the product")
                .isFloat({ min: 0})
                    .withMessage("You can't have negative prices")
            
                    ,
            body("categoryId")
                .exists().withMessage("Need to provide a category")
                

    ,createProductHandler)