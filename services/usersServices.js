import User from "../models/User.js";
export const findUser = find=>User.findOne(find);

export const signup =data=>User.create(data);

export const updateUser = (filter , data ) =>User.findOneAndUpdate(filter, data)

