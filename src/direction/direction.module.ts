import { Module } from '@nestjs/common'
import { DirectionService } from './direction.service'
import { DirectionController } from './direction.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [DirectionController],
  providers: [DirectionService, PrismaService],
})
export class DirectionModule {}
