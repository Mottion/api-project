import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(signInDto: LoginAuthDto): Promise<import("./dto/access-token.dto").AccessTokenDto>;
}
