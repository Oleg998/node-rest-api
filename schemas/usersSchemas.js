import Joi, { date } from "joi"; 

import { emailRegepxp } from "../costants/user-constants.js";

export const userSignupSchema = Joi.object({
    event:Joi.string().required(),
    name:Joi.string().min(1).required(),
    email:Joi.string().pattern(emailRegepxp).required(), 
    birthday:Joi.string().required(),
})


