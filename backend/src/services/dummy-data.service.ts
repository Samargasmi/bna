import { Injectable } from '@nestjs/common';
import { User, UserRole, UserStatus } from '../entities/user.entity';
import { Account, AccountType, AccountStatus } from '../entities/account.entity';
import { Transaction, TransactionType, TransactionStatus } from '../entities/transaction.entity';

@Injectable()
export class DummyDataService {
  private users: User[] = [];
  private accounts: Account[] = [];
  private transactions: Transaction[] = [];

  constructor() {
    this.initializeDummyData();
  }

  private initializeDummyData() {
    // Create admin user
    const admin: any = {
      id: 'admin-1',
      email: 'admin@bna.com',
      firstName: 'Admin',
      lastName: 'BNA',
      phoneNumber: '+1234567890',
      address: '',
      dateOfBirth: new Date('1990-01-01'),
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7qj6bLz4hG', // admin123
      nationalId: 'ADMIN001',
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: [],
      transactions: [],
      hashPassword: async function() { return; },
      validatePassword: async function(password: string) { return bcrypt.compare(password, this.password); },
      get fullName() { return `${this.firstName} ${this.lastName}`; }
    };

    // Create sample client users
    const client1: any = {
      id: 'client-1',
      email: 'john.doe@email.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+1234567891',
      address: '123 Main St, New York, NY',
      dateOfBirth: new Date('1990-01-15'),
      role: UserRole.CLIENT,
      status: UserStatus.ACTIVE,
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7qj6bLz4hG', // password123
      nationalId: 'CLIENT001',
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: [],
      transactions: [],
      hashPassword: async function() { return; },
      validatePassword: async function(password: string) { return bcrypt.compare(password, this.password); },
      get fullName() { return `${this.firstName} ${this.lastName}`; }
    };

    const client2: any = {
      id: 'client-2',
      email: 'jane.smith@email.com',
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '+1234567892',
      address: '456 Oak Ave, Los Angeles, CA',
      dateOfBirth: new Date('1985-05-20'),
      role: UserRole.CLIENT,
      status: UserStatus.ACTIVE,
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7qj6bLz4hG', // password123
      nationalId: 'CLIENT002',
      isEmailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: [],
      transactions: [],
      hashPassword: async function() { return; },
      validatePassword: async function(password: string) { return bcrypt.compare(password, this.password); },
      get fullName() { return `${this.firstName} ${this.lastName}`; }
    };

    this.users = [admin, client1, client2];

    // Create sample accounts
    const account1: any = {
      id: 'account-1',
      accountNumber: 'BNA1234567890',
      type: AccountType.SAVINGS,
      status: AccountStatus.ACTIVE,
      balance: 5000.00,
      availableBalance: 5000.00,
      interestRate: 2.5,
      currency: 'USD',
      description: 'Primary Savings Account',
      userId: 'client-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      user: client1,
      transactions: [],
      generateAccountNumber: function() { return this.accountNumber; },
      canWithdraw: function(amount: number) { return this.status === AccountStatus.ACTIVE && this.availableBalance >= amount; },
      canDeposit: function() { return this.status === AccountStatus.ACTIVE || this.status === AccountStatus.INACTIVE; }
    };

    const account2: any = {
      id: 'account-2',
      accountNumber: 'BNA1234567891',
      type: AccountType.CHECKING,
      status: AccountStatus.ACTIVE,
      balance: 2500.00,
      availableBalance: 2500.00,
      interestRate: 0.5,
      currency: 'USD',
      description: 'Checking Account',
      userId: 'client-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      user: client1,
      transactions: [],
      generateAccountNumber: function() { return this.accountNumber; },
      canWithdraw: function(amount: number) { return this.status === AccountStatus.ACTIVE && this.availableBalance >= amount; },
      canDeposit: function() { return this.status === AccountStatus.ACTIVE || this.status === AccountStatus.INACTIVE; }
    };

    const account3: any = {
      id: 'account-3',
      accountNumber: 'BNA1234567892',
      type: AccountType.BUSINESS,
      status: AccountStatus.ACTIVE,
      balance: 15000.00,
      availableBalance: 15000.00,
      interestRate: 1.5,
      currency: 'USD',
      description: 'Business Account',
      userId: 'client-2',
      createdAt: new Date(),
      updatedAt: new Date(),
      user: client2,
      transactions: [],
      generateAccountNumber: function() { return this.accountNumber; },
      canWithdraw: function(amount: number) { return this.status === AccountStatus.ACTIVE && this.availableBalance >= amount; },
      canDeposit: function() { return this.status === AccountStatus.ACTIVE || this.status === AccountStatus.INACTIVE; }
    };

    this.accounts = [account1, account2, account3];

    // Create sample transactions
    const transaction1: any = {
      id: 'txn-1',
      transactionId: 'TXN1234567890',
      type: TransactionType.DEPOSIT,
      status: TransactionStatus.COMPLETED,
      amount: 1000.00,
      fee: 0.00,
      balanceAfter: 5000.00,
      description: 'Initial deposit',
      reference: 'DEP001',
      userId: 'client-1',
      accountId: 'account-1',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      updatedAt: new Date(),
      user: client1,
      account: account1,
      merchantName: '',
      category: '',
      location: '',
      metadata: {},
      get isDebit() { return this.type === TransactionType.WITHDRAWAL || this.type === TransactionType.TRANSFER; },
      get isCredit() { return this.type === TransactionType.DEPOSIT; }
    };

    const transaction2: any = {
      id: 'txn-2',
      transactionId: 'TXN1234567891',
      type: TransactionType.WITHDRAWAL,
      status: TransactionStatus.COMPLETED,
      amount: 500.00,
      fee: 2.50,
      balanceAfter: 4500.00,
      description: 'ATM withdrawal',
      reference: 'ATM001',
      userId: 'client-1',
      accountId: 'account-1',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      updatedAt: new Date(),
      user: client1,
      account: account1,
      merchantName: '',
      category: '',
      location: '',
      metadata: {},
      get isDebit() { return this.type === TransactionType.WITHDRAWAL || this.type === TransactionType.TRANSFER; },
      get isCredit() { return this.type === TransactionType.DEPOSIT; }
    };

    const transaction3: any = {
      id: 'txn-3',
      transactionId: 'TXN1234567892',
      type: TransactionType.TRANSFER,
      status: TransactionStatus.COMPLETED,
      amount: 200.00,
      fee: 1.00,
      balanceAfter: 2300.00,
      description: 'Transfer to savings',
      reference: 'TRF001',
      userId: 'client-1',
      accountId: 'account-2',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      updatedAt: new Date(),
      user: client1,
      account: account2,
      merchantName: '',
      category: '',
      location: '',
      metadata: {},
      get isDebit() { return this.type === TransactionType.WITHDRAWAL || this.type === TransactionType.TRANSFER; },
      get isCredit() { return this.type === TransactionType.DEPOSIT; }
    };

    this.transactions = [transaction1, transaction2, transaction3];
  }

