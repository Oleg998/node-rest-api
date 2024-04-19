import * as usersService from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
const avatarPost = path.resolve("public", "avatars");

const { JWT_SECRET } = process.env;

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const avatarURL = gravatar.url(
      email,
      { s: "100", r: "x", d: "retro" },
      true
    );
    const user = await usersService.findUser({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await usersService.signup({
      ...req.body,
      avatarURL,
      password: hashPassword,
    });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: "starter",
        avatar: avatarURL,
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
    const { _id } = req.user;
    await usersService.updateUser({ _id }, { token: "" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const { _id } = req.user;
    await usersService.updateUser({ _id }, { subscription });
    res.status(200).json({ message: "Updated User Subscription Successful" });
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (!req.file) {
      throw HttpError(400, "Downloaded File");
    }
    const { path: oldPath, filename } = req.file;
    const avatarPatch = path.resolve("public", "avatars");
    const newPath = path.join(avatarPatch, filename);
    const avatarURL = path.join("avatars", filename);
    Jimp.read(oldPath, (err, img) => {
      if (err) throw err;
      img
        .resize(250, 250) 
        .write(newPath);
    });
    await fs.rename(oldPath, newPath);
    await usersService.updateUser({ _id }, {avatarURL});
    res.status(200).json({avatarURL:`${avatarURL}`});
  } catch (error) {
    next(error);
  }
};
