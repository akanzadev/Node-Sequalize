import { Router } from 'express'
import {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} from './user.controller'
import { validationHandler, uploadImageHandler } from '../utils/middlewares'
import {
  idUserSchema,
  createUserSchema,
  updatedUserSchema
} from '../utils/schemas'
import { chargeImageHandler } from '../utils/middlewares/chargeImageHandler'

const router = Router()

router.get('/', getUsers)

router.get('/:id', [validationHandler(idUserSchema, 'params')], getOneUser)

router.post(
  '/',
  [
    validationHandler(createUserSchema, 'body'),
    chargeImageHandler,
    uploadImageHandler
  ],
  createUser
)

router.put(
  '/:id',
  [
    validationHandler(idUserSchema, 'params'),
    validationHandler(updatedUserSchema, 'body'),
    chargeImageHandler,
    uploadImageHandler
  ],
  updateUser
)

router.delete('/:id', [validationHandler(idUserSchema, 'params')], deleteUser)

export default router
