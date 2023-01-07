import { connectionDB } from "../database/db.js";

function AllPosts (){
    return connectionDB.query(`
    SELECT 
	    posts.*,
	    users.username AS username,
	    users.picture_url AS picture_url
    FROM posts
    JOIN users
        ON posts.user_id = users.id
    ORDER BY created_at DESC
    `)
}

const postsRepositories = {
    AllPosts
}

export default postsRepositories