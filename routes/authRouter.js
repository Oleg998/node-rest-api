import express from "express"
import { signup ,signin,getCurrent,singnout,updateUserSubscription} from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSignupSchema ,userUpdateSubscription} from "../schemas/usersSchemas.js";
import authenticate from "../middlewares/authenticate.js"
const authRouter = express.Router();

authRouter.post("/register",validateBody(userSignupSchema) ,signup);

authRouter.post("/login",validateBody(userSignupSchema) ,signin);

authRouter.get("/current",authenticate , getCurrent);

authRouter.post("/logout",authenticate , singnout);

authRouter.patch("/",authenticate ,validateBody(userUpdateSubscription) ,updateUserSubscription);

export default authRouter;