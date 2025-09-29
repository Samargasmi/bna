import { UserStatus } from '../../entities/user.entity';
export declare class UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    nationalId?: string;
    status?: UserStatus;
}
