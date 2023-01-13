// import chalk from "chalk";
// import dayjs from "dayjs";

// import postsRepositories from "../repository/posts.repository.js";
// import urlMetadata from "url-metadata";
// import { connectionDB } from "../database/db.js";

// async function timelinePosts(req, res) {
//     const { token } = res.locals;

//     try {
//         const user = await connectionDB.query(
//             `
//         SELECT users.id FROM users
//         JOIN sessions ON
//             users.id = sessions.user_id
//         WHERE token = $1`,
//             [token]
//         );

//         const listPosts = await postsRepositories.listOfUserPosts(user);
//         const links = await postsRepositories.listLinks(user);

//         return res.status(200).send(links.rows);
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function postList(req, res) {
//     const { token } = res.locals;

//     try {
//         const user = await connectionDB.query(
//             `
//         select users.id from users
//             join sessions on
// users.id = sessions.user_id
//  where token = $1`,
//             [token]
//         );
//         const userId = user.rows[0].id;
//         const links = await postsRepositories.listLinks(userId);

//         const arr = [];
//         for (let i = 0; i < links.rows.length; i++) {
//             const metadata = await urlMetadata(`${links.rows[i].link}`, {
//                 descriptionLength: 250,
//             });

//             const { url, title, description, image } = metadata;
//             arr.push({
//                 metaUrl: url,
//                 metaTitle: title,
//                 metaDescription: description,
//                 metaImage: image,
//             });
//         }

//         const response = [];
//         const listPosts = await postsRepositories.listOfUserPosts(userId);
//         const postLike = listPosts.rows.id;
//         const sumLikes = await postsRepositories.sumLikes(postLike);

//         for (let i = 0; i < listPosts.rows.length; i++) {
//             const isLiked = await connectionDB.query(
//                 `SELECT * FROM likes_info WHERE user_id = $1 AND post_id = $2`,
//                 [user.rows[0].id, listPosts.rows[i].id]
//             );
//             response.push({
//                 ...listPosts.rows[i],
//                 count: sumLikes.rows[i].count,
//                 isLiked: isLiked.rows.length === 0 ? false : true,
//                 ...arr[i],
//             });
//         }

//         return res.status(200).send(response);
//     } catch (error) {
//         console.log(error);
//         return res.sendStatus(500);
//     }
// }

import chalk from "chalk";
import dayjs from "dayjs";

import postsRepositories from "../repository/posts.repository.js";
import urlMetadata from "url-metadata";
import { connectionDB } from "../database/db.js";

async function postList(req, res) {
    try {
        const link = await connectionDB.query("Select link from posts");
        const arr = [];
        for (let i = 0; i < link.rows.length; i++) {
            const metadata = await urlMetadata(`${link.rows[i].link}`, {
                descriptionLength: 110,
            });
            const { url, title, description, image } = metadata;
            arr.push({
                metaUrl: url,
                metaTitle: title,
                metaDescription: description,
                metaImage: image,
            });
        }
        const response = [];
        const listPosts = await postsRepositories.allPosts();
        for (let i = 0; i < listPosts.rows.length; i++) {
            response.push({ ...listPosts.rows[i], ...arr[i] });
        }

        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function createPost(req, res) {
    const { link, description, user_id } = req.body;

    try {
        await postsRepositories.createNewPost(link, description, user_id);

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

export { postList, createPost };
