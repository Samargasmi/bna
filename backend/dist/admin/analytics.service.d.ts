import { DummyDataService } from '../services/dummy-data.service';
export declare class AnalyticsService {
    private dummyDataService;
    constructor(dummyDataService: DummyDataService);
    getDashboardStats(): Promise<{
        users: {
            total: number;
            active: number;
            newThisMonth: number;
            growthRate: number;
        };
        accounts: {
            total: number;
            active: number;
            totalBalance: number;
        };
        transactions: {
            total: number;
            thisMonth: number;
            totalVolume: number;
            monthlyVolume: number;
        };
    }>;
    getTransactionAnalytics(period?: string): Promise<{
        byType: Record<string, number>;
        byStatus: Record<string, number>;
        byDate: Record<string, number>;
        volumeByType: Record<string, number>;
        averageTransactionSize: number;
    }>;
    getUserAnalytics(): Promise<{
        byStatus: Record<string, number>;
        byRegistrationDate: Record<string, number>;
        averageAccountsPerUser: number;
        usersWithMultipleAccounts: number;
    }>;
    getAccountAnalytics(): Promise<{
        byType: Record<string, number>;
        byStatus: Record<string, number>;
        balanceDistribution: {
            min: number;
            max: number;
            count: number;
        }[];
        averageBalanceByType: Record<string, number>;
    }>;
    private groupTransactionsByType;
    private groupTransactionsByStatus;
    private groupTransactionsByDate;
    private calculateVolumeByType;
    private calculateAverageTransactionSize;
    private groupUsersByStatus;
    private groupUsersByRegistrationDate;
    private calculateAverageAccountsPerUser;
    private countUsersWithMultipleAccounts;
    private groupAccountsByType;
    private groupAccountsByStatus;
    private calculateBalanceDistribution;
    private calculateAverageBalanceByType;
}
