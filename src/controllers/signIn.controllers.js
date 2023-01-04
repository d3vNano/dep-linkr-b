import {v4 as uuidV4} from 'uuid';
import { connectionDB } from '../database/db.js';
import validateUser from '../repository/validate.signIn.repository.js';

export default async function signIn(req,res){
   const {email, password}= res.locals.user;

   const token = uuidV4();

   try {
    const userExists = await validateUser(email);
 
    await connectionDB.query(
      `INSERT INTO sessions(token, user_id) VALUES ($1,$2)`,
      [token, userExists.rows[0].id]
    );
  
   return res.status(200).send({ token, name: userExists.name });
  } catch (err) {
    console.log(err);
    return res.sendStatus(422);
  }

  }