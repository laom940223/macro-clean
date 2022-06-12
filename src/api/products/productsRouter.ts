import {   Router } from "express";
import { body, query } from "express-validator";
import { createProductHandler } from "./createProductHandler";
import { deleteProductHandler } from "./deleteProductHandler";
import { getAllProductsHandler } from "./getAllProductsHandler";
import { getOneProductHandler } from "./getOneProductHandler";
import { updateProductHandler } from "./updateProductHandler";




export const productsRouter = Router()


    productsRouter.delete("/:productId", deleteProductHandler)
    productsRouter.get("/:productId", getOneProductHandler)
    
    productsRouter.get("/",
                        query("page")
                            .optional(),
                        query("itemsPerPage")    
                            .optional()
                    , getAllProductsHandler )

    //



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
                .exists().withMessage("Need to provide a category"),
            
            body("unitId")
                .exists().withMessage("Need to provide a unit")
                

    ,createProductHandler)



    productsRouter.patch("/:productId",

                    body("name") 
                    .optional()
                    .isLength({ min: 5, max: 30  })
                        .withMessage("Name must be between 5 and 30 characters long")
                    ,
                    body("barcode")
                        .isString()
                        .optional(),

                    body("description")
                        .isString()
                        .optional(),


                        
                    body("price")
                        .optional()
                        .isFloat({ min: 0})
                            .withMessage("You can't have negative prices")

                            ,
                    body("categoryId")
                        .optional()


                            ,updateProductHandler)