import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { buildResponse } from "../utils/buildResponse";



export const  logoutHandler = async (req: Request, res: Response, next:NextFunction)=>{


    // if(!req.session.user){
    //     return res.status(StatusCodes.OK).json(
    //         buildResponse({ 
    //             status: StatusCodes.OK,
    //             data:{
    //                 message: "Log out "
    //             }
    //         })
    //     )
    // }


    if( req.session.user) { req.session.user =null }
    

    return res
            .status(StatusCodes.OK)
            .json(
                buildResponse({
                    status: StatusCodes.OK,
                    data: {
                        message: "Log out succesfully"
                    }
                })
            )
                    

}