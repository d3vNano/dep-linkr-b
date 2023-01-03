import { signUpSchema } from "../models/auth.schemas.js";

export async function validateSignUp(req, res, next) {
  const { email, password, username, pictureUrl } = req.body;

  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }


  next();
}
