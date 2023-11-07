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

router.post("/",async (req:Request,res:Response) => {
    try{
        const data = req.body;
        const subCategory = await subCategoryService.createSubCategory(data);
        const response = createSuccesfull("success","success create data", subCategory);
        res.status(200).send(response);
    }catch(err : any){
        res.status(400).send(err.message);
    }
    
})

router.put("/:id",async (req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const subCategory = await subCategoryService.updateSubCategory(id,data);
        const response = createSuccesfull("success","success update data ", subCategory);
        res.status(200).send(response);
    }catch(err :any){
        res.status(500).send(err.message);
    }
    
})
router.delete("/:id",async (req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const subCategory = await subCategoryService.deleteSubCategory(id);
        const response = createSuccesfull("success","success delete data" , subCategory);
        res.status(200).send(response);
    }catch(err : any){
        res.status(500).send(err.message);
    }
    
})

export default router;