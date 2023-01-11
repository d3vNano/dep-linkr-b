import { connectionDB } from "../database/db.js";

function validateUsername(username){
    return connectionDB.query(`
        SELECT
            id,
            username,
            picture_url
        FROM users
        WHERE username
        ILIKE $1
    `,[`${username}%`]);
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