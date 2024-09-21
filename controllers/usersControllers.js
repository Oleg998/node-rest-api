import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";

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
    next(error);
  }
};
