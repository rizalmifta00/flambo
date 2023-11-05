import {findCategory,findCategoryById} from '../repository/categoryRepository'
import prisma from '../db'
import { v4 as uuidv4 } from 'uuid';

export const getAllCategory = async () => {
    const categories = await findCategory();
    return categories;
}

export const  getCategoryById =async (id:string) => {
    const category = await findCategoryById(id);
    if(!category){
        throw Error("Category not found")
    }

    return category;
    
}
export const createCategory =async (categoryData:any) => {
    const category = await prisma.categories.create({
        data:{
            id : uuidv4(),
            name : categoryData.name
            
        },
    });
    return category;
}

export const updateCategory =async (id:string,categoryData : any) => {
    const category = await prisma.categories.update({
        where:{
            id : id,
        },
        data :{
            name :categoryData.name
        },
    });
    return category;
}