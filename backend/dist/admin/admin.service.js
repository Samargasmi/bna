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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const dummy_data_service_1 = require("../services/dummy-data.service");
let AdminService = class AdminService {
    constructor(dummyDataService) {
        this.dummyDataService = dummyDataService;
    }
    async getAllUsers(filters) {
        const users = await this.dummyDataService.getAllUsers();
        let filteredUsers = users.filter(user => user.role !== user_entity_1.UserRole.ADMIN);
        if (filters?.status) {
            filteredUsers = filteredUsers.filter(user => user.status === filters.status);
        }
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            filteredUsers = filteredUsers.filter(user => user.firstName.toLowerCase().includes(searchLower) ||
                user.lastName.toLowerCase().includes(searchLower) ||
                user.email.toLowerCase().includes(searchLower));
        }
        const total = filteredUsers.length;
        const limit = filters?.limit || 50;
        const offset = filters?.offset || 0;
        const paginatedUsers = filteredUsers.slice(offset, offset + limit);
        return {
            users: paginatedUsers.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            }),
            total,
            page: Math.floor(offset / limit) + 1,
            limit,
        };
    }
    async getUserById(userId) {
        const user = await this.dummyDataService.findUserById(userId);
        if (!user || user.role === user_entity_1.UserRole.ADMIN) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async createUser(createUserDto) {
        const existingUser = await this.dummyDataService.findUserByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const userData = {
            ...createUserDto,
            password: 'hashed-password',
            role: user_entity_1.UserRole.CLIENT,
            status: user_entity_1.UserStatus.ACTIVE,
        };
        const savedUser = await this.dummyDataService.createUser(userData);
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }
    async updateUser(userId, updateUserDto) {
        const user = await this.dummyDataService.findUserById(userId);
        if (!user || user.role === user_entity_1.UserRole.ADMIN) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.dummyDataService.findUserByEmail(updateUserDto.email);
            if (existingUser) {
                throw new common_1.BadRequestException('Email already exists');
            }
        }
        const updatedUser = await this.dummyDataService.updateUser(userId, updateUserDto);
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async updateUserStatus(userId, status) {
        const user = await this.dummyDataService.findUserById(userId);
        if (!user || user.role === user_entity_1.UserRole.ADMIN) {
            throw new common_1.NotFoundException('User not found');
        }
        const updatedUser = await this.dummyDataService.updateUser(userId, { status });
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async deleteUser(userId) {
        const user = await this.dummyDataService.findUserById(userId);
        if (!user || user.role === user_entity_1.UserRole.ADMIN) {
            throw new common_1.NotFoundException('User not found');
        }
        const accounts = await this.dummyDataService.findAccountsByUserId(userId);
        const hasBalance = accounts.some(account => account.balance > 0);
        if (hasBalance) {
            throw new common_1.BadRequestException('Cannot delete user with active accounts containing balance');
        }
        const deleted = await this.dummyDataService.deleteUser(userId);
        if (!deleted) {
            throw new common_1.NotFoundException('User not found');
        }
        return { message: 'User deleted successfully' };
    }
    async getAllAccounts(filters) {
        const accounts = await this.dummyDataService.getAllAccounts();
        let filteredAccounts = accounts;
        if (filters?.status) {
            filteredAccounts = filteredAccounts.filter(account => account.status === filters.status);
        }
        if (filters?.type) {
            filteredAccounts = filteredAccounts.filter(account => account.type === filters.type);
        }
        const total = filteredAccounts.length;
        const limit = filters?.limit || 50;
        const offset = filters?.offset || 0;
        const paginatedAccounts = filteredAccounts.slice(offset, offset + limit);
        return {
            accounts: paginatedAccounts,
            total,
            page: Math.floor(offset / limit) + 1,
            limit,
        };
    }
    async getAllTransactions(filters) {
        const transactions = await this.dummyDataService.getAllTransactions();
        let filteredTransactions = transactions;
        if (filters?.type) {
            filteredTransactions = filteredTransactions.filter(t => t.type === filters.type);
        }
        if (filters?.status) {
            filteredTransactions = filteredTransactions.filter(t => t.status === filters.status);
        }
        const total = filteredTransactions.length;
        const limit = filters?.limit || 50;
        const offset = filters?.offset || 0;
        const paginatedTransactions = filteredTransactions.slice(offset, offset + limit);
        return {
            transactions: paginatedTransactions,
            total,
            page: Math.floor(offset / limit) + 1,
            limit,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dummy_data_service_1.DummyDataService])
], AdminService);
//# sourceMappingURL=admin.service.js.map