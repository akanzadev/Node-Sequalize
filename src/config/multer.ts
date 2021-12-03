// Multer configuracion
import multer from 'multer'
import boom from '@hapi/boom'
import { Request } from 'express'
// import path from 'path'
// Guardar datos en disco con ruta especificada

export const storage = multer.memoryStorage()

/* const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
}) */

// Filtrar tipo de archivos
// tipo file

export const fileFilter = (req :Request, file:any, cb:CallableFunction) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    // Enviar error
    cb(null, false)
    // Crear error para capturarlo con boom
    const error = new Error('Solo se permiten imagenes')
    cb(boom.boomify(error, { statusCode: 400 }))
  }
}
// Asignando configuraciones
export const limits = 100000 // bytes
