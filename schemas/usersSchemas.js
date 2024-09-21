import Joi, { date } from "joi"; 

import { emailRegepxp,subscriptionList } from "../costants/user-constants.js";

export const userSignupSchema = Joi.object({
    name:Joi.string().min(1).required(),
    email:Joi.string().pattern(emailRegepxp).required(), 
    birthday:Joi.string().required(),
})


