import express from 'express'
import type { Request,Response } from 'express';
import { getAllCategory } from "../service/categoryService";
import { createSuccesfull } from './BaseResponse';
const router = express.Router();

router.get("/",async (req:Request,res:Response) => {
    try{
        const categories = await getAllCategory();
        const response = createSuccesfull("success","success get data",categories)
        res.status(200).send(response);

    } catch(err : any) {
        res.status(400).send(err.message);
    }
})

export default router