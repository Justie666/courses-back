import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class DirectionService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.direction.findMany({ orderBy: { createdAt: 'asc' } })
  }

  async create(dto: { title: string }) {
    const oldDirection = await this.prisma.direction.findUnique({
      where: {
        title: dto.title,
      },
    })

    if (oldDirection)
      throw new BadRequestException('Такое направление уже существует')

    await this.prisma.direction.create({
      data: {
        ...dto,
      },
    })

    return 'Проект был добавлен'
  }

  async update(dto: { title: string }, id: string) {
    const existingDirection = await this.prisma.direction.findUnique({
      where: {
        title: dto.title,
        NOT: { id },
      },
    })

    if (existingDirection) {
      throw new BadRequestException(
        'Направление с таким названием уже существует',
      )
    }

    await this.prisma.direction.update({
      where: { id },
      data: dto,
    })

    return 'Проект был изменён'
  }

  async delete(id: string) {
    await this.prisma.direction.delete({
      where: {
        id,
      },
    })

    return 'Направление было удалёно'
  }
}
