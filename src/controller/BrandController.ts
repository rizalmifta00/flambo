import express from 'express'
import type { Request,Response } from 'express';
import * as brandService from '../service/brandService'
import { createSuccesfull } from './BaseResponse';
const router = express.Router();

router.get('/',async (req:Request,res:Response) => {
    try{
    const brand = await brandService.getAllBrand();
    const response = createSuccesfull("success","success get data brand", brand);
    res.status(200).send(response)
    }catch(err : any){
        res.status(400).send(err.message);
    }
    
})
export default router;