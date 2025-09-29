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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("../entities/account.entity");
const user_entity_1 = require("../entities/user.entity");
let AccountsService = class AccountsService {
    constructor(accountRepository, userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }
    async createAccount(userId, accountData) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const account = this.accountRepository.create({
            ...accountData,
            userId,
            accountNumber: this.generateAccountNumber(),
        });
        return this.accountRepository.save(account);
    }
    async getAccountById(accountId, userId) {
        const whereClause = { id: accountId };
        if (userId) {
            whereClause.userId = userId;
        }
        const account = await this.accountRepository.findOne({
            where: whereClause,
            relations: ['user'],
        });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async updateAccountBalance(accountId, amount, type) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        if (type === 'withdrawal' && !account.canWithdraw(amount)) {
            throw new common_1.BadRequestException('Insufficient funds or account not active');
        }
        if (type === 'deposit' && !account.canDeposit()) {
            throw new common_1.BadRequestException('Account cannot receive deposits');
        }
        if (type === 'deposit') {
            account.balance = Number(account.balance) + amount;
            account.availableBalance = Number(account.availableBalance) + amount;
        }
        else {
            account.balance = Number(account.balance) - amount;
            account.availableBalance = Number(account.availableBalance) - amount;
        }
        return this.accountRepository.save(account);
    }
    async freezeAccount(accountId) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        account.status = account_entity_1.AccountStatus.FROZEN;
        return this.accountRepository.save(account);
    }
    async unfreezeAccount(accountId) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        account.status = account_entity_1.AccountStatus.ACTIVE;
        return this.accountRepository.save(account);
    }
    async closeAccount(accountId) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        if (account.balance > 0) {
            throw new common_1.BadRequestException('Cannot close account with remaining balance');
        }
        account.status = account_entity_1.AccountStatus.CLOSED;
        return this.accountRepository.save(account);
    }
    generateAccountNumber() {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `BNA${timestamp.slice(-8)}${random}`;
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map