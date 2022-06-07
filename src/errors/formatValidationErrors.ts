
import { ValidationError } from 'express-validator'
import { AppErrorResponse } from '../utils/buildResponse'


export const formatValidationErrors = (errors : Record<string, ValidationError>)=>{


    let arrayErrors : AppErrorResponse[] = [] 
    
    Object.keys(errors).map((key)=>{

        const {  } = errors[key]

         arrayErrors
                .push( { field:  errors[key].param,  message: errors[key].msg, trace: null }
                        )

    })

    return arrayErrors

}