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
      include: {
        userFavoriteCourse: true,
        userPurchasedCourse: true,
      },
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

  async toggleFavoriteCourse(userId: string, courseId: string) {
    const existingFavoriteCourse =
      await this.prisma.userFavoriteCourse.findFirst({
        where: { courseId: courseId, userId: userId },
      })

    if (existingFavoriteCourse) {
      await this.prisma.userFavoriteCourse.delete({
        where: { id: existingFavoriteCourse.id },
      })
      return 'Курс удалён из избранного'
    }

    await this.prisma.userFavoriteCourse.create({ data: { userId, courseId } })
    return 'Курс добавлен в избранное'
  }

  async buyCourse(userId: string, courseId: string) {
    const existingPurchasedCourse =
      await this.prisma.userPurchasedCourse.findFirst({
        where: { courseId: courseId, userId: userId },
      })

    if (existingPurchasedCourse) {
      return 'Курс уже куплен'
    }

    await this.prisma.userPurchasedCourse.create({ data: { userId, courseId } })
    return 'Курс был куплен'
  }
}
