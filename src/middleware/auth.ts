import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { error } from 'winston';
import * as authRepository from '../repository/authRepository'

export interface DecodedToken {
    id: string;
    email: string;
    role: string;
   
}


export const checkAuthenticationAndRole = async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Unauthorized: Token not provided.'});
    }

    try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET! ) as DecodedToken;
    
        const accountRole = decodedToken.role;
        
        const isCustomer = decodedToken.role === 'CUSTOMER';

        if(!isCustomer){
            return res.status(403).json({ error: 'Forbidden: User does not have the required role.' });
        }
        next();
    }catch(error){
        return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
    }
}