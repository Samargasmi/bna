import { UserStatus } from '../../entities/user.entity';
export declare class UserFilterDto {
    status?: UserStatus;
    search?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
}
