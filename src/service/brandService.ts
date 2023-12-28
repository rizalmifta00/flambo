import * as brandRepository from '../repository/brandRepository'


export const getAllBrand = async () => {
    const brand = await brandRepository.getAllBrand();
    return brand;
}