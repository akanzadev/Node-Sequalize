import boom from '@hapi/boom'
import { Response, Request, NextFunction } from 'express'
import { config } from '../../config/config'

// Imprimir errores generados en consola
export const logErrors = (error : boom.Boom, req:Request, res:Response, next :NextFunction) => {
  console.error(error.stack)
  next(error)
}

// Parsear errores a Boom
export const wrapErrors = (error : boom.Boom, req:Request, res:Response, next :NextFunction) => {
  // Convirtiendo error a boom error
  if (!error.isBoom) next(boom.badImplementation(error.message, null))
  next(error)
}

const withErrorStack = (error : {}, stack = 'No have stack for Error') => {
  // Verificar si estamos en producción o desarrollo
  if (config.SERVER.MODE === 'DEV') {
    return { ...error, stack }
  } else {
    return { error }
  }
}

export const errorHandler = (error : boom.Boom, req:Request, res:Response, next :NextFunction) => {
  // Obteniendo payload y statusCode de Error
  const {
    output: { statusCode, payload }
  } = error
  // Devolver error al cliente
  res.status(statusCode).json(withErrorStack(payload, error.stack))
}
