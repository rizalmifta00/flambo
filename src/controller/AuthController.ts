import express from 'express'
import type { Request,Response } from 'express';
import * as authService from '../service/authService'
import { loginSuccessfull } from './BaseResponse';
const router = express.Router();


router.post("/login",async (req:Request,res:Response) => {
    try{
        const {email, password} = req.body;
        const result = await authService.login(email,password);
        const response = loginSuccessfull('success','login successfully',result);
        res.status(200).send(response);
    }catch(err:any){
        if (err.message === 'Account not found' || err.message === 'Wrong Password') {
            res.status(401).send('Wrong email or password');
        } else {
            console.error(err); // Log the error for debugging purposes
            res.status(500).send('Internal Server Error');
        }

    }
})
export default router