import prisma from '../db'

export const getAllBrand =async () => {
    const brand = await prisma.brand.findMany();
    if (brand.length === 0) {
        throw new Error("Brand not found");
      }
    return brand;
}

export const getBrandById =async (id:string) => {
    const brand = await prisma.brand.findUnique({
        where:{
            id
        }   
    })
    return brand;
    
}