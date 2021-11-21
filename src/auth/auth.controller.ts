import { login } from './auth.service'
import { Request, Response, NextFunction } from 'express'
export const authSigInUser = async (req :Request, res : Response, next:NextFunction) => {
  try {
    const { body } = req
    const credentials = await login(body)
    res.status(200).json(
      {
        message: 'Login Successful',
        data: credentials
      }
    )
  } catch (error) {
    next(error)
  }
}
