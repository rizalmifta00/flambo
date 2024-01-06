import express from 'express'
import type { Request,Response } from 'express';
import * as productService from '../service/productService'
import { createSuccesfull } from './BaseResponse';
import bodyParser from 'body-parser';
import { upload } from '../helper/multer';
const router = express.Router();


router.post('/',upload.fields([{name:'image',maxCount:5}]),async (req:Request,res:Response) => {
    try{
        const newProduct = req.body;
        console.log(newProduct);
        const uploadedFiles = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        console.log(uploadedFiles);
        const product = await productService.createProduct(newProduct,uploadedFiles);
        const response = createSuccesfull("success create product","success",product);
        res.send(response);
    }catch(err : any){
        res.status(500).send(err.message);
    }
    
})


export default router