import express from 'express'
import type { Request,Response } from 'express';
import * as userService from '../service/userService';
import { createSuccesfull } from './BaseResponse';
import { checkAuthenticationAndRole} from '../middleware/auth'
const router = express.Router();


router.post('/user',checkAuthenticationAndRole,async(req:Request,res:Response)=>{
    const newUser = req.body;
   
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided.' });
      }

    const token = authHeader.split(' ')[1];


    try{
        const user = await userService.createUser(newUser,token);
        console.log(user);
        const response = createSuccesfull("success","success create data",user);
        res.status(200).send(response);
    }catch(err:any){
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


export default router