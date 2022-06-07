import { Router } from "express";
import { loginHandler } from "./loginHandler";
import { logoutHandler } from "./logoutHandler";
import { body } from 'express-validator'


export const authRouter = Router()


    authRouter.post("/login",
        body("email")
            .exists()
                .withMessage("Email is required")
            .normalizeEmail()
            .isEmail()
                .withMessage("Provide a valid email")
                
        ,loginHandler)

    authRouter.post("/logout", logoutHandler)