import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    validateUser(username: string, pass: string): Promise<{
        userId: number;
        username: string;
    } | null>;
}
