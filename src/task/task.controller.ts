import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TaskService } from './task.service'
import { StatusProject } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { TaskCreateDto } from './dto/task.dto'

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @Get()
  // async getAll() {
  //   return this.taskService.getAll()
  // }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: TaskCreateDto) {
    return this.taskService.create(dto)
  }

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  // @Patch(':id')
  // @Auth()
  // async update(
  //   @Body() dto: { title: string; status: StatusProject },
  //   @Param('id') id: string,
  // ) {
  //   return this.taskService.update(dto, id)
  // }

  // @HttpCode(200)
  // @Delete(':id')
  // @Auth()
  // async delete(@Param('id') id: string) {
  //   return this.taskService.delete(id)
  // }
}
