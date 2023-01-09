import { Router } from "express";
import { createPost, postList } from "../controllers/posts.controllers.js";
import { validateToken } from "../middlewares/token.middleware.js";

const postsRouter = Router();

postsRouter.post("/post", createPost);
postsRouter.get("/timeline", validateToken, postList);

export default postsRouter;
