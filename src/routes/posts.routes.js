import { Router } from "express";
import { postList } from "../controllers/posts.controllers.js";
import { validateToken } from "../middlewares/token.middleware.js";

const postsRouter = Router();

postsRouter.get("/timeline", validateToken, postList);

export default postsRouter;