import Joi from "joi";

export const quizIdParams = Joi.object({
    quizId : Joi.string().length(24).required()
})