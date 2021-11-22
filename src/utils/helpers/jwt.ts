import boom from '@hapi/boom'
import { config } from './../../config/config'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const generatedJwt = (uid:number | string):Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { uid }
    jwt.sign(payload, config.JWT.TOKEN_SECRET, {
      expiresIn: config.JWT.TOKEN_EXPIRATION
    }, (err, token) => {
      if (err) {
        reject(boom.unauthorized('Error al generar Token'))
      } else {
        resolve(token as string)
      }
    })
  })
}

export const decodedJwt = (token:string):Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        reject(boom.unauthorized('Token invalido'))
      } else {
        resolve(decoded as JwtPayload)
      }
    })
  })
}
