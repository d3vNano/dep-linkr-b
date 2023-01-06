import { connectionDB } from '../database/db.js';

export default function validatesSession(token, userExists){
  return connectionDB.query(
  `INSERT INTO sessions(token, user_id) VALUES ($1,$2)`,
  [token, userExists.rows[0].id]
);
  }