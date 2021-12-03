import multer from 'multer'
import { storage, fileFilter, limits } from '../../config/multer'

export const chargeImageHandler = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: limits,
    files: 1
  }
}).single('image')
