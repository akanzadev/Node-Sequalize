import { NextFunction, Request, Response } from 'express'
import cloudinary from '../../config/cloudinary'
import DatauriParser from 'datauri/parser'
import boom from '@hapi/boom'
// import fs from 'fs-extra'
import path from 'path'
export const uploadImageHandler = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { file } = req
    if (!file) return next()
    /*
    *Guardarlo de manera local en el servidor
    *const { filename } = file
    *req.body.image = filename
    */
    // Extraer is fuera local
    // const { filename, path } = file
    // Si es Memory Storage
    const { originalname, buffer } = file
    // Parsear Buffer a string
    const parser = new DatauriParser()
    parser.format(path.extname(originalname), buffer)
    if (!parser.content) throw boom.boomify(new Error('Error al parsear el archivo buffer a string'))
    // Enviar imagen a cloudinary
    // image.jpg => image
    const fileArray = originalname.split('.')
    const filenameCloud = fileArray[0]
    const result = await cloudinary.uploader.upload(parser.content, {
      public_id: `poke-server/users/${filenameCloud}`
    })
    // Eliminando la imagen que multer guardo localmente
    // await fs.unlink(file.path)
    req.body.image = result.secure_url
    next()
  } catch (error) {
    next(error)
  }
}
