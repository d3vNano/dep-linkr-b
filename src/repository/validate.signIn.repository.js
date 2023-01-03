import { connectionDB } from "../database/db.js";

export default function validateUser(email){
  return connectionDB.query(
  "SELECT * FROM users WHERE email = $1",
  [email]
);
  }