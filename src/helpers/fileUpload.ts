import { join } from 'path'
import { createFolder } from './createFolder'
import { writeFile } from 'fs'

export const fileUpload = async (
  file: Express.Multer.File,
  pathName: string,
  fileName: string,
) => {
  createFolder(pathName)
  const fullPath = join(pathName, fileName)

  // Дождитесь завершения writeFile перед тем, как продолжить
  await new Promise<void>((resolve, reject) => {
    writeFile(fullPath, file.buffer, err => {
      if (err) reject(err)
      else resolve()
    })
  })

  return {
    originalname: file.originalname,
    fullPath: fullPath, // Возвращайте путь к файлу, а не результат writeFile
  }
}
