import { Injectable } from '@nestjs/common';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import { Account, AccountStatus } from '../entities/account.entity';
import { Transaction, TransactionType, TransactionStatus } from '../entities/transaction.entity';
import { DummyDataService } from '../services/dummy-data.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private dummyDataService: DummyDataService,
  ) {}

  async getDashboardStats() {
    return this.dummyDataService.getDashboardStats();
  }

  async getTransactionAnalytics(period: string = 'month') {
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

  private groupTransactionsByType(transactions: Transaction[]) {
    const grouped = transactions.reduce((acc, transaction) => {
      acc[transaction.type] = (acc[transaction.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return grouped;
  }

  private groupTransactionsByStatus(transactions: Transaction[]) {
    const grouped = transactions.reduce((acc, transaction) => {
      acc[transaction.status] = (acc[transaction.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return grouped;
  }

  private groupTransactionsByDate(transactions: Transaction[], period: string) {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = transaction.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return grouped;
  }

  private calculateVolumeByType(transactions: Transaction[]) {
    const volume = transactions.reduce((acc, transaction) => {
      acc[transaction.type] = (acc[transaction.type] || 0) + Number(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

    return volume;
  }

  private calculateAverageTransactionSize(transactions: Transaction[]) {
    if (transactions.length === 0) return 0;
    const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    return total / transactions.length;
  }

  private groupUsersByStatus(users: User[]) {
    const grouped = users.reduce((acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return grouped;
  }

  private groupUsersByRegistrationDate(users: User[]) {
    const grouped = users.reduce((acc, user) => {
      const date = user.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return grouped;
  }

  private calculateAverageAccountsPerUser(users: User[]) {
    if (users.length === 0) return 0;
    const totalAccounts = users.reduce((sum, user) => sum + user.accounts.length, 0);
    return totalAccounts / users.length;
  }

  private countUsersWithMultipleAccounts(users: User[]) {
    return users.filter(user => user.accounts.length > 1).length;
  }

  private groupAccountsByType(accounts: Account[]) {
    const grouped = accounts.reduce((acc, account) => {
      acc[account.type] = (acc[account.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return grouped;
  }

  private groupAccountsByStatus(accounts: Account[]) {
    const grouped = accounts.reduce((acc, account) => {
      acc[account.status] = (acc[account.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return grouped;
  }

  private calculateBalanceDistribution(accounts: Account[]) {
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
      if (range) range.count++;
    });

    return ranges;
  }

  private calculateAverageBalanceByType(accounts: Account[]) {
    const grouped = accounts.reduce((acc, account) => {
      if (!acc[account.type]) {
        acc[account.type] = { total: 0, count: 0 };
      }
      acc[account.type].total += Number(account.balance);
      acc[account.type].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const averages = Object.keys(grouped).reduce((acc, type) => {
      acc[type] = grouped[type].count > 0 ? grouped[type].total / grouped[type].count : 0;
      return acc;
    }, {} as Record<string, number>);

    return averages;
  }
}

