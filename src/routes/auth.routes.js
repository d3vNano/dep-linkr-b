import { Router } from "express";
import signIn from "../controllers/signIn.controllers.js";
import signUp from "../controllers/signUp.controllers.js";
import { validateSignUp } from "../middlewares/signUp.middleware.js";
const authRouter = Router();

authRouter.post("/signup",validateSignUp, signUp);
authRouter.post("signin",signIn);

export default authRouter;
