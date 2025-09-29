import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account, AccountType, AccountStatus } from '../entities/account.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAccount(userId: string, accountData: Partial<Account>): Promise<Account> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const account = this.accountRepository.create({
      ...accountData,
      userId,
      accountNumber: this.generateAccountNumber(),
    });

    return this.accountRepository.save(account);
  }

  async getAccountById(accountId: string, userId?: string): Promise<Account> {
    const whereClause: any = { id: accountId };
    if (userId) {
      whereClause.userId = userId;
    }

    const account = await this.accountRepository.findOne({
      where: whereClause,
      relations: ['user'],
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async updateAccountBalance(
    accountId: string,
    amount: number,
    type: 'deposit' | 'withdrawal',
  ): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id: accountId } });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (type === 'withdrawal' && !account.canWithdraw(amount)) {
      throw new BadRequestException('Insufficient funds or account not active');
    }

    if (type === 'deposit' && !account.canDeposit()) {
      throw new BadRequestException('Account cannot receive deposits');
    }

    if (type === 'deposit') {
      account.balance = Number(account.balance) + amount;
      account.availableBalance = Number(account.availableBalance) + amount;
    } else {
      account.balance = Number(account.balance) - amount;
      account.availableBalance = Number(account.availableBalance) - amount;
    }

    return this.accountRepository.save(account);
  }

  async freezeAccount(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id: accountId } });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    account.status = AccountStatus.FROZEN;
    return this.accountRepository.save(account);
  }

  async unfreezeAccount(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id: accountId } });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    account.status = AccountStatus.ACTIVE;
    return this.accountRepository.save(account);
  }

  async closeAccount(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id: accountId } });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (account.balance > 0) {
      throw new BadRequestException('Cannot close account with remaining balance');
    }

    account.status = AccountStatus.CLOSED;
    return this.accountRepository.save(account);
  }

  private generateAccountNumber(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `BNA${timestamp.slice(-8)}${random}`;
  }
}
