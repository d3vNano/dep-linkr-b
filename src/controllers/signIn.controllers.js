import {v4 as uuidV4} from 'uuid';
import { connectionDB } from '../database/db';

export default async function signIn(req,res){
   const {email, password}= res.locals.user;

   const token = uuidV4();

  
}