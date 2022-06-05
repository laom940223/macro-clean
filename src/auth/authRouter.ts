import { Router } from "express";
import { loginHandler } from "./loginHandler";
import { logoutHandler } from "./logoutHandler";



export const authRouter = Router()


    authRouter.post("/login", loginHandler)
    authRouter.post("/logout", logoutHandler)