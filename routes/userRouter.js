import express from "express"
import {getAllUsers ,createUser } from "../controllers/usersControllers.js";



const userRouter = express.Router();

userRouter.get("/:id", getAllUsers);

// contactsRouter.get("/:id", validId, getOneEvent);


userRouter.post("/register",createUser);





export default userRouter;