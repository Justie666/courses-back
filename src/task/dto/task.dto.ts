import { Priority, StatusTask } from '@prisma/client'
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

export class TaskCreateDto {
  @IsString()
  title: string

  @IsEnum(StatusTask)
  status: StatusTask

  @IsString()
  @IsOptional()
  content: string

  @IsDateString()
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

export class TaskUpdateDto {
  @IsString()
  title: string

  @IsEnum(StatusTask)
  status: StatusTask

  @IsString()
  @IsOptional()
  content: string

  @IsDateString()
  @IsOptional()
  deadline?: Date

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority

  @IsString()
  @IsOptional()
  userId?: string
}
