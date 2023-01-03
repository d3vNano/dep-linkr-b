import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running in port ${port}`));