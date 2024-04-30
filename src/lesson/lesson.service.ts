import { BadRequestException, Injectable } from '@nestjs/common'
import { getSlug } from 'src/helpers/getSlug'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(dto: { title: string; courseId: string }) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: dto.courseId,
      },
    })

    const oldLesson = await this.prisma.lesson.findFirst({
      where: {
        title: dto.title,
        courseId: dto.courseId,
      },
    })

    if (oldLesson)
      throw new BadRequestException(
        'Урок в этом курсе с таким названием уже существует',
      )

    const lessonSlug = getSlug(dto.title)

    await this.prisma.lesson.create({
      data: {
        title: dto.title,
        slug: lessonSlug,
        courseId: dto.courseId,
      },
    })

    return { courseSlug: course.slug, message: 'Урок был создан' }
  }

  async update(id: string, dto: { title: string; courseId: string }) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: dto.courseId,
      },
    })

    const existingLesson = await this.prisma.lesson.findFirst({
      where: {
        title: dto.title,
        courseId: dto.courseId,
        NOT: { id },
      },
    })

    if (existingLesson) {
      throw new BadRequestException(
        'Урок в этом курсе с таким названием уже существует',
      )
    }

    const lessonSlug = getSlug(dto.title)

    await this.prisma.lesson.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        slug: lessonSlug,
      },
    })

    return { courseSlug: course.slug, message: 'Урок был создан' }
  }

  async delete(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        Course: true,
      },
    })

    await this.prisma.lesson.delete({
      where: {
        id,
      },
    })

    return { courseSlug: lesson.Course.slug, message: 'Урок был удалён' }
  }
}
