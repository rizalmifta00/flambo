const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().min(3).required(),
});

export const validateCategory = (category:any)=> {
    return categorySchema.validate(category);
}