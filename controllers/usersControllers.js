import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import { ObjectId } from 'mongodb';
export const getAllUsers = async (req, res, next) => {
  const id = req.params.id
  try {
    const result = await usersService.listUsers({event: ObjectId(id) });
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
