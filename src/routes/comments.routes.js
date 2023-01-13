import { Router } from "express";

import {
    insertComments,
    listComments,
} from "../controllers/comments.controllers.js";

const commentsRouter = Router();

commentsRouter.post("/comment", insertComments);
commentsRouter.get("/comments/:post_id/:logged_user_id", listComments);

export default commentsRouter;
