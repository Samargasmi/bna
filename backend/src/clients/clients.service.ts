import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { User, UserStatus } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DummyDataService } from '../services/dummy-data.service';

@Injectable()
export class ClientsService {
  constructor(
    private dummyDataService: DummyDataService,
  ) {}

  async getProfile(userId: string): Promise<User> {
    const user = await this.dummyDataService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove password from response
    const { password, ...profile } = user;
    return profile as User;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.dummyDataService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if email is being changed and if it's already taken
    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      const existingUser = await this.dummyDataService.findUserByEmail(updateProfileDto.email);

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
    }

    const updatedUser = await this.dummyDataService.updateUser(userId, updateProfileDto);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    const { password, ...profile } = updatedUser;
    return profile as User;
  }

  async getAccounts(userId: string): Promise<Account[]> {
    return this.dummyDataService.findAccountsByUserId(userId);
  }

  async getAccountById(userId: string, accountId: string): Promise<Account> {
    const account = await this.dummyDataService.findAccountById(accountId);

    if (!account || account.userId !== userId) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async createAccount(userId: string, accountData: Partial<Account>): Promise<Account> {
    const user = await this.dummyDataService.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const account = await this.dummyDataService.createAccount({
      ...accountData,
      userId,
    });

    return account;
  }

  async getAccountSummary(userId: string) {
    const accounts = await this.getAccounts(userId);
    
    const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
    const totalAvailableBalance = accounts.reduce((sum, account) => sum + Number(account.availableBalance), 0);
    
    return {
      totalAccounts: accounts.length,
      totalBalance,
      totalAvailableBalance,
      accounts: accounts.map(account => ({
        id: account.id,
        accountNumber: account.accountNumber,
        type: account.type,
        balance: account.balance,
        availableBalance: account.availableBalance,
        status: account.status,
        currency: account.currency,
      })),
    };
  }
}
