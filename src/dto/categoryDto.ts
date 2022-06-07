import { Category } from "@prisma/client"
import { ProductDto } from "./productDto"



export type CategoryDto ={

    id: number, 
    name: string
    products?: ProductDto[] 
}

export const toCategoryDto= (category: Category)=>{


    
    return {
        category
    }
}