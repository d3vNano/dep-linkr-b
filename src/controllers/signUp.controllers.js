import { connectionDB } from "../database/db.js";
import bcrypt from 'bcrypt';
import {v4 as uuidV4} from 'uuid';

export default async function signUp(req, res){
  const { email, password, username, picture_url } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try{
    await connectionDB.query(
      `INSERT INTO users (email, password, username, picture_url) 
      VALUES ($1, $2, $3, $4)`,
      [email, hashPassword, username, picture_url]);
return res.status(201).send("Cadastro feito com sucesso");
  }catch (err) {
    return res.status(400).send(err);
  }
}