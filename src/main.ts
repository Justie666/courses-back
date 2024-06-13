import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.use('/api/uploads', express.static('uploads'))
  app.enableCors({
    origin: true,
    credentials: true,
    exposedHeaders: 'set-cookie',
  })

  await app.listen(4200)
}
bootstrap()
