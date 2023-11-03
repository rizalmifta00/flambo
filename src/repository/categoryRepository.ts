import prisma from '../db'


const getAllCategory = async ()=>{
    const category = await prisma.categories.findMany();
    return category;
}

const findCategoryById =async (id:string) => {
    const category = await prisma.categories.findUnique({
        where : {
            id,
        },
    });
    return category;
}