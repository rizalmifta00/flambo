import prisma from '../db'

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