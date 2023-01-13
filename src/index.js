import chalk from "chalk";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/router.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(chalk.bold.cyan(`[Listening ON] Port: ${PORT}`));
});
