import joi from "joi";

const signUpSchema = joi.object({
  email: joi.string().email().required().min(3).max(50),
  password: joi.string().required().min(6),
  username: joi.string().required().min(6).max(50),
  picture_url: joi.string().required().min(10),
});

export default signUpSchema;
