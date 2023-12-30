import prisma from '../db';
import * as brandRepository from '../repository/brandRepository'
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { handleFileUpload } from '../helper/multer';

export const getAllBrand = async () => {
    const brand = await brandRepository.getAllBrand();
    if(!brand){
        throw new Error ("brand not found")
    }
    return brand;
}
export const getBrandById =async (id:string) => {
    const brand = await brandRepository.getBrandById(id);
    if(!brand){
        throw new Error ("brand not found")
    }
    return brand;
    
}
const brandFileFields = [
    { name: 'logo', maxCount: 1 },
    { name: 'banner', maxCount: 1 },
  ];
export const createBrand =async (brandData:any,uploadedFiles:any) => {
       if (uploadedFiles?.logo && uploadedFiles.logo.length > 1) {
        throw new Error("file must be 1");
    }
    const logo = uploadedFiles?.logo ? uploadedFiles.logo[0].filename : null;
    const banner = uploadedFiles?.banner ? uploadedFiles.banner[0].filename : null;
    const brand = prisma.brand.create({
        data : {
            id : uuidv4(),
            name : brandData.name,
            description : brandData.description,
            logo :logo,
            banner : banner,
        }
    })
    return brand;
    
}

