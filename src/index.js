import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import usersRouter from "./routes/user.routes.js";
import postsRouter from "./routes/posts.routes.js";
import hashtagsRouter from "./routes/hashtags.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(usersRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running in port ${port}`));
