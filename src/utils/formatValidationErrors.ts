import { ValidationError } from "express-validator";
import { ErrorDetail } from "../errors/appError";




export const formatValidationErrors =(errors: Record<string, ValidationError>)=>{


    
    let arrayErrors : ErrorDetail[] = [] 
    
    Object.keys(errors).map((key)=>{

        // const {  } = errors[key]

         arrayErrors
                .push( { location:  errors[key].param,  message: errors[key].msg }
                        )

    })

    return arrayErrors


}