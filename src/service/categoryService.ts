import {findCategory} from '../repository/categoryRepository'

export const getAllCategory = async () => {
    const categories = await findCategory();
    return categories;
}