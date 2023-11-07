import prisma from "../db";

export const findAllSubChild =async () => {
    const subChild = await prisma.sub_child.findMany();
    return subChild;
}
export const findSubChild =async (id:string) => {
    const subChild = await prisma.sub_child.findUniqueOrThrow({
        where : {
            id : id,
        }
    });
    
}