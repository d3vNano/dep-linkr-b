import { connectionDB } from "../database/db.js";

export default function validateUsername(username){
    return connectionDB.query(`
        SELECT
            id,
            username,
            picture_url
        FROM users
        WHERE username
        LIKE $1
    `,[`${username}%`])
};