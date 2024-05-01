import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current-user')
  @Auth()
  async getCurrentUser(@CurrentUser('id') userId: string) {
    return this.userService.getCurrentUser(userId)
  }

  @Post('/toggle-favorite-course')
  @Auth()
  async toggleFavoriteCourse(
    @CurrentUser('id') userId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.userService.toggleFavoriteCourse(userId, courseId)
  }

  @Post('/toggle-watched-lesson')
  @Auth()
  async toggleWatchedLesson(
    @CurrentUser('id') userId: string,
    @Body('lessonId') lessonId: string,
  ) {
    return this.userService.toggleWatchedLesson(userId, lessonId)
  }

  @Post('/buy-course')
  @Auth()
  async buyCourse(
    @CurrentUser('id') userId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.userService.buyCourse(userId, courseId)
  }
}
