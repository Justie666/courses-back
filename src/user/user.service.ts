import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { SignUpDto } from 'src/auth/dto/auth.dto'
import { userWithoutPassword } from 'src/helpers'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    })

    return userWithoutPassword(user)
  }

  getById(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async create(dto: SignUpDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      password: await hash(dto.password),
    }

    return this.prisma.user.create({
      data: user,
    })
  }
}
