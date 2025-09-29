import { UserRole, UserStatus } from '../entities/user.entity';
import { AdminService } from './admin.service';
import { AnalyticsService } from './analytics.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
export declare class AdminController {
    private adminService;
    private analyticsService;
    constructor(adminService: AdminService, analyticsService: AnalyticsService);
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
    getAllUsers(filters: UserFilterDto): Promise<{
        users: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            address: string;
            dateOfBirth: Date;
            role: UserRole;
            status: UserStatus;
            nationalId: string;
            isEmailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            accounts: import("../entities/account.entity").Account[];
            transactions: import("../entities/transaction.entity").Transaction[];
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getUserById(userId: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string;
        dateOfBirth: Date;
        role: UserRole;
        status: UserStatus;
        nationalId: string;
        isEmailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        accounts: import("../entities/account.entity").Account[];
        transactions: import("../entities/transaction.entity").Transaction[];
    }>;
    createUser(createUserDto: CreateUserDto): Promise<any>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string;
        dateOfBirth: Date;
        role: UserRole;
        status: UserStatus;
        nationalId: string;
        isEmailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        accounts: import("../entities/account.entity").Account[];
        transactions: import("../entities/transaction.entity").Transaction[];
    }>;
    updateUserStatus(userId: string, status: UserStatus): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string;
        dateOfBirth: Date;
        role: UserRole;
        status: UserStatus;
        nationalId: string;
        isEmailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        accounts: import("../entities/account.entity").Account[];
        transactions: import("../entities/transaction.entity").Transaction[];
    }>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
    getAllAccounts(filters: any): Promise<{
        accounts: import("../entities/account.entity").Account[];
        total: number;
        page: number;
        limit: any;
    }>;
    getAllTransactions(filters: any): Promise<{
        transactions: import("../entities/transaction.entity").Transaction[];
        total: number;
        page: number;
        limit: any;
    }>;
}
