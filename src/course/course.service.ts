import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CourseDto } from './dto/course.dto'
import { extname, join } from 'path'
import { fileUpload } from 'src/helpers/fileUpload'
import { getSlug } from 'src/helpers/getSlug'
import { randomUUID } from 'crypto'
import { Omit } from '@prisma/client/runtime/library'

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const courses = await this.prisma.course.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        courseCategory: {
          include: {
            Category: true,
          },
        },
        ratingCourse: true,
      },
    })

    return courses.map(course => {
      return {
        ...course,
        categories: course.courseCategory.map(c => c.Category),
        courseCategory: undefined,
      }
    })
  }

  async getBySlug(slug: string) {
    const course = await this.prisma.course.findUnique({
      where: { slug },
      include: {
        courseCategory: {
          include: {
            Category: true,
          },
        },
        ratingCourse: true,
        lessons: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    return {
      ...course,
      categories: course.courseCategory.map(c => c.Category),
      courseCategory: undefined,
    }
  }

  // Добавить default img
  async create(dto: Omit<CourseDto, 'id'>) {
    const oldCourse = await this.prisma.course.findUnique({
      where: {
        title: dto.title,
      },
    })

    if (oldCourse)
      throw new BadRequestException('Курс с таким названием уже существует')

    const courseSlug = getSlug(dto.title)

    return this.prisma.course.create({
      data: {
        title: dto.title,
        slug: courseSlug,
        courseCategory: {
          createMany: { data: dto.categoryIds.map(id => ({ categoryId: id })) },
        },
      },
    })
  }

  async updateImage(id: string, image: Express.Multer.File) {
    const pathName = `./uploads/courses`
    const fileName = `${randomUUID()}${extname(image.originalname)}`
    const fullPath = join(pathName, fileName)

    fileUpload(image, pathName, fileName)
    console.log(fullPath)

    await this.prisma.course.update({
      where: { id },
      data: {
        image: fullPath,
      },
    })

    return 'Изображение курса было изменено'
  }

  async update(dto: Partial<CourseDto>, id: string) {
    const existingCourse = await this.prisma.course.findUnique({
      where: {
        title: dto.title,
        NOT: { id },
      },
    })

    if (existingCourse) {
      throw new BadRequestException('Курс с таким названием уже существует')
    }

    const courseSlug = getSlug(dto.title)

    await this.prisma.courseCategory.deleteMany({
      where: {
        courseId: id,
      },
    })

    return this.prisma.course.update({
      where: { id },
      data: {
        title: dto.title,
        slug: courseSlug,
        courseCategory: {
          createMany: {
            data: dto.categoryIds.map(categoryId => ({
              categoryId,
            })),
          },
        },
      },
    })
  }

  async delete(id: string) {
    return this.prisma.course.delete({ where: { id } })
  }
}
