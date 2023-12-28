import * as brandRepository from '../repository/brandRepository'


export const getAllBrand = async () => {
    const brand = await brandRepository.getAllBrand();
    if(brand.length === 0){
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