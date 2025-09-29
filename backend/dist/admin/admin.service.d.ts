import { UserRole, UserStatus } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { DummyDataService } from '../services/dummy-data.service';
export declare class AdminService {
    private dummyDataService;
    constructor(dummyDataService: DummyDataService);
    getAllUsers(filters?: UserFilterDto): Promise<{
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
            accounts: Account[];
            transactions: Transaction[];
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
        accounts: Account[];
        transactions: Transaction[];
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
        accounts: Account[];
        transactions: Transaction[];
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
        accounts: Account[];
        transactions: Transaction[];
    }>;
    deleteUser(userId: string): Promise<{
        message: string;
    }>;
    getAllAccounts(filters?: any): Promise<{
        accounts: Account[];
        total: number;
        page: number;
        limit: any;
    }>;
    getAllTransactions(filters?: any): Promise<{
        transactions: Transaction[];
        total: number;
        page: number;
        limit: any;
    }>;
}
