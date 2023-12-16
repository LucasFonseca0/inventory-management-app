import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from '../user/middlewares/login-validation.middleware';
import { config } from 'dotenv';
config(); 
@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
  