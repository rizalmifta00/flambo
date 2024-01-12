import express, { response } from 'express'
import type { Request,Response } from 'express';
import * as productService from '../service/productService'
import { createSuccesfull } from './BaseResponse';
import bodyParser from 'body-parser';
import { upload } from '../helper/multer';
const router = express.Router();


router.get('/',async (req:Request,res:Response) => {
    try{
    const queryParams = req.query;
    const product = await productService.getAllProduct(queryParams);
    const response = createSuccesfull("success get all product", "success", product);
    res.status(200).send(response);
    }catch(err:any){
        res.status(500).send(err.message);
    }
    
})
router.get('/:id',async (req:Request,res:Response) => {
    const  productId = req.params.id;
    try{
        const product = await productService.getProductById(productId);
        const response =createSuccesfull(`success get product by id ${productId}`,'success',product );
        res.status(200).send(response);
    }catch(err:any){
        res.status(500).send(err.message);
    }
    
})
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