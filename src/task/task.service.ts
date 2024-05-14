import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskCreateDto, TaskUpdateDto } from './dto/task.dto'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: TaskCreateDto) {
    await this.prisma.task.create({
      data: {
        ...dto,
      },
    })

    return 'Задача добавлена'
  }

  async update(dto: TaskUpdateDto, id: string) {
    await this.prisma.task.update({
      where: { id },
      data: dto,
    })

    return 'Задача была изменёна'
  }

  async delete(id: string) {
    await this.prisma.task.delete({
      where: {
        id,
      },
    })

    return 'Задача была удалена'
  }
}
