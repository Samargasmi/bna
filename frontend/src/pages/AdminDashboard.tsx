import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import {
  People,
  AccountBalance,
  TrendingUp,
  AttachMoney,
  PersonAdd,
  Assessment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService.ts';

interface DashboardStats {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
    growthRate: number;
  };
  accounts: {
    total: number;
    active: number;
    totalBalance: number;
  };
  transactions: {
    total: number;
    thisMonth: number;
    totalVolume: number;
    monthlyVolume: number;
  };
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Quick Actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => navigate('/admin/users/create')}
          >
            Add New User
          </Button>
          <Button
            variant="outlined"
            startIcon={<Assessment />}
            onClick={() => navigate('/admin/analytics')}
          >
            View Analytics
          </Button>
          <Button
            variant="outlined"
            startIcon={<People />}
            onClick={() => navigate('/admin/users')}
          >
            Manage Users
          </Button>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {/* Users Stats */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <People color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h5">
                    {stats?.users.total || 0}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +{stats?.users.newThisMonth || 0} this month
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
                <AccountBalance color="success" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Active Accounts
                  </Typography>
                  <Typography variant="h5">
                    {stats?.accounts.active || 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    of {stats?.accounts.total || 0} total
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
                    {stats ? formatCurrency(stats.accounts.totalBalance) : '$0'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Across all accounts
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
                <TrendingUp color="info" sx={{ mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Transactions
                  </Typography>
                  <Typography variant="h5">
                    {stats?.transactions.thisMonth || 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    this month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Stats */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              User Growth
            </Typography>
            <Typography variant="h3" color="primary">
              {stats?.users.growthRate?.toFixed(1) || 0}%
            </Typography>
            <Typography color="textSecondary">
              Growth rate this month
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Transaction Volume
            </Typography>
            <Typography variant="h3" color="success.main">
              {stats ? formatCurrency(stats.transactions.monthlyVolume) : '$0'}
            </Typography>
            <Typography color="textSecondary">
              This month's volume
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          System Overview
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Total Transactions</Typography>
            <Typography variant="h5">{stats?.transactions.total || 0}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography color="textSecondary">Total Transaction Volume</Typography>
            <Typography variant="h5">
              {stats ? formatCurrency(stats.transactions.totalVolume) : '$0'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
