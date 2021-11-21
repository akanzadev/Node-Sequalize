import { NextFunction, Request, Response } from 'express'
import { Field } from 'multer'
import fs from 'fs-extra'
const cloudinary = require('../../config/cloudinary')

const uploadImageHandler = async (req:Request & { file:Field }, res:Response, next:NextFunction) => {
  try {
    const { file } = req
    if (!file) return next()
    /*
    *Guardarlo de manera local en el servidor
    *const { filename } = file
    *req.body.image = filename
    */
    const { filename, path } = file
    // Enviar imagen a cloudinary
    const fileArray = filename.split('.')
    const filenameCloud = fileArray[0]
    const result = await cloudinary.uploader.upload(path, {
      public_id: `rest-node-server/images/${filenameCloud}`
    })
    // Eliminando la imagen que multer guardo localmente
    await fs.unlink(file.path)
    req.body.image = result.secure_url
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { uploadImageHandler }
