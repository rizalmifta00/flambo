import { Role } from '@prisma/client'
import prisma from '../db'


 export interface signUpInput{
    email : string,
    password : string,
    role : Role,
    isActive :boolean
}
export const findByAccoundEmail =async (email:string) => {
    const account = await prisma.accounts.findUnique({
        where : {
            email,
        },
    })
    if(!account){
        throw Error("Account not found")
    }
    return account;
    
}
export const signUp = async (data: signUpInput) => {
    const createAccount = await prisma.accounts.create({
        data,
    });

    return createAccount;
}