import Joi from "joi";

export const createEventSchema = Joi.object({
    title:Joi.string().required() ,
    description:Joi.string().required(),
    date:Joi.date().iso().required(),
    organizer:Joi.string().required() ,

})

export const updateEventSchema = Joi.object({
    title:Joi.string() ,
    description:Joi.string(),
    date:Joi.date().iso(),
    organizer:Joi.string() ,
})

