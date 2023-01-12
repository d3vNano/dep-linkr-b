import postsRepositories from "../repository/posts.repository.js";
import urlMetadata from "url-metadata";
import { connectionDB } from "../database/db.js";

async function postList(req, res) {
    const {token} = res.locals;
    console.log(token);

    try {
        const link = await connectionDB.query("Select link from posts");
const user = await connectionDB.query(`select users.id from users
join sessions on
users.id = sessions.user_id
 where token = $1`,[token]);
 console.log(user,"userr");
        const arr = [];
        for (let i = 0; i < link.rows.length; i++) {
            const metadata = await urlMetadata(`http://${link.rows[i].link}`, {
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
        const postLike = listPosts.rows.id
       const sumLikes = await postsRepositories.sumLikes(postLike);
console.log(sumLikes.rows, "sum");
console.log(listPosts.rows,"list");

        for (let i = 0; i < listPosts.rows.length; i++) {
            const isLiked = await connectionDB.query(`SELECT * FROM likes_info WHERE user_id = $1 AND post_id = $2`,[user.rows[0].id, listPosts.rows[i].id])
            response.push({ ...listPosts.rows[i], count:sumLikes.rows[i].count,isLiked:isLiked.rows.length ===0?false:true, ...arr[i] });   
        
        }
   
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function createPost(req, res) {
    const { link, description } = req.body;

    res.sendStatus(201);
}

export { postList, createPost };
