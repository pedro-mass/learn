import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/users.service';

export interface AuthenticatedRequest extends Express.Request {
  user: Omit<User, 'password'>;
  logout: (callback: (err?: Error) => void) => void;
}

export const AuthRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedRequest => {
    const request = ctx.switchToHttp().getRequest();
    return request;
  },
);