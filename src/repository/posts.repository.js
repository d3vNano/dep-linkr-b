import { connectionDB } from "../database/db.js";

function allPosts (){
    return connectionDB.query(`
    SELECT 
	    posts.*,
	    users.username AS username,
	    users.picture_url AS picture_url
    FROM posts
    JOIN users
        ON posts.user_id = users.id
    ORDER BY created_at DESC
    LIMIT 20
    `)
}

function listOfUserPosts(user_id){
    return connectionDB.query(`
    SELECT 
        id, 
        link, 
        description, 
        likes 
	FROM posts
	WHERE user_id = $1
	ORDER BY created_at DESC
	LIMIT 20;
    `,[user_id])
}

const postsRepositories = {
    allPosts,
    listOfUserPosts
}

export default postsRepositories;