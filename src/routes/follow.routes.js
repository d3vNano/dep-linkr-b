import { Router } from "express";
import { addFollow } from "../controllers/follow.controllers.js";

const followRouter = Router();

followRouter.post("/follow", addFollow);


export default followRouter;