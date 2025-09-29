import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import { Account, AccountStatus } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';
import { DummyDataService } from '../services/dummy-data.service';

@Injectable()
export class AdminService {
  constructor(
    private dummyDataService: DummyDataService,
  ) {}

  async getAllUsers(filters?: UserFilterDto) {
    const users = await this.dummyDataService.getAllUsers();
    
    let filteredUsers = users.filter(user => user.role !== UserRole.ADMIN);

    if (filters?.status) {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    const total = filteredUsers.length;
    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;
    const paginatedUsers = filteredUsers.slice(offset, offset + limit);

    return {
      users: paginatedUsers.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
    };
  }

  async getUserById(userId: string) {
    const user = await this.dummyDataService.findUserById(userId);

    if (!user || user.role === UserRole.ADMIN) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.dummyDataService.findUserByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const userData = {
      ...createUserDto,
      password: 'hashed-password', // In real app, hash the password
      role: UserRole.CLIENT,
      status: UserStatus.ACTIVE,
    };

    const savedUser = await this.dummyDataService.createUser(userData);
    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.dummyDataService.findUserById(userId);

    if (!user || user.role === UserRole.ADMIN) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.dummyDataService.findUserByEmail(updateUserDto.email);

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
    }

    const updatedUser = await this.dummyDataService.updateUser(userId, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async updateUserStatus(userId: string, status: UserStatus) {
    const user = await this.dummyDataService.findUserById(userId);

    if (!user || user.role === UserRole.ADMIN) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.dummyDataService.updateUser(userId, { status });

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteUser(userId: string) {
    const user = await this.dummyDataService.findUserById(userId);

    if (!user || user.role === UserRole.ADMIN) {
      throw new NotFoundException('User not found');
    }

    // Check if user has any active accounts with balance
    const accounts = await this.dummyDataService.findAccountsByUserId(userId);
    const hasBalance = accounts.some(account => account.balance > 0);

    if (hasBalance) {
      throw new BadRequestException('Cannot delete user with active accounts containing balance');
    }

    const deleted = await this.dummyDataService.deleteUser(userId);
    
    if (!deleted) {
      throw new NotFoundException('User not found');
    }

    return { message: 'User deleted successfully' };
  }

  async getAllAccounts(filters?: any) {
    const accounts = await this.dummyDataService.getAllAccounts();
    
    let filteredAccounts = accounts;

    if (filters?.status) {
      filteredAccounts = filteredAccounts.filter(account => account.status === filters.status);
    }

    if (filters?.type) {
      filteredAccounts = filteredAccounts.filter(account => account.type === filters.type);
    }

    const total = filteredAccounts.length;
    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;
    const paginatedAccounts = filteredAccounts.slice(offset, offset + limit);

    return {
      accounts: paginatedAccounts,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
    };
  }

  async getAllTransactions(filters?: any) {
    const transactions = await this.dummyDataService.getAllTransactions();
    
    let filteredTransactions = transactions;

    if (filters?.type) {
      filteredTransactions = filteredTransactions.filter(t => t.type === filters.type);
    }

    if (filters?.status) {
      filteredTransactions = filteredTransactions.filter(t => t.status === filters.status);
    }

    const total = filteredTransactions.length;
    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;
    const paginatedTransactions = filteredTransactions.slice(offset, offset + limit);

    return {
      transactions: paginatedTransactions,
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
    };
  }
}
