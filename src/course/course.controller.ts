import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CourseService } from './course.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CourseDto } from './dto/course.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAll() {
    return this.courseService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CourseDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.courseService.create(dto, image)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(@Body() dto: CourseDto, @Param('id') id: string) {
    return this.courseService.update(dto, id)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.courseService.delete(id)
  }
}
