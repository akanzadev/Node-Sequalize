import { User } from './user.model'
interface UserI{
    name: string,
    email: string,
}
export const listUsers = async () => {
  const users = await User.findAll()
  if (!users) throw new Error('No users found')
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
