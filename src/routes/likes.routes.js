import { Router } from "express";
import { addLike } from "../controllers/likes.controllers.js";

const likesRouter = Router();

likesRouter.post("/likes", addLike);
//likesRouter.delete("/likes", deleteLike);



export default likesRouter;