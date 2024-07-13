import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user-dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(body: createUserDto): Promise<import("../../providers/auth/dto/access-token.dto").AccessTokenDto>;
    delete(req: Request): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    update(req: Request, body: updateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    getMyUser(req: Request): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
}
