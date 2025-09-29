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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const dummy_data_service_1 = require("../services/dummy-data.service");
let ClientsService = class ClientsService {
    constructor(dummyDataService) {
        this.dummyDataService = dummyDataService;
    }
    async getProfile(userId) {
        const user = await this.dummyDataService.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...profile } = user;
        return profile;
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.dummyDataService.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateProfileDto.email && updateProfileDto.email !== user.email) {
            const existingUser = await this.dummyDataService.findUserByEmail(updateProfileDto.email);
            if (existingUser) {
                throw new common_1.BadRequestException('Email already exists');
            }
        }
        const updatedUser = await this.dummyDataService.updateUser(userId, updateProfileDto);
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...profile } = updatedUser;
        return profile;
    }
    async getAccounts(userId) {
        return this.dummyDataService.findAccountsByUserId(userId);
    }
    async getAccountById(userId, accountId) {
        const account = await this.dummyDataService.findAccountById(accountId);
        if (!account || account.userId !== userId) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async createAccount(userId, accountData) {
        const user = await this.dummyDataService.findUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const account = await this.dummyDataService.createAccount({
            ...accountData,
            userId,
        });
        return account;
    }
    async getAccountSummary(userId) {
        const accounts = await this.getAccounts(userId);
        const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
        const totalAvailableBalance = accounts.reduce((sum, account) => sum + Number(account.availableBalance), 0);
        return {
            totalAccounts: accounts.length,
            totalBalance,
            totalAvailableBalance,
            accounts: accounts.map(account => ({
                id: account.id,
                accountNumber: account.accountNumber,
                type: account.type,
                balance: account.balance,
                availableBalance: account.availableBalance,
                status: account.status,
                currency: account.currency,
            })),
        };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dummy_data_service_1.DummyDataService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map