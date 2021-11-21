import { User } from './user.model'
import boom from '@hapi/boom'
import { config } from '../config/config'
import { Op } from 'sequelize'
import bcryptjs from 'bcryptjs'

interface UserI{
    name: string,
    lastname: string,
    email: string,
    age: number,
    password: string,
}

export const listUsers = async () => {
  const users = await User.findAll()
  if (!users) throw boom.boomify(new Error('No hay usuarios'), { statusCode: 404 })
  console.log(config.DB.DB_PORT, config.DB.DB_NAME, config.DB.DB_USER, config.DB.DB_PASS)
  return users
}

export const findOneUser = async (id: string) => {
  const user = await User.findByPk(id)
  if (!user) throw new Error('User not found')
  return user
}

export const createOneUser = async (userData: UserI) => {
  // Validar email
  const user = await User.findOne({
    where: {
      [Op.and]: [
        { email: userData.email },
        { status: true }
      ]
    }
  })
  if (user) throw new Error('Email already exists')
  const salt = bcryptjs.genSaltSync(10)
  userData.password = bcryptjs.hashSync(userData.password, salt)
  const newUser = await User.create(userData)
  if (!newUser) throw new Error('User not created')
  return newUser
}

export const updateOneUser = async (id: string, user: UserI) => {
  const userToUpdate = await User.findByPk(id)
  if (!userToUpdate) throw new Error('User not found')
  const updatedUser = await userToUpdate.update(user)
  if (!updatedUser) throw new Error('User not updated')
  return updatedUser
}

export const deleteOneUser = async (id: string) => {
  const userToDelete = await User.findByPk(id)
  if (!userToDelete) throw new Error('User not found')
  const deletedUser = await userToDelete.update({ status: false })
  if (!deletedUser) throw new Error('User not deleted')
  return deletedUser
}
