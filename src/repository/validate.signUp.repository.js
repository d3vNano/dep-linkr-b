import { connectionDB } from "../database/db.js";

export function repositorySignUp(email) {
  return connectionDB.query(`SELECT * FROM users WHERE email = $1`, [email]);
}
