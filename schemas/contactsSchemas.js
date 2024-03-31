import Joi from "joi";

export const createContactSchema = Joi.object({
    name:Joi.string().required() ,
    email:Joi.string().required(),
    phone:Joi.string().min(4).max(20).pattern(/^[\d+()[\]\s-]+$/).required()

})

export const updateContactSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string(),
    phone:Joi.string().min(4).max(20).pattern(/^[\d+()[\]\s-]+$/)
})