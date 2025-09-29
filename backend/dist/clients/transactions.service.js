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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const transaction_entity_1 = require("../entities/transaction.entity");
const dummy_data_service_1 = require("../services/dummy-data.service");
let TransactionsService = class TransactionsService {
    constructor(dummyDataService) {
        this.dummyDataService = dummyDataService;
    }
    async createTransaction(userId, createTransactionDto) {
        const account = await this.dummyDataService.findAccountById(createTransactionDto.accountId);
        if (!account || account.userId !== userId) {
            throw new common_1.NotFoundException('Account not found');
        }
        if (createTransactionDto.type === transaction_entity_1.TransactionType.WITHDRAWAL) {
            if (account.balance < createTransactionDto.amount) {
                throw new common_1.BadRequestException('Insufficient funds');
            }
        }
        const transaction = await this.dummyDataService.createTransaction({
            ...createTransactionDto,
            userId,
        });
        await this.dummyDataService.updateAccountBalance(account.id, createTransactionDto.amount, createTransactionDto.type === transaction_entity_1.TransactionType.DEPOSIT ? 'deposit' : 'withdrawal');
        return transaction;
    }
    async getTransactions(userId, accountId, filters) {
        return this.dummyDataService.findTransactionsByUserId(userId, { accountId, ...filters });
    }
    async getTransactionById(transactionId, userId) {
        const transaction = await this.dummyDataService.findTransactionById(transactionId);
        if (!transaction || transaction.userId !== userId) {
            throw new common_1.NotFoundException('Transaction not found');
        }
        return transaction;
    }
    async getTransactionSummary(userId, accountId, period) {
        const transactions = await this.dummyDataService.findTransactionsByUserId(userId, { accountId });
        const summary = {
            totalTransactions: transactions.length,
            totalAmount: transactions.reduce((sum, t) => sum + Number(t.amount), 0),
            totalFees: transactions.reduce((sum, t) => sum + Number(t.fee || 0), 0),
            deposits: transactions.filter(t => t.type === transaction_entity_1.TransactionType.DEPOSIT).length,
            withdrawals: transactions.filter(t => t.type === transaction_entity_1.TransactionType.WITHDRAWAL).length,
            transfers: transactions.filter(t => t.type === transaction_entity_1.TransactionType.TRANSFER).length,
            payments: transactions.filter(t => t.type === transaction_entity_1.TransactionType.PAYMENT).length,
            completed: transactions.filter(t => t.status === transaction_entity_1.TransactionStatus.COMPLETED).length,
            pending: transactions.filter(t => t.status === transaction_entity_1.TransactionStatus.PENDING).length,
            failed: transactions.filter(t => t.status === transaction_entity_1.TransactionStatus.FAILED).length,
        };
        return summary;
    }
    async updateAccountBalance(account, transaction) {
        if (transaction.type === transaction_entity_1.TransactionType.DEPOSIT) {
            account.balance = Number(account.balance) + transaction.amount;
            account.availableBalance = Number(account.availableBalance) + transaction.amount;
        }
        else if (transaction.type === transaction_entity_1.TransactionType.WITHDRAWAL) {
            account.balance = Number(account.balance) - transaction.amount;
            account.availableBalance = Number(account.availableBalance) - transaction.amount;
        }
        await this.dummyDataService.updateAccountBalance(account.id, transaction.amount, transaction.type === transaction_entity_1.TransactionType.DEPOSIT ? 'deposit' : 'withdrawal');
    }
    generateTransactionId() {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return `TXN${timestamp.slice(-10)}${random}`;
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dummy_data_service_1.DummyDataService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map