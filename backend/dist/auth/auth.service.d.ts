import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { DummyDataService } from '../services/dummy-data.service';
export declare class AuthService {
    private dummyDataService;
    private jwtService;
    private configService;
    constructor(dummyDataService: DummyDataService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<any>;
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
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    refreshToken(user: any): Promise<{
        access_token: string;
    }>;
}
