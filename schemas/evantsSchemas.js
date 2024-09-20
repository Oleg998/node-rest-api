import Joi from "joi";

export const createEventSchema = Joi.object({
    title:Joi.string().required() ,
    description:Joi.string().required(),
    date:Joi.string().required() ,
    organizer:Joi.string().required() ,

})

export const updateEventSchema = Joi.object({
    title:Joi.string() ,
    description:Joi.string(),
    organizer:Joi.string() ,
    date:Joi.string() ,
})

