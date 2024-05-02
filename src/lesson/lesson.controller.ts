import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { LessonService } from './lesson.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileInterceptor } from '@nestjs/platform-express'

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
  @Patch('update-video/:id')
  @Auth()
  @UseInterceptors(FileInterceptor('video'))
  async updateVideo(
    @Param('id') id: string,
    @UploadedFile() video: Express.Multer.File,
  ) {
    return this.lessonService.updateVideo(id, video)
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
