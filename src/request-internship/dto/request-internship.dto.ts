import { StatusRequest } from '@prisma/client'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class RequestInternshipCreateDto {
  @IsString()
  phone: string

  @IsString()
  skills: string

  @IsString()
  aboutMe: string

  @IsString()
  projects: string

  @IsString()
  directionId: string
}

export class RequestInternshipUpdateDto {
  @IsEnum(StatusRequest)
  status: StatusRequest

  @IsOptional()
  @IsString()
  projectId: string
}
