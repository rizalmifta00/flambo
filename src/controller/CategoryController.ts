import express from 'express'
import type { Request,Response } from 'express';
import { getAllCategory,getCategoryById,createCategory,updateCategory,deleteCategory } from "../service/categoryService";
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

router.get("/:id",async(req:Request,res:Response)=>{
    try{
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        const response = createSuccesfull("success","success get data",category);
        res.status(200).send(response);

    }catch(err : any){
        res.status(400).send(err.message);
    }
})

router.post("/create",async (req:Request,res:Response) => {
    try{
        const newCategory = req.body;
        console.log(newCategory);
        const category = await createCategory(newCategory);
        const response = createSuccesfull("success","success create data",category)
        res.send(response)
    }catch(err : any){
        res.status(400).send(err.message);
    }
})

router.put("/:id",async(req:Request,res:Response)=>{
   try{
    const categoryId = req.params.id;
    const categoryData = req.body;
    const category = await updateCategory(categoryId,categoryData);
    const response = createSuccesfull("success","success update data",category);
    res.send(response);
   }catch(err : any){
    res.status(400).send(err.message);
   }
})
router.delete("/:id",async (req:Request,res:Response) => {
    try{
        const categoryId = req.params.id;
        const category = await deleteCategory(categoryId);
        const response = createSuccesfull("success","success delete data", category);
        res.send(response);
    }catch(err : any){
        res.status(400).send(err.message);
    }
})
export default router