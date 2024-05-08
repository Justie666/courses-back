import { Priority, StatusRequest, StatusTask } from '@prisma/client'
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator'

export class TaskCreateDto {
  @IsString()
  title: string

  @IsEnum(StatusTask)
  status: StatusTask

  @IsString()
  @IsOptional()
  content: string

  @IsDate()
  @IsOptional()
  deadline?: Date

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority

  @IsString()
  projectId: string

  @IsString()
  directionId: string

  @IsString()
  @IsOptional()
  userId?: string
}

export class RequestInternshipUpdateDto {
  @IsEnum(StatusRequest)
  status: StatusRequest

  @IsOptional()
  @IsString()
  projectId: string
}
