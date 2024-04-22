import express from "express"
import { signup ,signin,getCurrent,singnout,updateUserSubscription,updateUserAvatar,verifyUser,resentVerify} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSignupSchema ,userUpdateSubscription,verifySchema} from "../schemas/usersSchemas.js";
import authenticate from "../middlewares/authenticate.js"

import uploud from "../middlewares/uploud.js";

const authRouter = express.Router();

authRouter.get("/current",authenticate , getCurrent);

authRouter.get("/verify/:verificationToken" ,verifyUser);

authRouter.post("/register",validateBody(userSignupSchema) ,signup);

authRouter.post("/login",validateBody(userSignupSchema) ,signin);

authRouter.post("/verify",validateBody(verifySchema) ,resentVerify);

authRouter.post("/logout",authenticate , singnout);

authRouter.patch("/",authenticate ,validateBody(userUpdateSubscription) ,updateUserSubscription);

authRouter.patch("/avatars",uploud.single("avatar"), authenticate  ,updateUserAvatar);




export default authRouter;