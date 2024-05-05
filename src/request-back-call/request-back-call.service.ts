import { Injectable } from '@nestjs/common'
import { StatusRequestBackCall } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class RequestBackCallService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.requestBackCall.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        user: true,
      },
    })
  }

  async create(dto: { phone: string; problem: string }, userId: string) {
    // const oldRequest = await this.prisma.requestBackCall.findFirst({
    //   where: {
    //     phone: dto.phone,
    //     userId,
    //     status: 'PENDING',
    //   },
    // })

    // if (oldRequest)
    //   throw new BadRequestException(
    //     'Вы уже отправили запрос на обратный звонок',
    //   )

    return this.prisma.requestBackCall.create({
      data: {
        ...dto,
        userId,
      },
    })
  }

  async update(
    dto: {
      comment?: string
      status?: StatusRequestBackCall
    },
    id: string,
  ) {
    return this.prisma.requestBackCall.update({
      where: {
        id,
      },
      data: {
        comment: dto.comment,
        status: dto.status,
      },
    })
  }
}
