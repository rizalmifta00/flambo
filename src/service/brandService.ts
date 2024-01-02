import prisma from '../db';
import * as brandRepository from '../repository/brandRepository'
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

import * as fs from 'fs/promises';

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

export const updateBrandWithImages = async (id: string, brandData: any, images: { logo: string | null; banner: string | null }): Promise<any> => {
    try {
      // Lakukan validasi atau operasi lain sesuai kebutuhan
      const currentBrand = await prisma.brand.findUnique({
        where: { id: id },
      });
      console.log(currentBrand);
  
      if (!currentBrand) {
        throw new Error('Brand Not Found');
      }
  
      // Hapus gambar lama jika ada dan gambar baru diunggah
      const deleteFile = async (filename: string | null) => {
        if (filename) {
          try {
            await fs.unlink(`images/${filename}`);
            console.log(`Deleted file: ${filename}`);
          } catch (error) {
            // Handle the error here (e.g., log it)
            console.error(`Error deleting file ${filename}:`, error);
          }
        }
      };

      await deleteFile(currentBrand.logo);
      await deleteFile(currentBrand.banner);
  
      const updatedBrand = await prisma.brand.update({
        where: { id: id },
        data: {
          name: brandData.name,
          description: brandData.description,
          logo: images.logo!,
          banner: images.banner!,
        },
      });
  
      return updatedBrand;
    } catch (error) {
      throw new Error('Error updating brand with images');
    }
  };


