import express from 'express'
import type { Request,Response } from 'express';
import * as subChildService from "../service/subChildService"
import { createSuccesfull } from './BaseResponse';
const router = express.Router();

router.get("/",async (req:Request,res:Response) => {
    try{
    const subChild = await subChildService.getAllSubChild();
    const response = createSuccesfull("success","success get data ", subChild);
    res.status(200).send(response);
    }catch(err : any){
        res.status(500).send(err.message);
    }
});

router.get("/:id",async (req:Request,res:Response) => {
    try{
        const id = req.params.id;
        const subChild = await subChildService.getSubChildById(id);
        const response = createSuccesfull("success","success get data ",subChild);
        res.status(200).send(response);
    }catch(err : any){
        res.status(500).send(err.message);
    }
});
router.post("/",async (req:Request,res:Response) => {
    try{
        const data = req.body;
        const subChild = await subChildService.createSubChild(data);
        const response = createSuccesfull("success","success create data", subChild);
        res.status(200).send(response);
    }catch(err : any){
        res.status(500).send(err.message);
    }
    
})

export default router

