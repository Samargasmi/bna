// Mock data for client service
const mockProfile = {
  id: 'client-1',
  email: 'samar.guesmi@email.com',
  firstName: 'samar',
  lastName: 'guesmi',
  phoneNumber: '+1234567891',
  address: 'manzel boutguiba , bizerte',
  dateOfBirth: '1990-01-15',
  nationalId: 'CLIENT001',
  status: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const mockAccounts = [
  {
    id: 'account-1',
    accountNumber: 'BNA1234567890',
    type: 'savings',
    status: 'active',
    balance: 5000.00,
    availableBalance: 5000.00,
    interestRate: 2.5,
    currency: 'USD',
    description: 'Primary Savings Account',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'account-2',
    accountNumber: 'BNA1234567891',
    type: 'checking',
    status: 'active',
    balance: 2500.00,
    availableBalance: 2500.00,
    interestRate: 0.5,
    currency: 'USD',
    description: 'Checking Account',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockTransactions = [
  {
    id: 'txn-1',
    transactionId: 'TXN1234567890',
    type: 'deposit',
    status: 'completed',
    amount: 1000.00,
    fee: 0.00,
    balanceAfter: 5000.00,
    description: 'Initial deposit',
    reference: 'DEP001',
    accountId: 'account-1',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'txn-2',
    transactionId: 'TXN1234567891',
    type: 'withdrawal',
    status: 'completed',
    amount: 500.00,
    fee: 2.50,
    balanceAfter: 4500.00,
    description: 'ATM withdrawal',
    reference: 'ATM001',
    accountId: 'account-1',
    createdAt: '2024-01-20T14:30:00Z',
  },
  {
    id: 'txn-3',
    transactionId: 'TXN1234567892',
    type: 'transfer',
    status: 'completed',
    amount: 200.00,
    fee: 1.00,
    balanceAfter: 2300.00,
    description: 'Transfer to savings',
    reference: 'TRF001',
    accountId: 'account-2',
    createdAt: '2024-01-25T09:15:00Z',
  },
];

export const clientService = {
  // Profile management
  async getProfile() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProfile), 100);
    });
  },

  async updateProfile(userData: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedProfile = { ...mockProfile, ...userData };
        resolve(updatedProfile);
      }, 100);
    });
  },

  // Account management
  async getAccounts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAccounts), 100);
    });
  },

  async getAccountById(accountId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const account = mockAccounts.find(acc => acc.id === accountId);
        resolve(account);
      }, 100);
    });
  },

  async createAccount(accountData: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAccount = {
          id: `account-${Date.now()}`,
          accountNumber: `BNA${Date.now()}`,
          ...accountData,
          status: 'active',
          balance: 0,
          availableBalance: 0,
          currency: 'USD',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockAccounts.push(newAccount);
        resolve(newAccount);
      }, 100);
    });
  },

  async getAccountSummary() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const summary = {
          totalAccounts: mockAccounts.length,
          totalBalance: mockAccounts.reduce((sum, acc) => sum + acc.balance, 0),
          totalAvailableBalance: mockAccounts.reduce((sum, acc) => sum + acc.availableBalance, 0),
          accounts: mockAccounts,
        };
        resolve(summary);
      }, 100);
    });
  },

  // Transaction management
  async getTransactions(filters?: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let transactions = mockTransactions;
        if (filters?.accountId) {
          transactions = transactions.filter(t => t.accountId === filters.accountId);
        }
        if (filters?.type) {
          transactions = transactions.filter(t => t.type === filters.type);
        }
        resolve(transactions);
      }, 100);
    });
  },

  async getTransactionById(transactionId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transaction = mockTransactions.find(t => t.id === transactionId);
        resolve(transaction);
      }, 100);
    });
  },

  async createTransaction(transactionData: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTransaction = {
          id: `txn-${Date.now()}`,
          transactionId: `TXN${Date.now()}`,
          ...transactionData,
          status: 'completed',
          createdAt: new Date().toISOString(),
        };
        mockTransactions.unshift(newTransaction);
        resolve(newTransaction);
      }, 100);
    });
  },

  async getTransactionSummary(accountId?: string, period?: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let transactions = mockTransactions;
        if (accountId) {
          transactions = transactions.filter(t => t.accountId === accountId);
        }
        
        const summary = {
          totalTransactions: transactions.length,
          totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
          totalFees: transactions.reduce((sum, t) => sum + (t.fee || 0), 0),
          deposits: transactions.filter(t => t.type === 'deposit').length,
          withdrawals: transactions.filter(t => t.type === 'withdrawal').length,
          transfers: transactions.filter(t => t.type === 'transfer').length,
          completed: transactions.filter(t => t.status === 'completed').length,
          pending: transactions.filter(t => t.status === 'pending').length,
          failed: transactions.filter(t => t.status === 'failed').length,
        };
        resolve(summary);
      }, 100);
    });
  },
};