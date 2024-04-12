import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './dto/category.dto'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({ orderBy: { createdAt: 'asc' } })
  }

  async create(dto: Omit<CategoryDto, 'id'>) {
    const oldCategory = await this.prisma.category.findUnique({
      where: {
        title: dto.title,
      },
    })

    if (oldCategory)
      throw new BadRequestException('Такая категория уже существует')

    return this.prisma.category.create({
      data: {
        ...dto,
      },
    })
  }

  async update(dto: Partial<CategoryDto>, id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: {
        title: dto.title,
        NOT: { id },
      },
    })

    if (existingCategory) {
      throw new BadRequestException(
        'Категория с таким названием уже существует',
      )
    }

    return this.prisma.category.update({
      where: { id },
      data: dto,
    })
  }

  async delete(id: string) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    })
  }
}
