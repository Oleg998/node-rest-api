import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findUser({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await usersService.signup({
      ...req.body,
      password: hashPassword,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const { _id: id } = user;

    const payload = { id };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await usersService.updateUser({ _id: id }, { token });
    res.json({
      token: token,
      user: {
        email: req.body.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};
export const singnout = async (req, res, next) => {
  try {
    const {_id} = req.user;
    await usersService.updateUser({_id}, { token: "" });
    res.status(204);
  } catch (error) {
    next(error);
  }
};

export const updateUserSubscription = async(req,res , next)=>{
  try{
    const {subscription} = req.body
    if( Object.keys(req.body).length === 0) { throw HttpError(400, "Body must have at least one field");}
    const {_id} = req.user;
    const result= await usersService.updateUser({_id},{subscription})
    res.status(200).json({ message: "Updated User Subscription Successful" });
  }
  catch (error) {
    next(error);
  }
}