import { connectionDB } from "../database/db.js";

function validateUsername(username, user_id){
    return connectionDB.query(`
    select users.id, users.username, users.picture_url, follows.follow_user_id 
    from users
    join follows on
    users.id = follows.user_id 
    where users.username ILIke $1
    and follows.user_id = $2
    order by follows.follow_user_id`, [`${username}%`, user_id])
};

function validateUser_id(user_id){
    return connectionDB.query(`
        SELECT id FROM users WHERE id = $1
    `, [user_id]);
};

function postsUser_id(user_id){
    return connectionDB.query(`
        SELECT
            id,
            username,
            picture_url
        FROM users
        WHERE id = $1
    `,[user_id])
};

const userRepositories = {
    validateUsername,
    validateUser_id,
    postsUser_id
};

export default userRepositories;