import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'
import boom from '@hapi/boom'

const validate = (data:{}, schema:Schema) => {
  // Validar el schema con joi
  const { error } = schema.validate(data)
  return error
}

export const validationHandler = (schema:Schema, check:string) => {
  return function (req:Record<string, any> & Request, res:Response, next:NextFunction) {
    const error = validate(req[check], schema)
    error ? next(boom.badRequest(error.message)) : next()
  }
}
