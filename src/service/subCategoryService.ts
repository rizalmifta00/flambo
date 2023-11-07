import * as subCategoryRepository from "../repository/subCategoryRepository";
import prisma from '../db'
import { v4 as uuidv4 } from 'uuid';


export const getAllSubCategory =async () => {
    const subCategory = await subCategoryRepository.findSubCategory();
    return subCategory;
}
export const getSubCategoryFindById = async (id:string) => {
    const subCategory = await subCategoryRepository.findSubCategorybyId(id);
    if(!subCategory){
        throw("sub category not found")
    }
    return subCategory;
    
}
export const createSubCategory = async (subCategoryData:any) => {
    const subCategory = await prisma.sub_category.create({
        data :{
            id : uuidv4(),
            name : subCategoryData.name,
            category:{
                connect : {
                    id: subCategoryData.categoryId
                }
            }
        },
    });
    return subCategory;
    
}