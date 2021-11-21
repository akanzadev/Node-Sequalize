import Joi from 'joi'

const userId = Joi.number().integer().min(1)
const userName = Joi.string().min(3).max(30)
const userEmail = Joi.string().email()
const userPassword = Joi.string().min(3).max(30)
const userAge = Joi.number().integer().min(1).max(100)
const userLastname = Joi.string().min(3).max(30)

export const idUserSchema = Joi.object({
  id: userId.required()
})

export const createUserSchema = Joi.object({
  name: userName.required(),
  email: userEmail.required(),
  lastname: userLastname.required(),
  age: userAge.required(),
  password: userPassword.required()
})
