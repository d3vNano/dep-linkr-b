import { connectionDB } from "../database/db.js";
import signUpSchema from "../models/signUp.schema.js";
import {repositorySignUp} from "../repository/validate.signUp.repository.js"

export async function validateSignUp(req, res, next) {
  const { email, password, username, pictureUrl } = req.body;

  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }
  try{
    const userExists = await repositorySignUp(email);
    
    if(userExists.rows.length !==0){
      return res.status(409).send({message: "Esse email já existe!"});
    }
   }catch(err){
    res.status(500).send(err.message);
   }
  res.locals.user = { email, password, username, pictureUrl }
  next();
}
