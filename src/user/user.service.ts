import { User } from './user.model'
import boom from '@hapi/boom'
import { config } from '../config/config'
interface UserI{
    name: string,
    lastname: string,
    email: string,
    age: number
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

export const createOneUser = async (user: UserI) => {
  // Validar email
  const emailExists = await User.findOne({ where: { email: user.email } })
  if (emailExists) throw new Error('Email already exists')
  const newUser = await User.create(user)
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
