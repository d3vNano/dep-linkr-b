import { connectionDB } from "../database/db.js";

// function allPosts(){
//     return connectionDB.query(`
//     SELECT
// 	    posts.*,
// 	    users.username AS username,
// 	    users.picture_url AS picture_url
//     FROM posts
//     JOIN users
//         ON posts.user_id = users.id
//     ORDER BY created_at DESC
//     LIMIT 20
//     `);
// }

function allPosts() {
    return connectionDB.query(
        `   SELECT 
                posts.*,
                users.username AS username,
                users.picture_url AS picture_url
            FROM posts
            JOIN users
                ON posts.user_id = users.id
            ORDER BY created_at DESC
            LIMIT 20`
    );
}

function sumLikes() {
    return connectionDB.query(`select posts.id ,count (likes_info.id)
    from likes_info
    full outer join posts
    on likes_info.post_id = posts.id
    Group By posts.id
    ORDER BY posts.created_at DESC
	LIMIT 20;
    `);
}



function listOfUserPosts(userId){
    return connectionDB.query(`
    select posts.*, 
    follows.follow_user_id as usuario_que_sigo 
    from posts
    join 
    follows on 
    follows.user_id = posts.user_id
    join users On
    users.id = follows.user_id
    where follows.user_id = $1
    order by posts.created_at desc
    ;
    `,
        [userId]
    );
}

function listLinks(userId) {
    return connectionDB.query(
        `
    select posts.link from posts
    join follows on 
    follows.user_id = posts.user_id
    join users On
    users.id = follows.user_id
    where follows.user_id = $1
    order by posts.created_at desc
    ;
    `,
        [userId]
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
    sumLikes,
    listLinks,
};

export default postsRepositories;
