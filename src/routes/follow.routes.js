import { Router } from "express";
import { addFollow, getFollows } from "../controllers/follow.controllers.js";

const followRouter = Router();

followRouter.post("/follow", addFollow);
followRouter.get("/follow/:user_id/:id", getFollows);

export default followRouter;