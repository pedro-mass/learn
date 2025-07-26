import { User } from '../users/users.service';

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, 'password'>;
      logout: (callback: (err?: Error) => void) => void;
    }
  }
}