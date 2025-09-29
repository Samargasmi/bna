import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { DummyDataService } from '../services/dummy-data.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private dummyDataService: DummyDataService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.dummyDataService.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status === UserStatus.INACTIVE) {
        throw new UnauthorizedException('Account is inactive');
      }
      if (user.status === UserStatus.SUSPENDED) {
        throw new UnauthorizedException('Account is suspended');
      }

      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        status: user.status,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.dummyDataService.findUserByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);
    
    const userData = {
      ...registerDto,
      password: hashedPassword,
      role: UserRole.CLIENT,
      status: UserStatus.ACTIVE,
      dateOfBirth: registerDto.dateOfBirth ? new Date(registerDto.dateOfBirth) : new Date(),
    };

    const savedUser = await this.dummyDataService.createUser(userData);
    const { password: _, ...result } = savedUser;

    return result;
  }

  async findById(id: string): Promise<User> {
    const user = await this.dummyDataService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.dummyDataService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
