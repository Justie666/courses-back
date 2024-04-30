import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LessonService } from './lesson.service'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: { title: string; courseId: string }) {
    return this.lessonService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(
    @Body() dto: { title: string; courseId: string },
    @Param('id') id: string,
  ) {
    return this.lessonService.update(id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.lessonService.delete(id)
  }
}
1
