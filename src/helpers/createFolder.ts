import { mkdir } from 'fs'

export const createFolder = async (path: string) => {
  mkdir(path, { recursive: true }, err => {
    console.log(err)
  })
}
