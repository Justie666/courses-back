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
import { DirectionService } from './direction.service'
import { StatusProject } from '@prisma/client'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('direction')
export class DirectionController {
  constructor(private readonly directionService: DirectionService) {}

  @Get()
  async getAll() {
    return this.directionService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: { title: string }) {
    return this.directionService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(
    @Body() dto: { title: string; status: StatusProject },
    @Param('id') id: string,
  ) {
    return this.directionService.update(dto, id)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.directionService.delete(id)
  }
}
