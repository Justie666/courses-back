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
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { StatusRequestBackCall } from '@prisma/client'

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
  @Auth()
  async create(
    @Body() dto: { phone: string; problem: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.requestBackCallService.create(dto, userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  @Auth()
  async update(
    @Body() dto: { phone?: string; status?: StatusRequestBackCall },
    @Param('id') id: string,
  ) {
    return this.requestBackCallService.update(dto, id)
  }
}
