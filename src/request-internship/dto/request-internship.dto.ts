import { StatusRequestInternship } from '@prisma/client'
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
  direction: string
}

export class RequestInternshipUpdateDto {
  @IsEnum(StatusRequestInternship)
  status: StatusRequestInternship

  @IsOptional()
  @IsString()
  projectId: string
}
