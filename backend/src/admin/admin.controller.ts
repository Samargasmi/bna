import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole, UserStatus } from '../entities/user.entity';
import { AdminService } from './admin.service';
import { AnalyticsService } from './analytics.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFilterDto } from './dto/user-filter.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(
    private adminService: AdminService,
    private analyticsService: AnalyticsService,
  ) {}

  @Get('dashboard/stats')
  getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('analytics/transactions')
  getTransactionAnalytics(@Query('period') period?: string) {
    return this.analyticsService.getTransactionAnalytics(period);
  }

  @Get('analytics/users')
  getUserAnalytics() {
    return this.analyticsService.getUserAnalytics();
  }

  @Get('analytics/accounts')
  getAccountAnalytics() {
    return this.analyticsService.getAccountAnalytics();
  }

  @Get('users')
  getAllUsers(@Query() filters: UserFilterDto) {
    return this.adminService.getAllUsers(filters);
  }

  @Get('users/:id')
  getUserById(@Param('id') userId: string) {
    return this.adminService.getUserById(userId);
  }

  @Post('users')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.adminService.createUser(createUserDto);
  }

  @Put('users/:id')
  updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.adminService.updateUser(userId, updateUserDto);
  }

  @Put('users/:id/status')
  updateUserStatus(
    @Param('id') userId: string,
    @Body('status') status: UserStatus,
  ) {
    return this.adminService.updateUserStatus(userId, status);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') userId: string) {
    return this.adminService.deleteUser(userId);
  }

  @Get('accounts')
  getAllAccounts(@Query() filters: any) {
    return this.adminService.getAllAccounts(filters);
  }

  @Get('transactions')
  getAllTransactions(@Query() filters: any) {
    return this.adminService.getAllTransactions(filters);
  }
}
