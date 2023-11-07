import prisma from '../db'

export const findSubCategory =async () => {
    const subCategory = await prisma.sub_category.findMany();
    return subCategory;
}
export const findSubCategorybyId =async (id:string) => {
    const subCategory = await prisma.sub_category.findUniqueOrThrow({
        where: {
            id 
        },
    });
    return subCategory;
}
