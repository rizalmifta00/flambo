import prisma from '../db';
import * as brandRepository from '../repository/brandRepository'
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

export const createProduct =async (productData : any,uploadedFiles:any) => {
    try{
        
        const images = [];

        for (const file of uploadedFiles?.image || []) {
            const imageUrl = file.filename;
            const image = await prisma.image.create({
                data: {
                    id: uuidv4(),
                    url: imageUrl,
                },
            });
            images.push(image);
        }
        
        const product = await prisma.product.create({
            data : {
                id : uuidv4(),
                brand : {
                    connect : {
                        id : productData.brandId
                    }
                },
                sub_child : {
                    connect : {
                        id : productData.subChildId,
                    }
                },
                name : productData.name,
                productImages: {
                    create: images.map((image) => ({
                        imageId: image.id,
                    })),
                },
            },
            
        })
        console.log(product)
 
        return {images,product};
        
    }catch (err:any){
        throw new Error ("erro create product")
    };
    
}