import { User } from '@prisma/client'

export const userWithoutPassword = (user: User) =>
  user.password ? { ...user, password: undefined } : user
