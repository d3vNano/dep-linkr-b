import { Router } from "express";
import {getBestHashtags, getPostsByHashtag} from "../controllers/hashtags.controllers.js";

const hashtagsRouter = Router();

hashtagsRouter.get("/hashtags", getBestHashtags);
hashtagsRouter.get("/hashtag:/hashtag", getPostsByHashtag);



export default hashtagsRouter;