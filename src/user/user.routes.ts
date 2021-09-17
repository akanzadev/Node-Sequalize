import { Router } from 'express'
import { getUsers, getOneUser, createUser, updateUser, deleteUser } from './user.controller'

const router = Router()

router.get('/', getUsers)

router.get('/:id', getOneUser)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

export default router
