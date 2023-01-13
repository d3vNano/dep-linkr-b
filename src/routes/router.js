import { Router } from "express";

import authRouter from "./auth.routes.js";
import usersRouter from "./user.routes.js";
import hashtagsRouter from "./hashtags.routes.js";
import postsRouter from "./posts.routes.js";
import likesRouter from "./likes.routes.js";
import followRouter from "./follow.routes.js";
import commentsRouter from "./comments.routes.js";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(hashtagsRouter);
router.use(postsRouter);
router.use(likesRouter);
router.use(followRouter);
router.use(commentsRouter);

export default router;
