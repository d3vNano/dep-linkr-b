import { connectionDB } from "../database/db.js";

<<<<<<< Updated upstream
function AllPosts (){
=======
function allPosts() {
>>>>>>> Stashed changes
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
    `);
}

<<<<<<< Updated upstream
const postsRepositories = {
    AllPosts
}

export default postsRepositories
=======
function listOfUserPosts(user_id) {
    return connectionDB.query(
        `
    SELECT 
        id, 
        link, 
        description, 
        likes 
	FROM posts
	WHERE user_id = $1
	ORDER BY created_at DESC
	LIMIT 20;
    `,
        [user_id]
    );
}

function createNewPost(link, description, user_id) {
    return connectionDB.query(
        `
        INSERT INTO
            posts
            (link, description, user_id)
        VALUES
            ($1, $2, $3)`,
        [link, description, user_id]
    );
}

const postsRepositories = {
    allPosts,
    listOfUserPosts,
    createNewPost,
};

export default postsRepositories;
>>>>>>> Stashed changes
