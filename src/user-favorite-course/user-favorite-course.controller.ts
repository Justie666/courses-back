import { Body, Controller, Post } from '@nestjs/common'
import { UserFavoriteCourseService } from './user-favorite-course.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('user-favorite-course')
export class UserFavoriteCourseController {
  constructor(
    private readonly userFavoriteCourseService: UserFavoriteCourseService,
  ) {}

  @Post()
  @Auth()
  async addFavoriteCourse(
    @CurrentUser('id') userId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.userFavoriteCourseService.addFavoriteCourse(userId, courseId)
  }
}
