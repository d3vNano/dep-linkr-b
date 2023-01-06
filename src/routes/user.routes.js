import { Router } from "express";
import { validateSearch } from "../middlewares/users.middlewares.js";
import { takeUserWithUsername } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get("/user/:username", validateSearch, takeUserWithUsername);

export default usersRouter;