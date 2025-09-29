import { User } from './user.entity';
import { Account } from './account.entity';
export declare enum TransactionType {
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdrawal",
    TRANSFER = "transfer",
    PAYMENT = "payment",
    INTEREST = "interest",
    FEE = "fee",
    REFUND = "refund"
}
export declare enum TransactionStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled"
}
export declare class Transaction {
    id: string;
    transactionId: string;
    type: TransactionType;
    status: TransactionStatus;
    amount: number;
    fee: number;
    balanceAfter: number;
    description: string;
    reference: string;
    merchantName: string;
    category: string;
    location: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    accountId: string;
    user: User;
    account: Account;
    generateTransactionId(): string;
    get netAmount(): number;
}
