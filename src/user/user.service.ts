import { User } from './user.model'
import boom from '@hapi/boom'
import { Op } from 'sequelize'
import bcryptjs from 'bcryptjs'

interface UserI{
    name: string,
    lastname: string,
    email: string,
    age: number,
    password: string,
    image?:string
}

export const listUsers = async () => {
  const users = await User.findAll({
    where: {
      [Op.and]: [
        { status: true }
      ]
    },
    attributes: ['id', 'name', 'lastname', 'email', 'age', 'status']
  })
  if (!users) throw boom.boomify(new Error('No hay usuarios'), { statusCode: 404 })
  return users
}

export const findOneUser = async (id: number | string) => {
  const user = await User.findOne({
    where: {
      [Op.and]: [
        { id: id },
        { status: true }
      ]
    },
    attributes: ['id', 'name', 'lastname', 'email', 'age', 'image', 'status']
  })
  if (!user) throw boom.boomify(new Error('No se encontro Usuario con ese ID'), { statusCode: 400 })
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
  if (user) throw new Error('Ya existe un Usuario registrado con ese Correo')
  const salt = bcryptjs.genSaltSync(10)
  userData.password = bcryptjs.hashSync(userData.password, salt)
  const newUser = await User.create(userData)
  if (!newUser) throw boom.boomify(new Error('Error al crear Usuario'), { statusCode: 400 })
  return newUser
}

export const updateOneUser = async (id: string, user: UserI) => {
  const userToUpdate = await User.findByPk(id)
  if (!userToUpdate) throw boom.boomify(new Error('No se encontro Usuario con ese ID'), { statusCode: 400 })
  const updatedUser = await userToUpdate.update(user)
  if (!updatedUser) throw boom.boomify(new Error('No se pudo actualizar usuario'), { statusCode: 500 })
  return updatedUser
}

export const deleteOneUser = async (id: string) => {
  const userToDelete = await User.findByPk(id)
  if (!userToDelete) throw boom.boomify(new Error('No se encontro Usuario con ese ID'), { statusCode: 400 })
  const deletedUser = await userToDelete.update({ status: false })
  if (!deletedUser) throw boom.boomify(new Error('No se pudo eliminar usuario'), { statusCode: 500 })
  return deletedUser
}
