import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { User } from '../entities/user.entity';
export declare class AccountsService {
    private accountRepository;
    private userRepository;
    constructor(accountRepository: Repository<Account>, userRepository: Repository<User>);
    createAccount(userId: string, accountData: Partial<Account>): Promise<Account>;
    getAccountById(accountId: string, userId?: string): Promise<Account>;
    updateAccountBalance(accountId: string, amount: number, type: 'deposit' | 'withdrawal'): Promise<Account>;
    freezeAccount(accountId: string): Promise<Account>;
    unfreezeAccount(accountId: string): Promise<Account>;
    closeAccount(accountId: string): Promise<Account>;
    private generateAccountNumber;
}
