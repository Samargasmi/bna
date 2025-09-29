import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionFilterDto } from './dto/transaction-filter.dto';
import { DummyDataService } from '../services/dummy-data.service';
export declare class TransactionsService {
    private dummyDataService;
    constructor(dummyDataService: DummyDataService);
    createTransaction(userId: string, createTransactionDto: CreateTransactionDto): Promise<Transaction>;
    getTransactions(userId: string, accountId?: string, filters?: TransactionFilterDto): Promise<Transaction[]>;
    getTransactionById(transactionId: string, userId: string): Promise<Transaction>;
    getTransactionSummary(userId: string, accountId?: string, period?: string): Promise<{
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
    private updateAccountBalance;
    private generateTransactionId;
}
