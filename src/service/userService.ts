import prisma from '../db'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '../middleware/auth';

export const createUser = async (userData: any, token: string) => {
    try {
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
       const accountId = decodedToken.id;
       console.log(accountId);
   
       if (!userData || !userData.name || !userData.phone || !userData.skinType) {
         throw new Error("Invalid user data");
       }
       const user = await prisma.user.create({
         data: {
           id: uuidv4(),
           name: userData.name,
   
           account: {
             connect: {
               id: accountId,
             },
           },
           phone: userData.phone,
           skinType: userData.skinType,
         },
       });
       return user;
    } catch (err: any) {
       throw Error("failed to create user");
    }
   };