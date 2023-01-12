import { Router } from "express";
import { createPost, postList } from "../controllers/posts.controllers.js";
import { validateToken } from "../middlewares/token.middleware.js";
import { validationSchema } from "../middlewares/validationSchema.middleware.js";
import publishSchema from "../models/publish.schema.js";
import { validatePublish } from "../middlewares/validatePublish.middleware.js";

const postsRouter = Router();

postsRouter.post(
    "/post",
    validationSchema(publishSchema),
    validatePublish,
    createPost
);

postsRouter.get("/timeline", validateToken, postList);

export default postsRouter;
