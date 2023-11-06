import express from 'express'
import type { Request,Response } from 'express';
import * as subCategoryService from "../service/subCategoryService";
import { createSuccesfull } from './BaseResponse';
const router = express.Router();

router.get("/",async (req:Request,res:Response) => {
    try{
    const subCategory = await subCategoryService.getAllSubCategory()
    const response = createSuccesfull("success","success get data", subCategory);
    res.status(200).send(response);
    }catch(err : any){
        res.status(500).send(err.message);
    }
})
router.get("/:id",async (req:Request,res:Response) => {
    try{
        const subCategoryId = req.params.id;
        const subCategory = await subCategoryService.getSubCategoryFindById(subCategoryId);
        const response = createSuccesfull("success","success get data",subCategory);
        res.status(200).send(response);
    }catch(err : any){
        res.status(500).send(err.message);
    }
})

export default router;