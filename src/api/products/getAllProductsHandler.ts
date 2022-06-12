import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errors/appError";
import { prisma } from "../../server";
import { buildResponse } from "../../utils/buildResponse";



export const DEFAULT_PAGE_SIZE =10
export const DEFAULT_PAGE = 1
const DEFAULT_SKIP =0


export const getAllProductsHandler = async (req:Request, res:Response, next:NextFunction)=>{


    const{ page, itemsPerPage } =  req.query

    const parsedPage = parseInt(page as string)  ||  DEFAULT_PAGE
    const parsedItemsPerPage = parseInt(itemsPerPage as string)  || DEFAULT_PAGE_SIZE

    // console.log((parsedPage-1) * parsedItemsPerPage)
    
    const skip = !(page===undefined && itemsPerPage===undefined )

    

    // return res.status(StatusCodes.OK).json(
    //     buildResponse({ data:{ message:"Just a confirmation message" } })
    // )

    try{

        const products = await prisma.product.findMany( {
            skip: skip? (parsedPage - 1) * parsedItemsPerPage :DEFAULT_SKIP,
            take: parsedItemsPerPage + 1
        } )

        const hasMore =  (products.length > parsedItemsPerPage)
        

    return res.status(StatusCodes.OK)
                    .json( buildResponse(
                        {  data: { 
                                
                                items:      hasMore ?  products.slice(0, products.length-1) : products, 
                                itemCount:  hasMore ?    products.length-1 : products.length, 
                                page: parsedPage, hasMore: hasMore } }) )


    }

    catch(err){

        return next(new AppError(StatusCodes.INTERNAL_SERVER_ERROR, [{ location:"server", message:"An unexpected error ocurred in the server" }]))
    }

    }