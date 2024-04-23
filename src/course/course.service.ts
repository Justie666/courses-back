import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CourseDto } from './dto/course.dto'
import { extname, join } from 'path'
import { fileUpload } from 'src/helpers/fileUpload'
import slugify from 'slugify'

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

  async create(dto: Omit<CourseDto, 'id'>, image: Express.Multer.File) {
    const oldCourse = await this.prisma.course.findUnique({
      where: {
        title: dto.title,
      },
    })

    if (oldCourse)
      throw new BadRequestException('Курс с таким названием уже существует')

    const courseSlug = slugify(dto.title, {
      replacement: '_',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    })

    const pathName = `./uploads/courses`
    const fileName = `${courseSlug}${extname(image.originalname)}`
    const fullPath = join(pathName, fileName)

    fileUpload(image, pathName, fileName)

    // return fullPath

    return this.prisma.course.create({
      data: {
        title: dto.title,
        slug: courseSlug,
        image: fullPath,
        courseCategory: {
          createMany: { data: dto.categoryIds.map(id => ({ categoryId: id })) },
        },
      },
    })
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

    await this.prisma.courseCategory.deleteMany({
      where: {
        courseId: id,
      },
    })

    return this.prisma.course.update({
      where: { id },
      data: {
        title: dto.title,
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
