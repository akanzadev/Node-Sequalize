import Joi from 'joi'

const userId = Joi.number().integer().min(1)
const userName = Joi.string().alphanum().min(3).max(30)
const userEmail = Joi.string().email()

export const idUserSchema = Joi.object({
  id: userId.required()
})

export const createUserSchema = Joi.object({
  name: userName.required(),
  email: userEmail.required()
})