  // User methods
  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async createUser(userData: Partial<User>): Promise<any> {
    const newUser: any = {
      id: `user-${Date.now()}`,
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      phoneNumber: userData.phoneNumber!,
      address: userData.address || '',
      dateOfBirth: userData.dateOfBirth || new Date(),
      role: userData.role || UserRole.CLIENT,
      status: userData.status || UserStatus.ACTIVE,
      password: userData.password!,
      nationalId: userData.nationalId || '',
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: [],
      transactions: [],
      hashPassword: async function() { return; },
      validatePassword: async function(password: string) { return bcrypt.compare(password, this.password); },
      get fullName() { return `${this.firstName} ${this.lastName}`; }
    };
    
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return undefined;
    
    this.users[userIndex] = { ...this.users[userIndex], ...userData, updatedAt: new Date() };
    return this.users[userIndex];
  }

  async getAllUsers(): Promise<User[]> {
    return this.users.filter(user => user.role === UserRole.CLIENT);
  }

  async deleteUser(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    this.users.splice(userIndex, 1);
    return true;
  }

  // Account methods
  async findAccountsByUserId(userId: string): Promise<Account[]> {
    return this.accounts.filter(account => account.userId === userId);
  }

  async findAccountById(id: string): Promise<Account | undefined> {
    return this.accounts.find(account => account.id === id);
  }

