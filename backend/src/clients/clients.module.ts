import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { AccountsService } from './accounts.service';
import { TransactionsService } from './transactions.service';
import { DummyDataService } from '../services/dummy-data.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, AccountsService, TransactionsService, DummyDataService],
  exports: [ClientsService, AccountsService, TransactionsService],
})
export class ClientsModule {}
