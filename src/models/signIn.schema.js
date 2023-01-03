import joi from "joi";

const signInSchema = joi.object({
  email: joi.string().email().required().min(3).max(50),
  password: joi.string().required().min(6),
 });

export default signInSchema;