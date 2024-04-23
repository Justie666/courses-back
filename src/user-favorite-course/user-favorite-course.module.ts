import { Module } from '@nestjs/common'
import { UserFavoriteCourseService } from './user-favorite-course.service'
import { UserFavoriteCourseController } from './user-favorite-course.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [UserFavoriteCourseController],
  providers: [UserFavoriteCourseService, PrismaService],
})
export class UserFavoriteCourseModule {}
