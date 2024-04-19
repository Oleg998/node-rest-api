import express from "express"
import { signup ,signin,getCurrent,singnout,updateUserSubscription,updateUserAvatar} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSignupSchema ,userUpdateSubscription} from "../schemas/usersSchemas.js";
import authenticate from "../middlewares/authenticate.js"

import uploud from "../middlewares/uploud.js";

const authRouter = express.Router();

authRouter.post("/register",validateBody(userSignupSchema) ,signup);

authRouter.post("/login",validateBody(userSignupSchema) ,signin);

authRouter.get("/current",authenticate , getCurrent);

authRouter.post("/logout",authenticate , singnout);

authRouter.patch("/",authenticate ,validateBody(userUpdateSubscription) ,updateUserSubscription);

authRouter.patch("/avatars",uploud.single("avatar"), authenticate  ,updateUserAvatar);


export default authRouter;