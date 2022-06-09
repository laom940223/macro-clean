import { Router } from "express";
import { body, param } from "express-validator";
import { createCategoryHandler } from "./createCategoryHandler";
import { getAllCategoriesHandler } from "./getAllCategoriesHandler";
import { getCategoryById } from "./getCategoryById";



export const categoryRouter =  Router()


    categoryRouter.get("/", getAllCategoriesHandler)
    categoryRouter.get("/:categoryIdParam", 
        param("categoryIdParam")
        
            .isAlpha().withMessage("Category id needs to be a number")
        ,
    getCategoryById)


    categoryRouter.post("/",
        body("name")
            .exists().withMessage("Need to provide a name for the category")
            .isLength({ min: 5, max: 30 }).withMessage("Category name must be between 5 and 30 characters")

        ,createCategoryHandler)