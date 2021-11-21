import Joi from 'joi'

const authEmail = Joi.string().email()
const authPassword = Joi.string().min(3).max(30)
const authToken = Joi.string().min(3).max(500)
export const authSchema = Joi.object({
  email: authEmail.required(),
  password: authPassword.required()
})
export const jwtSchema = Joi.object({
  authorization: authToken.required()
}).options({
  allowUnknown: true
})
