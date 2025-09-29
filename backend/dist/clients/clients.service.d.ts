import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DummyDataService } from '../services/dummy-data.service';
export declare class ClientsService {
    private dummyDataService;
    constructor(dummyDataService: DummyDataService);
    getProfile(userId: string): Promise<User>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    getAccounts(userId: string): Promise<Account[]>;
    getAccountById(userId: string, accountId: string): Promise<Account>;
    createAccount(userId: string, accountData: Partial<Account>): Promise<Account>;
    getAccountSummary(userId: string): Promise<{
        totalAccounts: number;
        totalBalance: number;
        totalAvailableBalance: number;
        accounts: {
            id: string;
            accountNumber: string;
            type: import("../entities/account.entity").AccountType;
            balance: number;
            availableBalance: number;
            status: import("../entities/account.entity").AccountStatus;
            currency: string;
        }[];
    }>;
}
