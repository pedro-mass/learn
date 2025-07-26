export type User = {
    userId: number;
    username: string;
    password: string;
};
export declare class UsersService {
    private readonly users;
    findOne(username: string): Promise<User | undefined>;
}
