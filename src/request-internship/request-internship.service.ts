import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import {
  RequestInternshipCreateDto,
  RequestInternshipUpdateDto,
} from './dto/request-internship.dto'

@Injectable()
export class RequestInternshipService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.requestInternship.findMany({
      orderBy: { createdAt: 'asc' },
      include: {
        User: true,
        Direction: true,
        userProject: {
          select: {
            Project: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })
  }

  async create(dto: RequestInternshipCreateDto, userId: string) {
    const oldRequest = await this.prisma.requestInternship.findFirst({
      where: {
        userId: userId,
        directionId: dto.directionId,
      },
    })

    if (oldRequest)
      throw new BadRequestException(
        'Вы уже отправляли заявку на стажировку с этим направлением',
      )

    await this.prisma.requestInternship.create({
      data: {
        userId: userId,
        aboutMe: dto.aboutMe,
        phone: dto.phone,
        projects: dto.projects,
        skills: dto.skills,
        directionId: dto.directionId,
      },
    })

    return 'Заявка была отправлена'
  }

  async update(dto: RequestInternshipUpdateDto, id: string) {
    if (dto.status === 'ACCEPT') {
      const request = await this.prisma.requestInternship.findUnique({
        where: {
          id,
        },
      })

      await this.prisma.userProject.create({
        data: {
          directionId: request.directionId,
          userId: request.userId,
          projectId: dto.projectId,
          requestInternshipId: request.id,
        },
      })

      await this.prisma.requestInternship.update({
        where: { id },
        data: {
          status: dto.status,
        },
      })

      return 'Заявка была принята'
    }

    await this.prisma.requestInternship.update({
      where: { id },
      data: {
        status: dto.status,
      },
    })
    return 'Заявка была отклонена'
  }
}
