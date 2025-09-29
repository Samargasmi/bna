import { User } from '../entities/user.entity';
import { ClientsService } from './clients.service';
import { AccountsService } from './accounts.service';
import { TransactionsService } from './transactions.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionFilterDto } from './dto/transaction-filter.dto';
export declare class ClientsController {
    private clientsService;
    private accountsService;
    private transactionsService;
    constructor(clientsService: ClientsService, accountsService: AccountsService, transactionsService: TransactionsService);
    getProfile(user: User): Promise<User>;
    updateProfile(user: User, updateProfileDto: UpdateProfileDto): Promise<User>;
    getAccounts(user: User): Promise<import("../entities/account.entity").Account[]>;
    getAccountSummary(user: User): Promise<{
        totalAccounts: number;
        totalBalance: number;
        totalAvailableBalance: number;
        accounts: {
            id: string;
            accountNumber: string;
            type: import("../entities/account.entity").AccountType;
            balance: number;
            availableBalance: number;
            status: import("../entities/account.entity").AccountStatus;
            currency: string;
        }[];
    }>;
    getAccountById(user: User, accountId: string): Promise<import("../entities/account.entity").Account>;
    createAccount(user: User, accountData: any): Promise<import("../entities/account.entity").Account>;
    getTransactions(user: User, filters: TransactionFilterDto): Promise<import("../entities/transaction.entity").Transaction[]>;
    getTransactionSummary(user: User, accountId?: string, period?: string): Promise<{
        totalTransactions: number;
        totalAmount: number;
        totalFees: number;
        deposits: number;
        withdrawals: number;
        transfers: number;
        payments: number;
        completed: number;
        pending: number;
        failed: number;
    }>;
    getTransactionById(user: User, transactionId: string): Promise<import("../entities/transaction.entity").Transaction>;
    createTransaction(user: User, createTransactionDto: CreateTransactionDto): Promise<import("../entities/transaction.entity").Transaction>;
}
