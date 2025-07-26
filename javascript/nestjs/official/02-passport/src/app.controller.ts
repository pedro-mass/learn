import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // using the built in works, but it introduces the magic string 'local' which is harder to track down
  // @UseGuards(AuthGuard('local')) // when we extended LocalStrategy, it was given a default name of 'local'
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: Request & { user: Omit<User, 'password'> }) {
    return Promise.resolve(req.user);
  }
}
