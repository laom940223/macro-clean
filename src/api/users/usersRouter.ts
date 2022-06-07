
import { Router } from "express"
import { allUsersHandler } from "./allUsersHandler"
import { createUserHandler } from "./createUserHandler"
import { body  } from 'express-validator'
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "../../consts/fields-contstants";


export const usersRouter = Router()


    usersRouter.get("/",allUsersHandler )


    usersRouter.post("/",         
            body("email")
            .exists().withMessage("Email can't be empty")
            .isEmail().withMessage("Please provide a valid email")
            .normalizeEmail()
            
            ,

            body("name")
                .exists().withMessage("Name can't be empty")
                .isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })
                .withMessage(`Need to provide a name between ${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH}`)    
            ,

            body("password")
                .exists().withMessage("Password can't be empty")
                .isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })
                .withMessage(`Need to provide a password between ${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH}`)    
            ,
            body("confirmedPassword")
                .exists().withMessage("Confirmed password can't be empty")
                .isLength({ min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH })
                .withMessage(`Password must be between ${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH}`)    
            ,
            createUserHandler)