import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/users.service';
import {
  AuthenticatedRequest,
  AuthRequest,
} from './decorators/auth-request.decorator';
import { AuthService } from './auth/auth.service';

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
}
