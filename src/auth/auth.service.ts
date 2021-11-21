import { Op } from 'sequelize'
import { User } from '../user/user.model'
import boom from '@hapi/boom'
import { compareSync } from 'bcryptjs'
// const { generatedJwt } = require('../utils/helpers/jwt')
interface AuthCredentials {
    email: string
    password: string
}

export const login = async ({ email, password }:AuthCredentials) => {
  // Validar email
  const user = await User.findOne({
    where: {
      [Op.and]: [
        { email },
        { status: true }
      ]
    }
  })
  if (!user) throw boom.boomify(new Error('Email or password incorrects'), { statusCode: 400 })
  // Validar password
  const isValid = compareSync(password, user.password)
  if (!isValid) throw boom.boomify(new Error('Email or password incorrects'), { statusCode: 400 })
  // Generar token
  // const token = await generatedJwt(user.id)
  return { user, token: 'sdsds' }
}
