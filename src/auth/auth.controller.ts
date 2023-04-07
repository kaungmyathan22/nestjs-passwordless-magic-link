import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magiclogin.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly strategy: MagicLoginStrategy,
  ) { }

  // POST /auth/login {email} ---> send magic link
  @Post('login')
  login (@Req() req, @Res() res, @Body() body) {
    this.authService.validateUser(body.destination);
    return this.strategy.send(req, res)
  }

  // GET /auth/login {email} ---> send magic link
  @UseGuards(AuthGuard("magiclogin"))
  @Post('login/callback')
  callback (@Req() req) {
    return this.authService.generateTokens(req.user);
  }
}
