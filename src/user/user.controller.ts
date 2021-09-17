import { Request, Response } from 'express'
import { listUsers, findOneUser, createOneUser, updateOneUser, deleteOneUser } from './user.service'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await listUsers()
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await findOneUser(id)
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { body } = req
    const user = await createOneUser(body)
    res.status(201).json({ user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { body } = req
    const user = await updateOneUser(id, body)
    res.status(201).json({ user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await deleteOneUser(id)
    res.status(201).json({ user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
