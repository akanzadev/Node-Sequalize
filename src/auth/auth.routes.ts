import { Router } from 'express'
import { authSigInUser } from './auth.controller'
import { authSchema } from '../utils/schemas/'
import { validationHandler } from '../utils/middlewares'

const router = Router()

router.post('/login', [validationHandler(authSchema, 'body')], authSigInUser)

export default router
