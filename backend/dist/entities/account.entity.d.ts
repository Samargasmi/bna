import { User } from './user.entity';
import { Transaction } from './transaction.entity';
export declare enum AccountType {
    SAVINGS = "savings",
    CHECKING = "checking",
    BUSINESS = "business",
    INVESTMENT = "investment"
}
export declare enum AccountStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    FROZEN = "frozen",
    CLOSED = "closed"
}
export declare class Account {
    id: string;
    accountNumber: string;
    type: AccountType;
    status: AccountStatus;
    balance: number;
    availableBalance: number;
    interestRate: number;
    currency: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: User;
    transactions: Transaction[];
    generateAccountNumber(): string;
    canWithdraw(amount: number): boolean;
    canDeposit(): boolean;
}
