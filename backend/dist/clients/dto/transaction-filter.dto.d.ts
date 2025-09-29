import { TransactionType, TransactionStatus } from '../../entities/transaction.entity';
export declare class TransactionFilterDto {
    accountId?: string;
    type?: TransactionType;
    status?: TransactionStatus;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    limit?: number;
}
