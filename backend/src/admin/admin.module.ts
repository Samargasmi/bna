import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AnalyticsService } from './analytics.service';
import { DummyDataService } from '../services/dummy-data.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AnalyticsService, DummyDataService],
  exports: [AdminService, AnalyticsService],
})
export class AdminModule {}
