import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  AccountBalance,
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  History,
  Add,
  ArrowUpward,
  ArrowDownward,
  Security,
  Speed,
  Star,
  AttachMoney,
  CreditCard,
  Savings,
  Business,
  Phone,
  Email,
  Notifications,
  Settings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { clientService } from '../services/clientService.ts';

interface Account {
  id: string;
  accountNumber: string;
  type: string;
  balance: number;
  availableBalance: number;
  status: string;
  currency: string;
  interestRate?: number;
  description?: string;
}

interface TransactionSummary {
  totalTransactions: number;
  totalAmount: number;
  totalFees: number;
  deposits: number;
  withdrawals: number;
  transfers: number;
  payments: number;
}

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [accountsData, summaryData] = await Promise.all([
        clientService.getAccounts(),
        clientService.getAccountSummary(),
      ]);
      setAccounts(accountsData);
      setSummary(summaryData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAccountIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'savings':
        return <Savings />;
      case 'checking':
        return <CreditCard />;
      case 'business':
        return <Business />;
      default:
        return <AccountBalanceWallet />;
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'savings':
        return theme.palette.success.main;
      case 'checking':
        return theme.palette.primary.main;
      case 'business':
        return theme.palette.secondary.main;
      default:
        return theme.palette.grey[600];
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Welcome Header */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.primary.main,
                  mb: 1,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome back, {user?.firstName}! 👋
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 400,
                }}
              >
                Here's your financial overview for today
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label="Live"
                color="success"
                sx={{
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.7 },
                    '100%': { opacity: 1 },
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Quick Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z"/%3E%3C/g%3E%3C/svg%3E")',
                  animation: 'float 15s linear infinite',
                },
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 60px rgba(26, 54, 93, 0.4)',
                },
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {summary ? formatCurrency(summary.totalBalance) : '$0.00'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Total Balance
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      width: 60,
                      height: 60,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      animation: 'pulse 3s infinite',
                    }}
                  >
                    <AttachMoney sx={{ fontSize: '2rem' }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm0 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z"/%3E%3C/g%3E%3C/svg%3E")',
                  animation: 'float 15s linear infinite',
                },
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 20px 60px rgba(56, 161, 105, 0.4)',
                },
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {summary ? summary.totalAccounts : 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Active Accounts
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      width: 60,
                      height: 60,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      animation: 'pulse 3s infinite',
                      animationDelay: '0.5s',
                    }}
                  >
                    <AccountBalanceWallet sx={{ fontSize: '2rem' }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {summary ? formatCurrency(summary.totalAvailableBalance) : '$0.00'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Available Balance
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      width: 60,
                      height: 60,
                    }}
                  >
                    <TrendingUp sx={{ fontSize: '2rem' }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.warning.main} 0%, ${theme.palette.warning.dark} 100%)`,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {summary ? formatCurrency(summary.totalBalance * 0.02) : '$0.00'}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Monthly Interest
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      width: 60,
                      height: 60,
                    }}
                  >
                    <Star sx={{ fontSize: '2rem' }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Accounts Section */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Your Accounts
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      Open New Account
                    </Button>
                  </Box>
                </Box>
                
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {accounts.map((account) => (
                      <Grid item xs={12} sm={6} key={account.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            border: `2px solid ${getAccountTypeColor(account.type)}20`,
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: `0 8px 25px ${getAccountTypeColor(account.type)}30`,
                              borderColor: getAccountTypeColor(account.type),
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar
                              sx={{
                                backgroundColor: getAccountTypeColor(account.type),
                                mr: 2,
                                width: 48,
                                height: 48,
                              }}
                            >
                              {getAccountIcon(account.type)}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {account.type.charAt(0).toUpperCase() + account.type.slice(1)} Account
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {account.accountNumber}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                              {formatCurrency(account.balance)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Available: {formatCurrency(account.availableBalance)}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                              label={account.status}
                              size="small"
                              sx={{
                                backgroundColor: theme.palette.success.light,
                                color: 'white',
                                fontWeight: 600,
                              }}
                            />
                            {account.interestRate && (
                              <Typography variant="body2" color="text.secondary">
                                {account.interestRate}% APR
                              </Typography>
                            )}
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions & Recent Activity */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Quick Actions */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Quick Actions
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<ArrowUpward />}
                          sx={{
                            py: 2,
                            borderColor: theme.palette.success.main,
                            color: theme.palette.success.main,
                            '&:hover': {
                              backgroundColor: theme.palette.success.light + '10',
                              borderColor: theme.palette.success.dark,
                            },
                          }}
                        >
                          Transfer
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<ArrowDownward />}
                          sx={{
                            py: 2,
                            borderColor: theme.palette.warning.main,
                            color: theme.palette.warning.main,
                            '&:hover': {
                              backgroundColor: theme.palette.warning.light + '10',
                              borderColor: theme.palette.warning.dark,
                            },
                          }}
                        >
                          Pay Bills
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<Add />}
                          sx={{
                            py: 2,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: theme.palette.primary.light + '10',
                              borderColor: theme.palette.primary.dark,
                            },
                          }}
                        >
                          Deposit
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<History />}
                          sx={{
                            py: 2,
                            borderColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.main,
                            '&:hover': {
                              backgroundColor: theme.palette.secondary.light + '10',
                              borderColor: theme.palette.secondary.dark,
                            },
                          }}
                        >
                          History
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Security Status */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Security Status
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Security sx={{ color: theme.palette.success.main, mr: 1 }} />
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          Account Security
                        </Typography>
                        <Chip label="Protected" size="small" color="success" />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.success.main,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Speed sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                          Transaction Speed
                        </Typography>
                        <Chip label="Fast" size="small" color="primary" />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={95}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: theme.palette.grey[200],
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.primary.main,
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ClientDashboard;