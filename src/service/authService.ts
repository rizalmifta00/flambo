import { v4 as uuidv4 } from 'uuid';
import * as authRepository from '../repository/authRepository'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';



export const login =async (email:string,password:string) => {
    const account =  await authRepository.findByAccoundEmail(email);

    if(!account){
        throw new Error("Account not found")
    }

    const isPasswordValid = await bcrypt.compare(password,account.password);
    
    if(!isPasswordValid){
       throw new Error ("Wrong Password")
    }else{
        const payload = {
            id : account.id,
            email : account.email,
            role : account.role
        }
    
    const secret = process.env.JWT_SECRET!;
    const expiresIn = 60 * 60 * 1;

    const token  = jwt.sign(payload,secret,{expiresIn:expiresIn})

    return {
        account: {
            id :account.id,
            email : account.email,
            role : account.role
        },
        token : token
    }
    }
}

export const signUp =async (data : authRepository.signUpInput) => {
    const modifiedData :authRepository.signUpInput = {
        ...data,
        isActive : data.isActive ?? false,
        role : data.role || 'CUSTOMER'
    }
    const hashedPassword = await bcrypt.hash(modifiedData.password,10);
    modifiedData.password = hashedPassword;
    const createAccount = await authRepository.signUp(modifiedData);
    return createAccount;

}