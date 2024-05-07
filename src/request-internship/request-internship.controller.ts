import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { RequestInternshipService } from './request-internship.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import {
  RequestInternshipCreateDto,
  RequestInternshipUpdateDto,
} from './dto/request-internship.dto'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('request-internship')
export class RequestInternshipController {
  constructor(
    private readonly requestInternshipService: RequestInternshipService,
  ) {}

  @Get()
  async getAll() {
    return this.requestInternshipService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(
    @Body() dto: RequestInternshipCreateDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.requestInternshipService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(
    @Body() dto: RequestInternshipUpdateDto,
    @Param('id') id: string,
  ) {
    return this.requestInternshipService.update(dto, id)
  }
}
