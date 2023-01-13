import { Router } from "express";

const commentsRouter = Router();

commentsRouter.get("/comments");
commentsRouter.post("/comments");


export default commentsRouter;