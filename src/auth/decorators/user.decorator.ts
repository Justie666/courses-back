import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { User } from '@prisma/client'

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    if (user && data in user) {
      return user[data]
    } else {
      return null // Возвращать null, если пользователь или свойство отсутствуют
    }
  },
)
