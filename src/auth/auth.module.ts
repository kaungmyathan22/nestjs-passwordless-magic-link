import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MagicLoginStrategy } from './magiclogin.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: "my-jwt-secret",
    signOptions: {
      expiresIn: "1h",
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, MagicLoginStrategy, JwtStrategy]
})
export class AuthModule { }
