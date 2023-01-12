import chalk from "chalk";
import dayjs from "dayjs";

import userRepositories from "../repository/validate.user.repository.js";

async function validatePublish(req, res, next) {
    const { link, description, user_id } = req.body;

    if ((!link, !description, !user_id)) {
        res.sendStatus(400);
        return;
    }

    try {
        const hasUserId = await userRepositories.validateUser_id(user_id);

        if (!hasUserId.rows[0]) {
            res.sendStatus(404);
            return;
        }
        next();
    } catch (error) {
        console.log(
            chalk.redBright(
                dayjs().format("YYYY-MM-DD HH:mm:ss"),
                error.message
            )
        );
        res.sendStatus(500);
    }
}

export { validatePublish };
