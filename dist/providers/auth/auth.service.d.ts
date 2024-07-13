import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../models/user/user.service';
import { AccessTokenDto } from './dto/access-token.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<AccessTokenDto>;
}
