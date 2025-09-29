import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
export declare class DummyDataService {
    private users;
    private accounts;
    private transactions;
    constructor();
    private initializeDummyData;
    findUserByEmail(email: string): Promise<User | undefined>;
    findUserById(id: string): Promise<User | undefined>;
    createUser(userData: Partial<User>): Promise<any>;
    updateUser(id: string, userData: Partial<User>): Promise<User | undefined>;
    getAllUsers(): Promise<User[]>;
    deleteUser(id: string): Promise<boolean>;
    findAccountsByUserId(userId: string): Promise<Account[]>;
    findAccountById(id: string): Promise<Account | undefined>;
    createAccount(accountData: Partial<Account>): Promise<any>;
    updateAccountBalance(id: string, amount: number, type: 'deposit' | 'withdrawal'): Promise<Account | undefined>;
    getAllAccounts(): Promise<Account[]>;
    findTransactionsByUserId(userId: string, filters?: any): Promise<Transaction[]>;
    findTransactionById(id: string): Promise<Transaction | undefined>;
    createTransaction(transactionData: Partial<Transaction>): Promise<any>;
    getAllTransactions(): Promise<Transaction[]>;
    getDashboardStats(): {
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
    };
}
