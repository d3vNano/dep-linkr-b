import { connectionDB } from "../database/db.js";

export function repositorySignUp(email) {
  return connectionDB.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

export function repositoryRegistration(email, hashPassword, username, picture_url){
  return connectionDB.query(
    `INSERT INTO users (email, password, username, picture_url) 
    VALUES ($1, $2, $3, $4)`,
    [email, hashPassword, username, picture_url]);
}