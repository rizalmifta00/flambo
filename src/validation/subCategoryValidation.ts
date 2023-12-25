const Joi = require('joi');

const subCategorySchema = Joi.object({
    categoryId :Joi.string().required(),
    name: Joi.string().min(3).required(),
});

export const validateSubCategory = (subCategory:any)=> {
    return subCategorySchema.validate(subCategory,{ abortEarly: false });
}