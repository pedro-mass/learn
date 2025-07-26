import { AppService } from './app.service';
import { User } from './users/users.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    login(req: Request & {
        user: Omit<User, 'password'>;
    }): Promise<Omit<User, "password">>;
}
