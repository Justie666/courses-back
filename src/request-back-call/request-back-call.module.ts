import { Module } from '@nestjs/common'
import { RequestBackCallService } from './request-back-call.service'
import { RequestBackCallController } from './request-back-call.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [RequestBackCallController],
  providers: [RequestBackCallService, PrismaService],
})
export class RequestBackCallModule {}
