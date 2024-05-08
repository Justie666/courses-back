import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskCreateDto } from './dto/task.dto'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // async getAll() {
  //   return this.prisma.project.findMany({
  //     orderBy: { createdAt: 'asc' },
  //     include: {
  //       userProject: {
  //         include: {
  //           User: true,
  //           Direction: true,
  //         },
  //       },
  //     },
  //   })
  // }

  async create(dto: TaskCreateDto) {
    await this.prisma.task.create({
      data: {
        ...dto,
      },
    })

    return 'Задача добавлена'
  }

  // async update(dto: { title: string; status: StatusProject }, id: string) {
  //   const existingProject = await this.prisma.project.findUnique({
  //     where: {
  //       title: dto.title,
  //       NOT: { id },
  //     },
  //   })

  //   if (existingProject) {
  //     throw new BadRequestException('Проект с таким названием уже существует')
  //   }

  //   await this.prisma.project.update({
  //     where: { id },
  //     data: dto,
  //   })

  //   return 'Проект был изменён'
  // }

  // async delete(id: string) {
  //   await this.prisma.project.delete({
  //     where: {
  //       id,
  //     },
  //   })

  //   return 'Проект был удалён'
  // }
}
