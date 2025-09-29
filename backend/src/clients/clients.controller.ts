import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserRole } from '../entities/user.entity';
import { ClientsService } from './clients.service';
import { AccountsService } from './accounts.service';
import { TransactionsService } from './transactions.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionFilterDto } from './dto/transaction-filter.dto';

@Controller('clients')
@UseGuards(AuthGuard('jwt'))
export class ClientsController {
  constructor(
    private clientsService: ClientsService,
    private accountsService: AccountsService,
    private transactionsService: TransactionsService,
  ) {}

  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return this.clientsService.getProfile(user.id);
  }

  @Put('profile')
  updateProfile(
    @CurrentUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.clientsService.updateProfile(user.id, updateProfileDto);
  }

  @Get('accounts')
  getAccounts(@CurrentUser() user: User) {
    return this.clientsService.getAccounts(user.id);
  }

  @Get('accounts/summary')
  getAccountSummary(@CurrentUser() user: User) {
    return this.clientsService.getAccountSummary(user.id);
  }

  @Get('accounts/:id')
  getAccountById(@CurrentUser() user: User, @Param('id') accountId: string) {
    return this.clientsService.getAccountById(user.id, accountId);
  }

  @Post('accounts')
  createAccount(@CurrentUser() user: User, @Body() accountData: any) {
    return this.clientsService.createAccount(user.id, accountData);
  }

  @Get('transactions')
  getTransactions(
    @CurrentUser() user: User,
    @Query() filters: TransactionFilterDto,
  ) {
    return this.transactionsService.getTransactions(user.id, filters.accountId, filters);
  }

  @Get('transactions/summary')
  getTransactionSummary(
    @CurrentUser() user: User,
    @Query('accountId') accountId?: string,
    @Query('period') period?: string,
  ) {
    return this.transactionsService.getTransactionSummary(user.id, accountId, period);
  }

  @Get('transactions/:id')
  getTransactionById(@CurrentUser() user: User, @Param('id') transactionId: string) {
    return this.transactionsService.getTransactionById(transactionId, user.id);
  }

  @Post('transactions')
  createTransaction(
    @CurrentUser() user: User,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.createTransaction(user.id, createTransactionDto);
  }
}
