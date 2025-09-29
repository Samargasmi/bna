import { Account } from './account.entity';
import { Transaction } from './transaction.entity';
export declare enum UserRole {
    CLIENT = "client",
    ADMIN = "admin"
}
export declare enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: Date;
    role: UserRole;
    status: UserStatus;
    password: string;
    nationalId: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    accounts: Account[];
    transactions: Transaction[];
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    get fullName(): string;
}
