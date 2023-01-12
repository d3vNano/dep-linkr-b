import bcrypt from "bcrypt";
import { repositoryRegistration } from "../repository/validate.signUp.repository.js";

export default async function signUp(req, res) {
  const { email, password, username, picture_url } = res.locals.user;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    await repositoryRegistration(email, hashPassword, username, picture_url);

    return res.status(201).send("Cadastro feito com sucesso");
  } catch (err) {
    return res.status(400).send(err);
  }
}
