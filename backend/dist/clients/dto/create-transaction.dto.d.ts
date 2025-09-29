import { TransactionType } from '../../entities/transaction.entity';
export declare class CreateTransactionDto {
    accountId: string;
    type: TransactionType;
    amount: number;
    fee?: number;
    description?: string;
    reference?: string;
    merchantName?: string;
    category?: string;
    location?: string;
    metadata?: Record<string, any>;
}
