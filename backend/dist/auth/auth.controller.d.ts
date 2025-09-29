import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            status: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<any>;
    getProfile(req: any): any;
    refreshToken(req: any): Promise<{
        access_token: string;
    }>;
}
