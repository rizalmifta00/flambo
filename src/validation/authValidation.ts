const Joi = require('joi');

export const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});