import {   Router } from "express";
import { body, query } from "express-validator";
import { createProductHandler } from "./createProductHandler";
import { deleteProductHandler } from "./deleteProductHandler";
import { getAllProductsHandler } from "./getAllProductsHandler";




export const productsRouter = Router()


    
    productsRouter.get("/",
                        query("page")
                            .optional(),
                        query("itemsPerPage")    
                            .optional()
                    , getAllProductsHandler )

    //



    productsRouter.delete("/:productId", deleteProductHandler)

    productsRouter.post("/",
    

            body("name") 
                .exists().withMessage("Need to provide a name for the product")
                .isLength({ min: 5, max: 30  })
                    .withMessage("Name must be between 5 and 30 characters long")
            ,
            body("barcode")
                .optional(),

            body("description")
                .optional(),

            
                
            body("price")
                
                .exists().withMessage("Need to provide a price for the product")
                .isFloat({ min: 0})
                    .withMessage("You can't have negative prices")
            
                    ,
            body("categoryId")
                .exists().withMessage("Need to provide a category")
                

    ,createProductHandler)