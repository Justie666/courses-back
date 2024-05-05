import { BadRequestException, Injectable } from '@nestjs/common'
import { StatusProject } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'asc' } })
  }

  async create(dto: { title: string }) {
    const oldProject = await this.prisma.project.findUnique({
      where: {
        title: dto.title,
      },
    })

    if (oldProject) throw new BadRequestException('Такой проект уже существует')

    await this.prisma.project.create({
      data: {
        ...dto,
      },
    })

    return 'Проект был добавлен'
  }

  async update(dto: { title: string; status: StatusProject }, id: string) {
    const existingProject = await this.prisma.project.findUnique({
      where: {
        title: dto.title,
        NOT: { id },
      },
    })

    if (existingProject) {
      throw new BadRequestException('Проект с таким названием уже существует')
    }

    await this.prisma.project.update({
      where: { id },
      data: dto,
    })

    return 'Проект был изменён'
  }

  async delete(id: string) {
    await this.prisma.project.delete({
      where: {
        id,
      },
    })

    return 'Проект был удалён'
  }
}