  async createAccount(accountData: Partial<Account>): Promise<any> {
    const newAccount: any = {
      id: `account-${Date.now()}`,
      accountNumber: `BNA${Date.now()}`,
      type: accountData.type!,
      status: accountData.status || AccountStatus.ACTIVE,
      balance: accountData.balance || 0,
      availableBalance: accountData.availableBalance || 0,
      interestRate: accountData.interestRate || 0,
      currency: accountData.currency || 'USD',
      description: accountData.description || '',
      userId: accountData.userId!,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: this.users.find(u => u.id === accountData.userId)!,
      transactions: [],
      generateAccountNumber: function() { return this.accountNumber; },
      canWithdraw: function(amount: number) { return this.status === AccountStatus.ACTIVE && this.availableBalance >= amount; },
      canDeposit: function() { return this.status === AccountStatus.ACTIVE || this.status === AccountStatus.INACTIVE; }
    };
    
    this.accounts.push(newAccount);
    return newAccount;
  }

  async updateAccountBalance(id: string, amount: number, type: 'deposit' | 'withdrawal'): Promise<Account | undefined> {
    const accountIndex = this.accounts.findIndex(account => account.id === id);
    if (accountIndex === -1) return undefined;
    
    if (type === 'deposit') {
      this.accounts[accountIndex].balance += amount;
      this.accounts[accountIndex].availableBalance += amount;
    } else {
      this.accounts[accountIndex].balance -= amount;
      this.accounts[accountIndex].availableBalance -= amount;
    }
    
    this.accounts[accountIndex].updatedAt = new Date();
    return this.accounts[accountIndex];
  }

  async getAllAccounts(): Promise<Account[]> {
    return this.accounts;
  }

  // Transaction methods
  async findTransactionsByUserId(userId: string, filters?: any): Promise<Transaction[]> {
    let transactions = this.transactions.filter(t => t.userId === userId);
    
    if (filters?.accountId) {
      transactions = transactions.filter(t => t.accountId === filters.accountId);
    }
    
    if (filters?.type) {
      transactions = transactions.filter(t => t.type === filters.type);
    }
    
    return transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async findTransactionById(id: string): Promise<Transaction | undefined> {
    return this.transactions.find(transaction => transaction.id === id);
  }

  async createTransaction(transactionData: Partial<Transaction>): Promise<any> {
    const newTransaction: any = {
      id: `txn-${Date.now()}`,
      transactionId: `TXN${Date.now()}`,
      type: transactionData.type!,
      status: transactionData.status || TransactionStatus.PENDING,
      amount: transactionData.amount!,
      fee: transactionData.fee || 0,
      balanceAfter: transactionData.balanceAfter || 0,
      description: transactionData.description || '',
      reference: transactionData.reference || '',
      userId: transactionData.userId!,
      accountId: transactionData.accountId!,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: this.users.find(u => u.id === transactionData.userId)!,
      account: this.accounts.find(a => a.id === transactionData.accountId)!,
      merchantName: '',
      category: '',
      location: '',
      metadata: {},
      get isDebit() { return this.type === TransactionType.WITHDRAWAL || this.type === TransactionType.TRANSFER; },
      get isCredit() { return this.type === TransactionType.DEPOSIT; }
    };
    
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Analytics methods
  getDashboardStats() {
    const totalUsers = this.users.filter(u => u.role === UserRole.CLIENT).length;
    const activeUsers = this.users.filter(u => u.role === UserRole.CLIENT && u.status === UserStatus.ACTIVE).length;
    const totalAccounts = this.accounts.length;
    const activeAccounts = this.accounts.filter(a => a.status === AccountStatus.ACTIVE).length;
    const totalBalance = this.accounts.reduce((sum, a) => sum + a.balance, 0);
    const totalTransactions = this.transactions.length;
    
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const transactionsThisMonth = this.transactions.filter(t => t.createdAt >= lastMonth).length;
    const totalTransactionVolume = this.transactions.reduce((sum, t) => sum + t.amount, 0);
    
    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        newThisMonth: Math.floor(totalUsers * 0.1), // 10% growth
        growthRate: 10.0,
      },
      accounts: {
        total: totalAccounts,
        active: activeAccounts,
        totalBalance: totalBalance,
      },
      transactions: {
        total: totalTransactions,
        thisMonth: transactionsThisMonth,
        totalVolume: totalTransactionVolume,
        monthlyVolume: totalTransactionVolume * 0.3, // 30% of total volume this month
      },
    };
  }
}
