import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/users.service';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: Omit<User, 'password'>;
}

export const AuthRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedRequest => {
    const request = ctx.switchToHttp().getRequest();
    return request;
  },
);
