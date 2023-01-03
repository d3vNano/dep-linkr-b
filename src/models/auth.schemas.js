import joi from "joi";

export const signUpSchema = joi.object({
  email: joi.string().required().min(3).max(50),
  password: joi.string().required().min(6),
  username: joi.string().required().min(6).max(50),
  pictureUrl: joi.string().required().min(10),
});
