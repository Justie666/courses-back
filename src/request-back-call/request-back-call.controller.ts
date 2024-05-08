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
import { RequestBackCallService } from './request-back-call.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { StatusRequest } from '@prisma/client'

@Controller('request-back-call')
export class RequestBackCallController {
  constructor(
    private readonly requestBackCallService: RequestBackCallService,
  ) {}

  @Get()
  async getAll() {
    return this.requestBackCallService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async create(@Body() dto: { phone: string; problem: string; name: string }) {
    return this.requestBackCallService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(
    @Body() dto: { comment: string; status: StatusRequest },
    @Param('id') id: string,
  ) {
    return this.requestBackCallService.update(dto, id)
  }
}
