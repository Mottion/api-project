import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { createUserDto } from './dto/create-user.dto';
import { AccessTokenDto } from '../../providers/auth/dto/access-token.dto';
import { updateUserDto } from './dto/update-user-dto';
export declare class UserService {
    private readonly userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    create(user: createUserDto): Promise<AccessTokenDto>;
    findByEmail(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    getMyUser(user: {
        id: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
    update(id: string, data: updateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
    }>;
}
