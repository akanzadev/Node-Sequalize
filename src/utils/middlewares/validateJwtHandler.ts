import boom from '@hapi/boom'
import { User } from '../../user/user.model'
import { Request, Response, NextFunction } from 'express'
import { decodedJwt } from '../helpers/jwt'

const validateJwt = async (req:Request & { user: any}, res:Response, next:NextFunction) => {
  try {
    const token = req.headers.authorization as string
    // validar si hay token
    if (!token) next(boom.unauthorized('La solicitud requiere Token'))
    // Decoded JWT
    const { uid } = await decodedJwt(token)
    // Buscar usuario
    const user = await User.findByPk(uid)
    // Verificar si usuario existe
    if (!user) next(boom.unauthorized('No existe usuario con ese ID'))
    // Verificar si usuario esta activo
    if (!user?.status) next(boom.unauthorized('Usuario deshabilitado'))
    // Verificar rol
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { validateJwt }
