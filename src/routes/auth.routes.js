import { Router } from "express";

const authRouter = Router();

authRouter.post("signUp", SignUp);
authRouter.post("signIn", SignIn);

