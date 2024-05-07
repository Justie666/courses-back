import { Module } from '@nestjs/common'
import { RequestInternshipService } from './request-internship.service'
import { RequestInternshipController } from './request-internship.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [RequestInternshipController],
  providers: [RequestInternshipService, PrismaService],
})
export class RequestInternshipModule {}
