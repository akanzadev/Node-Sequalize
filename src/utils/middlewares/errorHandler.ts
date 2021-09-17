/* const boom = require('@hapi/boom')
const multer = require('multer')
const config = require('../../config/config')

function withErrorStack (error, stack) {
  // Verificar si estamos en producción o desarrollo
  if (config.SERVER.MODE === 'DEV') {
    return { ...error, stack }
  } else {
    return { error }
  }
}

function logErrors (error, req, res, next) {
  console.error(error.stack)
  next(error)
}

function checkMulterError (error, req, res, next) {
  if (error instanceof multer.MulterError) {
    next(boom.badRequest(error.message))
  } else {
    next(error)
  }
}

function wrapErrors (error, req, res, next) {
  // Convirtiendo error a boom error
  if (!error.isBoom) next(boom.badImplementation(error.message, null))
  next(error)
}

function errorHandler (error, req, res, next) {
  // Obteniendo payload y statusCode de Error
  const {
    output: { statusCode, payload }
  } = error
  res.status(statusCode).json(withErrorStack(payload, error.stack))
}

module.exports = {
  logErrors,
  errorHandler,
  wrapErrors,
  checkMulterError
}
 */
