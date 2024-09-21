import express from "express"
import {getAllUsers ,createUser } from "../controllers/usersControllers.js";



const userRouter = express.Router();

userRouter.get("/current", getAllUsers);



userRouter.post("/register",createUser);





export default userRouter;