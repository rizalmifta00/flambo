import express from 'express'
import type { Request,Response } from 'express';
import * as authService from '../service/authService'
import { loginSuccessfull } from './BaseResponse';
import { signUpInput } from '../repository/authRepository';
import { signUpSchema } from '../validation/authValidation';
import { any } from 'joi';
import prisma from '../db'
import { v4 as uuidv4 } from 'uuid';
import {google} from 'googleapis';
import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
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

router.post('/signup',async(req:Request,res:Response)=>{
    try{
        const {error,value} = signUpSchema.validate(req.body);
        if(error){
            return res.status(400).json({ error: error.details[0].message });
            
        }
        const { email, password } = value;
        const signUpData : signUpInput = {
            email, password,
            role: 'CUSTOMER',
            isActive: true
        }
       const createAccount = await authService.signUp(signUpData);
       res.status(200).send(createAccount);
    }catch(err:any){
        res.status(500).send("Internal Server Error");
    }
})

const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET,'http://localhost:3000/auth/google/callback');
const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]
const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope : scopes,
    include_granted_scopes : true,
});

router.get('/auth/google',async (req:Request,res:Response) => {
    res.redirect(authorizationUrl);
    
});

router.get('/auth/google/callback',async (req:Request,res:Response) => {
    const {code} = req.query;
    const {tokens} = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        auth:oauth2Client,
        version : 'v2'
    });

    const {data} = await oauth2.userinfo.get();
    if(!data.email ){
        return res.json({
            data : data
        });
    }

    let account = await prisma.accounts.findUnique({
        where: {
            email : data.email
        }
    })
    if(!account){
        account = await prisma.accounts.create({
            data : {
                id: uuidv4(),
                email : data.email,
                role : Role.CUSTOMER,
                isActive : true,
                
            }
        })
    }

    const payload = {
        id : account.id,
        email : account.email,
        role : account.role
    };
    console.log(payload);
    const refreshTokenPayload = {
        id :account.id,
        email : account.email,
        role :account.role,
       
    };

const secret = process.env.JWT_SECRET!;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN!;
const expiresIn = 60 * 60 * 1;
const refreshTokenExpiresIn =  60 * 60 * 24 * 30;

const token  = jwt.sign(payload,secret,{expiresIn:expiresIn})
const refreshToken = jwt.sign(refreshTokenPayload,refreshTokenSecret,{expiresIn:refreshTokenExpiresIn});


return res.json ({
    account: {
        id :account.id,
        email : account.email,
        role : account.role
    },
    token : token,
    refreshToken : refreshToken
});

})
export default router