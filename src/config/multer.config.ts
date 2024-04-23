import { BadRequestException } from '@nestjs/common'
import { diskStorage } from 'multer'
import { extname } from 'path'

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Adjust the path to your uploads folder
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('')
      cb(
        null,
        `<span class="math-inline">${randomName}</span>${extname(
          file.originalname,
        )}`,
      )
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow specified image formats
      cb(null, true)
    } else {
      cb(new BadRequestException('Unsupported file format'), false)
    }
  },
}
