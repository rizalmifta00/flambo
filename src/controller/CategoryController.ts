import express from 'express'
import type { Request,Response } from 'express';
import { getAllCategory } from "../service/categoryService";
const router = express.Router();

router.get("/",async (req:Request,res:Response) => {
    try{
        const product = await getAllCategory();
        res.send(product);

    } catch(err : any) {
        res.status(400).send(err.message);
    }
})

export default router