import express from "express"
import {getAllUsers ,createUser,getUserbyEvent } from "../controllers/usersControllers.js";



const userRouter = express.Router();

userRouter.get("/:id", getUserbyEvent);
userRouter.get("/", getAllUsers);

// contactsRouter.get("/:id", validId, getOneEvent);


userRouter.post("/register",createUser);





export default userRouter;