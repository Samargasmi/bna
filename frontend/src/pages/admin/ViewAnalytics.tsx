import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  TrendingDown,
  People,
  AccountBalance,
  AttachMoney,
  Timeline,
} from '@mui/icons-material';
import { adminService } from '../../services/adminService.ts';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalAccounts: number;
    totalBalance: number;
    monthlyTransactions: number;
    monthlyVolume: number;
  };
  userGrowth: {
    thisMonth: number;
    lastMonth: number;
    growthRate: number;
  };
  transactionTrends: {
    daily: Array<{ date: string; count: number; volume: number }>;
    weekly: Array<{ week: string; count: number; volume: number }>;
  };
  topUsers: Array<{
    id: string;
    name: string;
    email: string;
    totalBalance: number;
    transactionCount: number;
  }>;
}

const ViewAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAnalytics();
      setAnalytics(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Assessment sx={{ mr: 2, fontSize: '2rem', color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Analytics Dashboard
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {analytics && (
          <>
            {/* Overview Cards */}
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={2}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <People color="primary" sx={{ mr: 2 }} />
                      <Box>
                        <Typography color="textSecondary" gutterBottom>
                          Total Users
                        </Typography>
                        <Typography variant="h5">
                          {analytics.overview.totalUsers}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <AccountBalance color="success" sx={{ mr: 2 }} />
                      <Box>
                        <Typography color="textSecondary" gutterBottom>
                          Active Users
                        </Typography>
                        <Typography variant="h5">
                          {analytics.overview.activeUsers}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <AccountBalance color="info" sx={{ mr: 2 }} />
                      <Box>
                        <Typography color="textSecondary" gutterBottom>
                          Total Accounts
                        </Typography>
                        <Typography variant="h5">
                          {analytics.overview.totalAccounts}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <AttachMoney color="warning" sx={{ mr: 2 }} />
                      <Box>
                        <Typography color="textSecondary" gutterBottom>
                          Total Balance
                        </Typography>
                        <Typography variant="h5">
                          {formatCurrency(analytics.overview.totalBalance)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center">
                      <Timeline color="secondary" sx={{ mr: 2 }} />
                      <Box>
                        <Typography color="textSecondary" gutterBottom>
                          Monthly Volume
                        </Typography>
                        <Typography variant="h5">
                          {formatCurrency(analytics.overview.monthlyVolume)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Growth Metrics */}
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    User Growth
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h3" color="primary" sx={{ mr: 2 }}>
                      {analytics.userGrowth.thisMonth}
                    </Typography>
                    <Box>
                      <Typography color="textSecondary">
                        New users this month
                      </Typography>
                      <Box display="flex" alignItems="center">
                        {analytics.userGrowth.growthRate >= 0 ? (
                          <TrendingUp color="success" sx={{ mr: 1 }} />
                        ) : (
                          <TrendingDown color="error" sx={{ mr: 1 }} />
                        )}
                        <Typography
                          color={analytics.userGrowth.growthRate >= 0 ? 'success.main' : 'error.main'}
                          variant="body2"
                        >
                          {formatPercentage(analytics.userGrowth.growthRate)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography color="textSecondary" variant="body2">
                    Last month: {analytics.userGrowth.lastMonth} users
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Transaction Activity
                  </Typography>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Typography variant="h3" color="success.main" sx={{ mr: 2 }}>
                      {analytics.overview.monthlyTransactions}
                    </Typography>
                    <Box>
                      <Typography color="textSecondary">
                        Transactions this month
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        Volume: {formatCurrency(analytics.overview.monthlyVolume)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Top Users Table */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Top Users by Balance
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Total Balance</TableCell>
                      <TableCell>Transactions</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analytics.topUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(user.totalBalance)}
                          </Typography>
                        </TableCell>
                        <TableCell>{user.transactionCount}</TableCell>
                        <TableCell>
                          <Chip
                            label="Active"
                            color="success"
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Transaction Trends */}
            <Grid container spacing={3} mt={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Weekly Transaction Trends
                  </Typography>
                  <Box>
                    {analytics.transactionTrends.weekly.slice(0, 4).map((week, index) => (
                      <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">{week.week}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {week.count} transactions
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Recent Daily Activity
                  </Typography>
                  <Box>
                    {analytics.transactionTrends.daily.slice(-7).map((day, index) => (
                      <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2">{day.date}</Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {day.count} transactions
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ViewAnalytics;
