import { Injectable } from '@nestjs/common'
import { StatusRequest } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class RequestBackCallService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.requestBackCall.findMany({
      orderBy: { createdAt: 'asc' },
    })
  }

  async create(dto: { phone: string; problem: string; name: string }) {
    await this.prisma.requestBackCall.create({
      data: {
        ...dto,
      },
    })

    return 'Заявка была отправлена'
  }

  async update(
    dto: {
      comment: string
      status: StatusRequest
    },
    id: string,
  ) {
    await this.prisma.requestBackCall.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    })

    return 'Заявка была изменена'
  }
}
