import { connectionDB } from "../database/db.js";

import followsRepository from "./follows.repository.js";
import { isFollowing } from "../services/follow.services.js";

async function getComments(post_id, logged_user_id) {
    /*preciso dos dados:
    foto do usuario,
    nome do usuario,
    estado do follow,
    id do usuario,
    comentario do usuario,
    */
    const postDates = await connectionDB.query(
        `
        SELECT
            posts.id,
            posts.user_id AS author_id
        FROM
            posts
        JOIN
            users
        ON
            posts.user_id = users.id
        WHERE
            posts.id = $1`,
        [post_id]
    );

    const { rows } = await connectionDB.query(
        `
        SELECT
            comments.id,
            comments.user_id AS comment_user_id,
            comments.comment AS comment_text, 
            users.username AS comment_username,
            users.picture_url AS comment_picture_url
        FROM
            comments
        JOIN
            users
        ON
            comments.user_id = users.id
        JOIN
            posts
        ON
            posts.id = comments.post_id
        WHERE
            posts.id = $1`,
        [post_id]
    );
    const commentDates = [];

    for (const comment of rows) {
        const comment_user_id = comment.user_id;

        const followExists = await followsRepository.getFollow(
            logged_user_id,
            comment_user_id
        );

        let result = await isFollowing(followExists);

        commentDates.push({ ...comment, follower: result });
    }

    return { postDates, commentDates };
}

async function insertComment(comment, user_id, post_id) {
    return connectionDB.query(
        `
        INSERT INTO
            comments
            (comment, user_id, post_id)
        VALUES
            ($1, $2, $3)`,
        [comment, user_id, post_id]
    );
}

const commentsRepository = {
    getComments,
    insertComment,
};

export default commentsRepository;
