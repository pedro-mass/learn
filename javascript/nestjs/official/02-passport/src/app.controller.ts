import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import {
  AuthenticatedRequest,
  AuthRequest,
} from './decorators/auth-request.decorator';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // using the built in works, but it introduces the magic string 'local' which is harder to track down
  // @UseGuards(AuthGuard('local')) // when we extended LocalStrategy, it was given a default name of 'local'
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@AuthRequest() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@AuthRequest() req: AuthenticatedRequest) {
    return new Promise<{ message: string }>((resolve, reject) => {
      req.logout((err) =>
        err ? reject(err) : resolve({ message: 'Logged out successfully' }),
      );
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@AuthRequest() req: AuthenticatedRequest) {
    return req.user;
  }
}
