import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Transaction, TransactionType, TransactionStatus } from '../entities/transaction.entity';
import { Account } from '../entities/account.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionFilterDto } from './dto/transaction-filter.dto';
import { DummyDataService } from '../services/dummy-data.service';

@Injectable()
export class TransactionsService {
  constructor(
    private dummyDataService: DummyDataService,
  ) {}

  async createTransaction(
    userId: string,
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const account = await this.dummyDataService.findAccountById(createTransactionDto.accountId);

    if (!account || account.userId !== userId) {
      throw new NotFoundException('Account not found');
    }

    if (createTransactionDto.type === TransactionType.WITHDRAWAL) {
      if (account.balance < createTransactionDto.amount) {
        throw new BadRequestException('Insufficient funds');
      }
    }

    const transaction = await this.dummyDataService.createTransaction({
      ...createTransactionDto,
      userId,
    });

    // Update account balance
    await this.dummyDataService.updateAccountBalance(
      account.id,
      createTransactionDto.amount,
      createTransactionDto.type === TransactionType.DEPOSIT ? 'deposit' : 'withdrawal'
    );

    return transaction;
  }

  async getTransactions(
    userId: string,
    accountId?: string,
    filters?: TransactionFilterDto,
  ): Promise<Transaction[]> {
    return this.dummyDataService.findTransactionsByUserId(userId, { accountId, ...filters });
  }

  async getTransactionById(transactionId: string, userId: string): Promise<Transaction> {
    const transaction = await this.dummyDataService.findTransactionById(transactionId);

    if (!transaction || transaction.userId !== userId) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async getTransactionSummary(userId: string, accountId?: string, period?: string) {
    const transactions = await this.dummyDataService.findTransactionsByUserId(userId, { accountId });

    const summary = {
      totalTransactions: transactions.length,
      totalAmount: transactions.reduce((sum, t) => sum + Number(t.amount), 0),
      totalFees: transactions.reduce((sum, t) => sum + Number(t.fee || 0), 0),
      deposits: transactions.filter(t => t.type === TransactionType.DEPOSIT).length,
      withdrawals: transactions.filter(t => t.type === TransactionType.WITHDRAWAL).length,
      transfers: transactions.filter(t => t.type === TransactionType.TRANSFER).length,
      payments: transactions.filter(t => t.type === TransactionType.PAYMENT).length,
      completed: transactions.filter(t => t.status === TransactionStatus.COMPLETED).length,
      pending: transactions.filter(t => t.status === TransactionStatus.PENDING).length,
      failed: transactions.filter(t => t.status === TransactionStatus.FAILED).length,
    };

    return summary;
  }

  private async updateAccountBalance(account: Account, transaction: CreateTransactionDto) {
    if (transaction.type === TransactionType.DEPOSIT) {
      account.balance = Number(account.balance) + transaction.amount;
      account.availableBalance = Number(account.availableBalance) + transaction.amount;
    } else if (transaction.type === TransactionType.WITHDRAWAL) {
      account.balance = Number(account.balance) - transaction.amount;
      account.availableBalance = Number(account.availableBalance) - transaction.amount;
    }

    // Update using dummy data service
    await this.dummyDataService.updateAccountBalance(
      account.id,
      transaction.amount,
      transaction.type === TransactionType.DEPOSIT ? 'deposit' : 'withdrawal'
    );
  }

  private generateTransactionId(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `TXN${timestamp.slice(-10)}${random}`;
  }
}
