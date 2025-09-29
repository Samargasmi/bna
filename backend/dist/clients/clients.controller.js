"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const user_entity_1 = require("../entities/user.entity");
const clients_service_1 = require("./clients.service");
const accounts_service_1 = require("./accounts.service");
const transactions_service_1 = require("./transactions.service");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const transaction_filter_dto_1 = require("./dto/transaction-filter.dto");
let ClientsController = class ClientsController {
    constructor(clientsService, accountsService, transactionsService) {
        this.clientsService = clientsService;
        this.accountsService = accountsService;
        this.transactionsService = transactionsService;
    }
    getProfile(user) {
        return this.clientsService.getProfile(user.id);
    }
    updateProfile(user, updateProfileDto) {
        return this.clientsService.updateProfile(user.id, updateProfileDto);
    }
    getAccounts(user) {
        return this.clientsService.getAccounts(user.id);
    }
    getAccountSummary(user) {
        return this.clientsService.getAccountSummary(user.id);
    }
    getAccountById(user, accountId) {
        return this.clientsService.getAccountById(user.id, accountId);
    }
    createAccount(user, accountData) {
        return this.clientsService.createAccount(user.id, accountData);
    }
    getTransactions(user, filters) {
        return this.transactionsService.getTransactions(user.id, filters.accountId, filters);
    }
    getTransactionSummary(user, accountId, period) {
        return this.transactionsService.getTransactionSummary(user.id, accountId, period);
    }
    getTransactionById(user, transactionId) {
        return this.transactionsService.getTransactionById(transactionId, user.id);
    }
    createTransaction(user, createTransactionDto) {
        return this.transactionsService.createTransaction(user.id, createTransactionDto);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('accounts'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getAccounts", null);
__decorate([
    (0, common_1.Get)('accounts/summary'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getAccountSummary", null);
__decorate([
    (0, common_1.Get)('accounts/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getAccountById", null);
__decorate([
    (0, common_1.Post)('accounts'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)('transactions'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        transaction_filter_dto_1.TransactionFilterDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Get)('transactions/summary'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('accountId')),
    __param(2, (0, common_1.Query)('period')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String, String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getTransactionSummary", null);
__decorate([
    (0, common_1.Get)('transactions/:id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getTransactionById", null);
__decorate([
    (0, common_1.Post)('transactions'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "createTransaction", null);
exports.ClientsController = ClientsController = __decorate([
    (0, common_1.Controller)('clients'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [clients_service_1.ClientsService,
        accounts_service_1.AccountsService,
        transactions_service_1.TransactionsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map