import { Router } from "express";
import { validateSignUp } from "../middlewares/signUp.middlware";
const authRouter = Router();

authRouter.post("signUp", validateSignUp, SignUp);
authRouter.post("signIn", SignIn);
