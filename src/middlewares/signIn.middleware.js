import { connectionDB } from "../database/db.js";
import signInSchema from "../models/signIn.schema.js";
import validateUser from "../repository/validate.signIn.repository.js";
import bcrypt from 'bcrypt';

export async function validateSignIn(req,res,next) {
  const { email, password} = req.body;

  const { error } = signInSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }

  try{
    const userExists = await validateUser(email);

    if(userExists.rows.length <= 0){
      return res.status(401).send("Usuário não cadastrado!");
    }
    const passwordOk = bcrypt.compareSync(
      password,
      userExists.rows[0].password
    );
    if (!passwordOk ) {
      return res.status(401).send("Usuário ou senha Incorreta!");
    }

  }catch (err) {
    console.log(err);
    return res.sendStatus(422);
  }
  res.locals.user = {email, password}
  next();
}