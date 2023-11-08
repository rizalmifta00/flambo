import * as subChildRepository from '../repository/subChildRepository'
import prisma from '../db'
import { v4 as uuidv4 } from 'uuid';

export const getAllSubChild =async () => {
    const subChild = await subChildRepository.findAllSubChild()
    if(!subChild){
        throw ("sub Child Not Found")
    }
    return subChild;
}
export const getSubChildById =async (id:string) => {
    const subChild = await subChildRepository.findSubChild(id);
      return subChild;
    
}
export const createSubChild =async (subChildData:any) => {
    const subChild = await prisma.sub_child.create({
        data : {
            id : uuidv4(),
            name : subChildData.name,
            sub_category : {
                connect : {
                    id : subChildData.subCategoryId,
                }
            },
        }
    });
}

export const updateSubChild =async (id:string, subChildData : any) => {
    const subChild = await prisma.sub_child.update({
        where : {
            id : id,
        },
        data : {
            name : subChildData.name,
            sub_category : {
                connect : {
                    id : subChildData.subCategoryId,
                }
            }
        },
    });
}

export const deleteSubChild =  async (id:string) => {
    const subChild = await prisma.sub_child.delete({
        where : {
            id: id,
        },
    });
}
