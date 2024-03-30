import { IsEmail, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  @IsEmail()
  email: string

  @IsString()
  name: string

  @IsString()
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  password: string
}

export class SignInDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  password: string
}
