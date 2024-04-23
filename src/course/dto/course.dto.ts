import { IsArray, IsOptional, IsString } from 'class-validator'

export class CourseDto {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  title: string

  @IsArray()
  @IsString({ each: true })
  categoryIds: string[]
}
