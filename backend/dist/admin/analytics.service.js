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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const dummy_data_service_1 = require("../services/dummy-data.service");
let AnalyticsService = class AnalyticsService {
    constructor(dummyDataService) {
        this.dummyDataService = dummyDataService;
    }
    async getDashboardStats() {
        return this.dummyDataService.getDashboardStats();
    }
    async getTransactionAnalytics(period = 'month') {
        const transactions = await this.dummyDataService.getAllTransactions();
        const analytics = {
            byType: this.groupTransactionsByType(transactions),
            byStatus: this.groupTransactionsByStatus(transactions),
            byDate: this.groupTransactionsByDate(transactions, period),
            volumeByType: this.calculateVolumeByType(transactions),
            averageTransactionSize: this.calculateAverageTransactionSize(transactions),
        };
        return analytics;
    }
    async getUserAnalytics() {
        const users = await this.dummyDataService.getAllUsers();
        const analytics = {
            byStatus: this.groupUsersByStatus(users),
            byRegistrationDate: this.groupUsersByRegistrationDate(users),
            averageAccountsPerUser: this.calculateAverageAccountsPerUser(users),
            usersWithMultipleAccounts: this.countUsersWithMultipleAccounts(users),
        };
        return analytics;
    }
    async getAccountAnalytics() {
        const accounts = await this.dummyDataService.getAllAccounts();
        const analytics = {
            byType: this.groupAccountsByType(accounts),
            byStatus: this.groupAccountsByStatus(accounts),
            balanceDistribution: this.calculateBalanceDistribution(accounts),
            averageBalanceByType: this.calculateAverageBalanceByType(accounts),
        };
        return analytics;
    }
    groupTransactionsByType(transactions) {
        const grouped = transactions.reduce((acc, transaction) => {
            acc[transaction.type] = (acc[transaction.type] || 0) + 1;
            return acc;
        }, {});
        return grouped;
    }
    groupTransactionsByStatus(transactions) {
        const grouped = transactions.reduce((acc, transaction) => {
            acc[transaction.status] = (acc[transaction.status] || 0) + 1;
            return acc;
        }, {});
        return grouped;
    }
    groupTransactionsByDate(transactions, period) {
        const grouped = transactions.reduce((acc, transaction) => {
            const date = transaction.createdAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        return grouped;
    }
    calculateVolumeByType(transactions) {
        const volume = transactions.reduce((acc, transaction) => {
            acc[transaction.type] = (acc[transaction.type] || 0) + Number(transaction.amount);
            return acc;
        }, {});
        return volume;
    }
    calculateAverageTransactionSize(transactions) {
        if (transactions.length === 0)
            return 0;
        const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
        return total / transactions.length;
    }
    groupUsersByStatus(users) {
        const grouped = users.reduce((acc, user) => {
            acc[user.status] = (acc[user.status] || 0) + 1;
            return acc;
        }, {});
        return grouped;
    }
    groupUsersByRegistrationDate(users) {
        const grouped = users.reduce((acc, user) => {
            const date = user.createdAt.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        return grouped;
    }
    calculateAverageAccountsPerUser(users) {
        if (users.length === 0)
            return 0;
        const totalAccounts = users.reduce((sum, user) => sum + user.accounts.length, 0);
        return totalAccounts / users.length;
    }
    countUsersWithMultipleAccounts(users) {
        return users.filter(user => user.accounts.length > 1).length;
    }
    groupAccountsByType(accounts) {
        const grouped = accounts.reduce((acc, account) => {
            acc[account.type] = (acc[account.type] || 0) + 1;
            return acc;
        }, {});
        return grouped;
    }
    groupAccountsByStatus(accounts) {
        const grouped = accounts.reduce((acc, account) => {
            acc[account.status] = (acc[account.status] || 0) + 1;
            return acc;
        }, {});
        return grouped;
    }
    calculateBalanceDistribution(accounts) {
        const ranges = [
            { min: 0, max: 1000, count: 0 },
            { min: 1000, max: 5000, count: 0 },
            { min: 5000, max: 10000, count: 0 },
            { min: 10000, max: 50000, count: 0 },
            { min: 50000, max: Infinity, count: 0 },
        ];
        accounts.forEach(account => {
            const balance = Number(account.balance);
            const range = ranges.find(r => balance >= r.min && balance < r.max);
            if (range)
                range.count++;
        });
        return ranges;
    }
    calculateAverageBalanceByType(accounts) {
        const grouped = accounts.reduce((acc, account) => {
            if (!acc[account.type]) {
                acc[account.type] = { total: 0, count: 0 };
            }
            acc[account.type].total += Number(account.balance);
            acc[account.type].count += 1;
            return acc;
        }, {});
        const averages = Object.keys(grouped).reduce((acc, type) => {
            acc[type] = grouped[type].count > 0 ? grouped[type].total / grouped[type].count : 0;
            return acc;
        }, {});
        return averages;
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dummy_data_service_1.DummyDataService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map