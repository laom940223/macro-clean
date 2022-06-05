
import argon2 from 'argon2'


export const hashPassword = async (password: string)=>{
     return await argon2.hash(password)
}


export const comparePassword = async (password: string, passwordDatabase :string) : Promise<boolean>=>{
    return await argon2.verify(passwordDatabase, password)
}