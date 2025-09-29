"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../entities/user.entity");
const dummy_data_service_1 = require("../services/dummy-data.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(dummyDataService, jwtService, configService) {
        this.dummyDataService = dummyDataService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.dummyDataService.findUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            if (user.status === user_entity_1.UserStatus.INACTIVE) {
                throw new common_1.UnauthorizedException('Account is inactive');
            }
            if (user.status === user_entity_1.UserStatus.SUSPENDED) {
                throw new common_1.UnauthorizedException('Account is suspended');
            }
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
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
    async register(registerDto) {
        const existingUser = await this.dummyDataService.findUserByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 12);
        const userData = {
            ...registerDto,
            password: hashedPassword,
            role: user_entity_1.UserRole.CLIENT,
            status: user_entity_1.UserStatus.ACTIVE,
            dateOfBirth: registerDto.dateOfBirth ? new Date(registerDto.dateOfBirth) : new Date(),
        };
        const savedUser = await this.dummyDataService.createUser(userData);
        const { password: _, ...result } = savedUser;
        return result;
    }
    async findById(id) {
        const user = await this.dummyDataService.findUserById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        const user = await this.dummyDataService.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async refreshToken(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dummy_data_service_1.DummyDataService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map