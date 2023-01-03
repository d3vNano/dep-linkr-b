import { Router } from "express";
import { validateSignUp } from "../middlewares/signUp.middlware.js";
const authRouter = Router();

authRouter.post("signUp", validateSignUp);
authRouter.post("signIn");

export default authRouter;
