import { Router } from 'express'
import {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} from './user.controller'
import { validationHandler } from '../utils/middlewares'
import { idUserSchema, createUserSchema, updatedUserSchema } from '../utils/schemas'

const router = Router()

router.get('/', getUsers)

router.get('/:id', [validationHandler(idUserSchema, 'params')], getOneUser)

router.post('/', [validationHandler(createUserSchema, 'body')], createUser)

router.put(
  '/:id',
  [
    validationHandler(idUserSchema, 'params'),
    validationHandler(updatedUserSchema, 'body')
  ],
  updateUser
)

router.delete('/:id', [validationHandler(idUserSchema, 'params')], deleteUser)

export default router
