"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDataService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const account_entity_1 = require("../entities/account.entity");
const transaction_entity_1 = require("../entities/transaction.entity");
let DummyDataService = class DummyDataService {
    constructor() {
        this.users = [];
        this.accounts = [];
        this.transactions = [];
        this.initializeDummyData();
    }
    initializeDummyData() {
        const admin = {
            id: 'admin-1',
            email: 'admin@bna.com',
            firstName: 'Admin',
            lastName: 'BNA',
            phoneNumber: '+1234567890',
            address: '',
            dateOfBirth: new Date('1990-01-01'),
            role: user_entity_1.UserRole.ADMIN,
            status: user_entity_1.UserStatus.ACTIVE,
            password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7qj6bLz4hG',
            nationalId: 'ADMIN001',
            isEmailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            accounts: [],
            transactions: [],
            hashPassword: async function () { return; },
            validatePassword: async function (password) { return bcrypt.compare(password, this.password); },
            get fullName() { return `${this.firstName} ${this.lastName}`; }
        };
        const client1 = {
            id: 'client-1',
            email: 'john.doe@email.com',
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '+1234567891',
            address: '123 Main St, New York, NY',
            dateOfBirth: new Date('1990-01-15'),
            role: user_entity_1.UserRole.CLIENT,
            status: user_entity_1.UserStatus.ACTIVE,
            password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7qj6bLz4hG',
            nationalId: 'CLIENT001',
            isEmailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            accounts: [],
            transactions: [],
            hashPassword: async function () { return; },
            validatePassword: async function (password) { return bcrypt.compare(password, this.password); },
            get fullName() { return `${this.firstName} ${this.lastName}`; }
        };
        const client2 = {
            id: 'client-2',
            email: 'jane.smith@email.com',
            firstName: 'Jane',
            lastName: 'Smith',
            phoneNumber: '+1234567892',
            address: '456 Oak Ave, Los Angeles, CA',
            dateOfBirth: new Date('1985-05-20'),
            role: user_entity_1.UserRole.CLIENT,
            status: user_entity_1.UserStatus.ACTIVE,
            password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7qj6bLz4hG',
            nationalId: 'CLIENT002',
            isEmailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            accounts: [],
            transactions: [],
            hashPassword: async function () { return; },
            validatePassword: async function (password) { return bcrypt.compare(password, this.password); },
            get fullName() { return `${this.firstName} ${this.lastName}`; }
        };
        this.users = [admin, client1, client2];
        const account1 = {
            id: 'account-1',
            accountNumber: 'BNA1234567890',
            type: account_entity_1.AccountType.SAVINGS,
            status: account_entity_1.AccountStatus.ACTIVE,
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
            generateAccountNumber: function () { return this.accountNumber; },
            canWithdraw: function (amount) { return this.status === account_entity_1.AccountStatus.ACTIVE && this.availableBalance >= amount; },
            canDeposit: function () { return this.status === account_entity_1.AccountStatus.ACTIVE || this.status === account_entity_1.AccountStatus.INACTIVE; }
        };
        const account2 = {
            id: 'account-2',
            accountNumber: 'BNA1234567891',
            type: account_entity_1.AccountType.CHECKING,
            status: account_entity_1.AccountStatus.ACTIVE,
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
            generateAccountNumber: function () { return this.accountNumber; },
            canWithdraw: function (amount) { return this.status === account_entity_1.AccountStatus.ACTIVE && this.availableBalance >= amount; },
            canDeposit: function () { return this.status === account_entity_1.AccountStatus.ACTIVE || this.status === account_entity_1.AccountStatus.INACTIVE; }
        };
        const account3 = {
            id: 'account-3',
            accountNumber: 'BNA1234567892',
            type: account_entity_1.AccountType.BUSINESS,
            status: account_entity_1.AccountStatus.ACTIVE,
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
            generateAccountNumber: function () { return this.accountNumber; },
            canWithdraw: function (amount) { return this.status === account_entity_1.AccountStatus.ACTIVE && this.availableBalance >= amount; },
            canDeposit: function () { return this.status === account_entity_1.AccountStatus.ACTIVE || this.status === account_entity_1.AccountStatus.INACTIVE; }
        };
        this.accounts = [account1, account2, account3];
        const transaction1 = {
            id: 'txn-1',
            transactionId: 'TXN1234567890',
            type: transaction_entity_1.TransactionType.DEPOSIT,
            status: transaction_entity_1.TransactionStatus.COMPLETED,
            amount: 1000.00,
            fee: 0.00,
            balanceAfter: 5000.00,
            description: 'Initial deposit',
            reference: 'DEP001',
            userId: 'client-1',
            accountId: 'account-1',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
            user: client1,
            account: account1,
            merchantName: '',
            category: '',
            location: '',
            metadata: {},
            get isDebit() { return this.type === transaction_entity_1.TransactionType.WITHDRAWAL || this.type === transaction_entity_1.TransactionType.TRANSFER; },
            get isCredit() { return this.type === transaction_entity_1.TransactionType.DEPOSIT; }
        };
        const transaction2 = {
            id: 'txn-2',
            transactionId: 'TXN1234567891',
            type: transaction_entity_1.TransactionType.WITHDRAWAL,
            status: transaction_entity_1.TransactionStatus.COMPLETED,
            amount: 500.00,
            fee: 2.50,
            balanceAfter: 4500.00,
            description: 'ATM withdrawal',
            reference: 'ATM001',
            userId: 'client-1',
            accountId: 'account-1',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
            user: client1,
            account: account1,
            merchantName: '',
            category: '',
            location: '',
            metadata: {},
            get isDebit() { return this.type === transaction_entity_1.TransactionType.WITHDRAWAL || this.type === transaction_entity_1.TransactionType.TRANSFER; },
            get isCredit() { return this.type === transaction_entity_1.TransactionType.DEPOSIT; }
        };
        const transaction3 = {
            id: 'txn-3',
            transactionId: 'TXN1234567892',
            type: transaction_entity_1.TransactionType.TRANSFER,
            status: transaction_entity_1.TransactionStatus.COMPLETED,
            amount: 200.00,
            fee: 1.00,
            balanceAfter: 2300.00,
            description: 'Transfer to savings',
            reference: 'TRF001',
            userId: 'client-1',
            accountId: 'account-2',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(),
            user: client1,
            account: account2,
            merchantName: '',
            category: '',
            location: '',
            metadata: {},
            get isDebit() { return this.type === transaction_entity_1.TransactionType.WITHDRAWAL || this.type === transaction_entity_1.TransactionType.TRANSFER; },
            get isCredit() { return this.type === transaction_entity_1.TransactionType.DEPOSIT; }
        };
        this.transactions = [transaction1, transaction2, transaction3];
    }
    async findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }
    async findUserById(id) {
        return this.users.find(user => user.id === id);
    }
    async createUser(userData) {
        const newUser = {
            id: `user-${Date.now()}`,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phoneNumber: userData.phoneNumber,
            address: userData.address || '',
            dateOfBirth: userData.dateOfBirth || new Date(),
            role: userData.role || user_entity_1.UserRole.CLIENT,
            status: userData.status || user_entity_1.UserStatus.ACTIVE,
            password: userData.password,
            nationalId: userData.nationalId || '',
            isEmailVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            accounts: [],
            transactions: [],
            hashPassword: async function () { return; },
            validatePassword: async function (password) { return bcrypt.compare(password, this.password); },
            get fullName() { return `${this.firstName} ${this.lastName}`; }
        };
        this.users.push(newUser);
        return newUser;
    }
    async updateUser(id, userData) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return undefined;
        this.users[userIndex] = { ...this.users[userIndex], ...userData, updatedAt: new Date() };
        return this.users[userIndex];
    }
    async getAllUsers() {
        return this.users.filter(user => user.role === user_entity_1.UserRole.CLIENT);
    }
    async deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return false;
        this.users.splice(userIndex, 1);
        return true;
    }
    async findAccountsByUserId(userId) {
        return this.accounts.filter(account => account.userId === userId);
    }
    async findAccountById(id) {
        return this.accounts.find(account => account.id === id);
    }
    async createAccount(accountData) {
        const newAccount = {
            id: `account-${Date.now()}`,
            accountNumber: `BNA${Date.now()}`,
            type: accountData.type,
            status: accountData.status || account_entity_1.AccountStatus.ACTIVE,
            balance: accountData.balance || 0,
            availableBalance: accountData.availableBalance || 0,
            interestRate: accountData.interestRate || 0,
            currency: accountData.currency || 'USD',
            description: accountData.description || '',
            userId: accountData.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: this.users.find(u => u.id === accountData.userId),
            transactions: [],
            generateAccountNumber: function () { return this.accountNumber; },
            canWithdraw: function (amount) { return this.status === account_entity_1.AccountStatus.ACTIVE && this.availableBalance >= amount; },
            canDeposit: function () { return this.status === account_entity_1.AccountStatus.ACTIVE || this.status === account_entity_1.AccountStatus.INACTIVE; }
        };
        this.accounts.push(newAccount);
        return newAccount;
    }
    async updateAccountBalance(id, amount, type) {
        const accountIndex = this.accounts.findIndex(account => account.id === id);
        if (accountIndex === -1)
            return undefined;
        if (type === 'deposit') {
            this.accounts[accountIndex].balance += amount;
            this.accounts[accountIndex].availableBalance += amount;
        }
        else {
            this.accounts[accountIndex].balance -= amount;
            this.accounts[accountIndex].availableBalance -= amount;
        }
        this.accounts[accountIndex].updatedAt = new Date();
        return this.accounts[accountIndex];
    }
    async getAllAccounts() {
        return this.accounts;
    }
    async findTransactionsByUserId(userId, filters) {
        let transactions = this.transactions.filter(t => t.userId === userId);
        if (filters?.accountId) {
            transactions = transactions.filter(t => t.accountId === filters.accountId);
        }
        if (filters?.type) {
            transactions = transactions.filter(t => t.type === filters.type);
        }
        return transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    async findTransactionById(id) {
        return this.transactions.find(transaction => transaction.id === id);
    }
    async createTransaction(transactionData) {
        const newTransaction = {
            id: `txn-${Date.now()}`,
            transactionId: `TXN${Date.now()}`,
            type: transactionData.type,
            status: transactionData.status || transaction_entity_1.TransactionStatus.PENDING,
            amount: transactionData.amount,
            fee: transactionData.fee || 0,
            balanceAfter: transactionData.balanceAfter || 0,
            description: transactionData.description || '',
            reference: transactionData.reference || '',
            userId: transactionData.userId,
            accountId: transactionData.accountId,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: this.users.find(u => u.id === transactionData.userId),
            account: this.accounts.find(a => a.id === transactionData.accountId),
            merchantName: '',
            category: '',
            location: '',
            metadata: {},
            get isDebit() { return this.type === transaction_entity_1.TransactionType.WITHDRAWAL || this.type === transaction_entity_1.TransactionType.TRANSFER; },
            get isCredit() { return this.type === transaction_entity_1.TransactionType.DEPOSIT; }
        };
        this.transactions.push(newTransaction);
        return newTransaction;
    }
    async getAllTransactions() {
        return this.transactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    getDashboardStats() {
        const totalUsers = this.users.filter(u => u.role === user_entity_1.UserRole.CLIENT).length;
        const activeUsers = this.users.filter(u => u.role === user_entity_1.UserRole.CLIENT && u.status === user_entity_1.UserStatus.ACTIVE).length;
        const totalAccounts = this.accounts.length;
        const activeAccounts = this.accounts.filter(a => a.status === account_entity_1.AccountStatus.ACTIVE).length;
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
                newThisMonth: Math.floor(totalUsers * 0.1),
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
                monthlyVolume: totalTransactionVolume * 0.3,
            },
        };
    }
};
exports.DummyDataService = DummyDataService;
exports.DummyDataService = DummyDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DummyDataService);
//# sourceMappingURL=dummy-data.service.js.map