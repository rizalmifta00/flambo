import express from 'express'
import type { Request,Response } from 'express';
import * as brandService from '../service/brandService'
import { createSuccesfull } from './BaseResponse';
import { handleFileUpload } from '../helper/multer';
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
router.get('/:id',async (req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const brand = await brandService.getBrandById(id);
        const response = createSuccesfull("success get data","success",brand);
        res.status(200).send(response);
    }catch(err:any){
        res.status(400).send(err.message);
    }
    
})
router.post('/',handleFileUpload([{ name: "logo", maxCount: 1 }, { name: "banner", maxCount: 1 }]),async (req:Request,res:Response) => {
    try{
        const newBrand = req.body;
        const uploadedFiles = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const brand = await brandService.createBrand(newBrand,uploadedFiles);
        const response = createSuccesfull("success create data brand","success",brand);
        res.send(response);
    }catch(err:any){
        res.status(500).send(err.message);
    }
    
})
export default router;
