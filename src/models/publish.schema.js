import joi from "joi";

const publishSchema = joi.object({
    link: joi.string().uri().required(),
    description: joi.string().min(3).max(120).required(),
    user_id: joi.number().required(),
});

export default publishSchema;
