import { Router } from "express";
import { validateSearch, validateUserId } from "../middlewares/users.middlewares.js";
import { takeInfoWithUserId, takeUserWithUsername } from "../controllers/users.controllers.js";
import { validateToken } from "../middlewares/token.middleware.js";

const usersRouter = Router();

usersRouter.get("/user/:username", validateSearch, takeUserWithUsername);
usersRouter.get("/user/:user_id/posts", validateToken, validateUserId,takeInfoWithUserId )


export default usersRouter;