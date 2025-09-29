// Mock data for admin service
const mockUsers = [
  {
    id: 'client-1',
    email: 'ahmed.hassan@email.com',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    phoneNumber: '+1234567891',
    address: '123 Main St, Casablanca, Morocco',
    dateOfBirth: '1990-01-15',
    nationalId: 'CLIENT001',
    role: 'client',
    status: 'active',
    isEmailVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'client-2',
    email: 'samar.ali@email.com',
    firstName: 'Samar',
    lastName: 'Ali',
    phoneNumber: '+1234567892',
    address: '456 Oak Ave, Rabat, Morocco',
    dateOfBirth: '1985-05-20',
    nationalId: 'CLIENT002',
    role: 'client',
    status: 'active',
    isEmailVerified: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

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
    userId: 'client-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    user: mockUsers[0],
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
    userId: 'client-1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    user: mockUsers[0],
  },
  {
    id: 'account-3',
    accountNumber: 'BNA1234567892',
    type: 'business',
    status: 'active',
    balance: 15000.00,
    availableBalance: 15000.00,
    interestRate: 1.5,
    currency: 'USD',
    description: 'Business Account',
    userId: 'client-2',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    user: mockUsers[1],
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
    userId: 'client-1',
    accountId: 'account-1',
    createdAt: '2024-01-15T10:00:00Z',
    user: mockUsers[0],
    account: mockAccounts[0],
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
    userId: 'client-1',
    accountId: 'account-1',
    createdAt: '2024-01-20T14:30:00Z',
    user: mockUsers[0],
    account: mockAccounts[0],
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
    userId: 'client-1',
    accountId: 'account-2',
    createdAt: '2024-01-25T09:15:00Z',
    user: mockUsers[0],
    account: mockAccounts[1],
  },
];

export const adminService = {
  // User management
  async getUsers(filters?: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let users = mockUsers;
        if (filters?.status) {
          users = users.filter(u => u.status === filters.status);
        }
        if (filters?.search) {
          const searchLower = filters.search.toLowerCase();
          users = users.filter(u => 
            u.firstName.toLowerCase().includes(searchLower) ||
            u.lastName.toLowerCase().includes(searchLower) ||
            u.email.toLowerCase().includes(searchLower)
          );
        }
        
        const result = {
          users: users,
          total: users.length,
          page: 1,
          limit: 50,
        };
        resolve(result);
      }, 100);
    });
  },

  async getUserById(userId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  async createUser(userData: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `user-${Date.now()}`,
          ...userData,
          role: 'client',
          status: 'active',
          isEmailVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockUsers.push(newUser);
        resolve(newUser);
      }, 100);
    });
  },

  async updateUser(userId: string, userData: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData, updatedAt: new Date().toISOString() };
          resolve(mockUsers[userIndex]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  async updateUserStatus(userId: string, status: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          mockUsers[userIndex].status = status;
          mockUsers[userIndex].updatedAt = new Date().toISOString();
          resolve(mockUsers[userIndex]);
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  async deleteUser(userId: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          mockUsers.splice(userIndex, 1);
          resolve({ message: 'User deleted successfully' });
        } else {
          resolve(null);
        }
      }, 100);
    });
  },

  // Account management
  async getAccounts(filters?: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let accounts = mockAccounts;
        if (filters?.status) {
          accounts = accounts.filter(a => a.status === filters.status);
        }
        if (filters?.type) {
          accounts = accounts.filter(a => a.type === filters.type);
        }
        
        const result = {
          accounts,
          total: accounts.length,
          page: 1,
          limit: 50,
        };
        resolve(result);
      }, 100);
    });
  },

  // Transaction management
  async getTransactions(filters?: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let transactions = mockTransactions;
        if (filters?.type) {
          transactions = transactions.filter(t => t.type === filters.type);
        }
        if (filters?.status) {
          transactions = transactions.filter(t => t.status === filters.status);
        }
        
        const result = {
          transactions,
          total: transactions.length,
          page: 1,
          limit: 50,
        };
        resolve(result);
      }, 100);
    });
  },

  // Analytics
  async getDashboardStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = {
          users: {
            total: mockUsers.length,
            active: mockUsers.filter(u => u.status === 'active').length,
            newThisMonth: 1,
            growthRate: 10.0,
          },
          accounts: {
            total: mockAccounts.length,
            active: mockAccounts.filter(a => a.status === 'active').length,
            totalBalance: mockAccounts.reduce((sum, a) => sum + a.balance, 0),
          },
          transactions: {
            total: mockTransactions.length,
            thisMonth: 2,
            totalVolume: mockTransactions.reduce((sum, t) => sum + t.amount, 0),
            monthlyVolume: 1700.00,
          },
        };
        resolve(stats);
      }, 100);
    });
  },

  async getAnalytics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalBalance = mockAccounts.reduce((sum, a) => sum + a.balance, 0);
        const monthlyVolume = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        const analytics = {
          overview: {
            totalUsers: mockUsers.length,
            activeUsers: mockUsers.filter(u => u.status === 'active').length,
            totalAccounts: mockAccounts.length,
            totalBalance: totalBalance,
            monthlyTransactions: mockTransactions.length,
            monthlyVolume: monthlyVolume,
          },
          userGrowth: {
            thisMonth: 1,
            lastMonth: 1,
            growthRate: 0.0,
          },
          transactionTrends: {
            daily: [
              { date: '2024-01-15', count: 1, volume: 1000.00 },
              { date: '2024-01-20', count: 1, volume: 500.00 },
              { date: '2024-01-25', count: 1, volume: 200.00 },
              { date: '2024-01-26', count: 0, volume: 0.00 },
              { date: '2024-01-27', count: 0, volume: 0.00 },
              { date: '2024-01-28', count: 0, volume: 0.00 },
              { date: '2024-01-29', count: 0, volume: 0.00 },
            ],
            weekly: [
              { week: 'Week 1', count: 1, volume: 1000.00 },
              { week: 'Week 2', count: 1, volume: 500.00 },
              { week: 'Week 3', count: 1, volume: 200.00 },
              { week: 'Week 4', count: 0, volume: 0.00 },
            ],
          },
          topUsers: mockUsers.map(user => {
            const userAccounts = mockAccounts.filter(a => a.userId === user.id);
            const userBalance = userAccounts.reduce((sum, a) => sum + a.balance, 0);
            const userTransactions = mockTransactions.filter(t => t.userId === user.id);
            
            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              totalBalance: userBalance,
              transactionCount: userTransactions.length,
            };
          }).sort((a, b) => b.totalBalance - a.totalBalance),
        };
        
        resolve(analytics);
      }, 100);
    });
  },

  async getAllUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 100);
    });
  },
};