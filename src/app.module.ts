import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'
import { CourseModule } from './course/course.module'
import { RequestBackCallModule } from './request-back-call/request-back-call.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CategoryModule,
    CourseModule,
    RequestBackCallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
