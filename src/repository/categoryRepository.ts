import prisma from '../db'


export const findCategory = async ()=>{
    const category = await prisma.categories.findMany();
    return category;
}

export const findCategoryById =async (id:string) => {
    const category = await prisma.categories.findUnique({
        where : {
            id,
        },
    });
    return category;
}

