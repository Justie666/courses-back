import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto, SignUpDto } from './dto/auth.dto'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('sign-in')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this.authService.signIn(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('sign-up')
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...response } = await this.authService.signUp(dto)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('access-token')
  async getNewTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookie =
      req.cookies[this.authService.REFRESH_TOKEN_NAME]

    if (!refreshTokenFromCookie) {
      this.authService.removeRefreshTokenFromResponse(res)
      throw new UnauthorizedException('Refresh токен не найден')
    }

    const { refreshToken, ...response } = await this.authService.getNewTokens(
      refreshTokenFromCookie,
    )

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res)

    return true
  }
}
