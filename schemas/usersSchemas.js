import Joi from "joi"; 

import { emailRegepxp,subscriptionList } from "../costants/user-constants.js";

export const userSignupSchema = Joi.object({
    password:Joi.string().min(1).required(),
    email:Joi.string().pattern(emailRegepxp).required(), 

})

export const userUpdateSubscription = Joi.object({
    subscription:Joi.string().valid(...subscriptionList).required(),

})

