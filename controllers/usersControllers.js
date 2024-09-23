import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";

export const getUserbyEvent = async (req, res, next) => {
  const id = req.params.id
  try {
    const result = await usersService.listUsers({event:id});
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {

  try {
    const result = await usersService.listUsers();
    res.json({ result });
  } catch (error) {
    next(error);
  }
};
export const createUser = async (req, res, next) => {
  try {
    const result = await usersService.addUser({
      ...req.body
    });
    res.status(201).json(result);
  } catch (error) {
    if (error.code === 11000) { 
      return res.status(400).json({ message: 'Email and event combination already exists' });
    }
    next(error); 
  }
};

