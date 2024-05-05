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
import { ProjectService } from './project.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { StatusProject } from '@prisma/client'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAll() {
    return this.projectService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: { title: string }) {
    return this.projectService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(
    @Body() dto: { title: string; status: StatusProject },
    @Param('id') id: string,
  ) {
    return this.projectService.update(dto, id)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.projectService.delete(id)
  }
}
