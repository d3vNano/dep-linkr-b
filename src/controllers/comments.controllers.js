import chalk from "chalk";
import dayjs from "dayjs";

import commentsRepository from "../repository/comment.repository.js";

async function insertComments(req, res) {
    const { comment, user_id, post_id } = req.body;

    try {
        await commentsRepository.insertComment(comment, user_id, post_id);
        res.sendStatus(201);
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

async function listComments(req, res) {
    const { post_id, logged_user_id } = req.params;

    try {
        const { postDates, commentDates } =
            await commentsRepository.getComments(post_id, logged_user_id);

        res.send({
            post: postDates.rows,
            comments: commentDates,
        });
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

export { insertComments, listComments };
