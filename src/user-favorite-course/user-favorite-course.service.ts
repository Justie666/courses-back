import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserFavoriteCourseService {
  constructor(private prisma: PrismaService) {}

  async addFavoriteCourse(userId: string, courseId: string) {
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
}
