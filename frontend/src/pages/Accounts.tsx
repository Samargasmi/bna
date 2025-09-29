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
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  Snackbar,
  Avatar,
} from '@mui/material';
import {
  AccountBalance,
  AccountBalanceWallet,
  Add,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Savings,
  Business,
  AttachMoney,
  History,
  MoreVert,
  Star,
  PieChart,
  BarChart,
  ShowChart,
} from '@mui/icons-material';
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

interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'mutual_funds' | 'etf' | 'crypto' | 'real_estate';
  amount: number;
  value: number;
  return: number;
  returnPercentage: number;
  color: string;
}

interface MoneyAllocation {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

const Accounts: React.FC = () => {
  const theme = useTheme();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newAccount, setNewAccount] = useState({
    type: 'savings',
    description: '',
  });

  // Mock investment data
  const investments: Investment[] = [
    {
      id: '1',
      name: 'Apple Inc.',
      type: 'stocks',
      amount: 10000,
      value: 12500,
      return: 2500,
      returnPercentage: 25,
      color: theme.palette.success.main,
    },
    {
      id: '2',
      name: 'S&P 500 ETF',
      type: 'etf',
      amount: 15000,
      value: 16200,
      return: 1200,
      returnPercentage: 8,
      color: theme.palette.primary.main,
    },
    {
      id: '3',
      name: 'Government Bonds',
      type: 'bonds',
      amount: 20000,
      value: 20400,
      return: 400,
      returnPercentage: 2,
      color: theme.palette.info.main,
    },
    {
      id: '4',
      name: 'Bitcoin',
      type: 'crypto',
      amount: 5000,
      value: 7500,
      return: 2500,
      returnPercentage: 50,
      color: theme.palette.warning.main,
    },
  ];

  // Mock money allocation data
  const moneyAllocation: MoneyAllocation[] = [
    { category: 'Savings Accounts', amount: 45000, percentage: 35, color: theme.palette.success.main },
    { category: 'Investment Portfolio', amount: 56600, percentage: 44, color: theme.palette.primary.main },
    { category: 'Checking Accounts', amount: 15000, percentage: 12, color: theme.palette.info.main },
    { category: 'Emergency Fund', amount: 12000, percentage: 9, color: theme.palette.warning.main },
  ];

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const accountsData = await clientService.getAccounts();
      setAccounts(accountsData as Account[]);
    } catch (error) {
      console.error('Failed to load accounts:', error);
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

  const handleCreateAccount = async () => {
    try {
      await clientService.createAccount(newAccount);
      setOpenDialog(false);
      setSuccess(true);
      loadAccounts();
      setNewAccount({ type: 'savings', description: '' });
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <Typography variant="h6">Loading accounts...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            My Accounts
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 400,
            }}
          >
            Manage your bank accounts and view balances
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {formatCurrency(accounts.reduce((sum, acc) => sum + acc.balance, 0))}
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
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {accounts.length}
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
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {formatCurrency(accounts.reduce((sum, acc) => sum + acc.availableBalance, 0))}
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
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {formatCurrency(accounts.reduce((sum, acc) => sum + (acc.balance * (acc.interestRate || 0) / 100 / 12), 0))}
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

        {/* Accounts Grid */}
        <Card>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Your Accounts
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setOpenDialog(true)}
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
                  <Grid item xs={12} sm={6} lg={4} key={account.id}>
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
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<History />}
                          sx={{ flexGrow: 1 }}
                        >
                          History
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<MoreVert />}
                        >
                          More
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Investment Portfolio Section */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {/* Investment Performance Chart */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Investment Portfolio Performance
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip
                        icon={<ShowChart />}
                        label="Live"
                        color="success"
                        size="small"
                      />
                      <Chip
                        icon={<TrendingUp />}
                        label={`+${investments.reduce((sum, inv) => sum + inv.returnPercentage, 0) / investments.length}%`}
                        color="success"
                        size="small"
                      />
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {investments.map((investment) => (
                      <Grid item xs={12} sm={6} md={3} key={investment.id}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 3,
                            border: `2px solid ${investment.color}20`,
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: `0 8px 25px ${investment.color}30`,
                              borderColor: investment.color,
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar
                              sx={{
                                backgroundColor: investment.color,
                                mr: 2,
                                width: 40,
                                height: 40,
                              }}
                            >
                              <TrendingUp />
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {investment.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {investment.type.replace('_', ' ').toUpperCase()}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                              {formatCurrency(investment.value)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Invested: {formatCurrency(investment.amount)}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                              label={`${investment.returnPercentage > 0 ? '+' : ''}${investment.returnPercentage}%`}
                              size="small"
                              sx={{
                                backgroundColor: investment.returnPercentage > 0 ? theme.palette.success.light : theme.palette.error.light,
                                color: 'white',
                                fontWeight: 600,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {formatCurrency(investment.return)}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Money Allocation Chart */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Money Allocation
                </Typography>
                
                {/* Pie Chart Visualization */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ position: 'relative', width: '100%', height: 200, mb: 3 }}>
                    {/* Simple pie chart using CSS */}
                    <Box
                      sx={{
                        position: 'relative',
                        width: 180,
                        height: 180,
                        borderRadius: '50%',
                        background: `conic-gradient(
                          ${moneyAllocation[0].color} 0deg ${moneyAllocation[0].percentage * 3.6}deg,
                          ${moneyAllocation[1].color} ${moneyAllocation[0].percentage * 3.6}deg ${(moneyAllocation[0].percentage + moneyAllocation[1].percentage) * 3.6}deg,
                          ${moneyAllocation[2].color} ${(moneyAllocation[0].percentage + moneyAllocation[1].percentage) * 3.6}deg ${(moneyAllocation[0].percentage + moneyAllocation[1].percentage + moneyAllocation[2].percentage) * 3.6}deg,
                          ${moneyAllocation[3].color} ${(moneyAllocation[0].percentage + moneyAllocation[1].percentage + moneyAllocation[2].percentage) * 3.6}deg 360deg
                        )`,
                        mx: 'auto',
                        mb: 2,
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 80,
                        height: 80,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                        {formatCurrency(moneyAllocation.reduce((sum, item) => sum + item.amount, 0))}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Legend */}
                <Box>
                  {moneyAllocation.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          backgroundColor: item.color,
                          borderRadius: 1,
                          mr: 2,
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.category}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.percentage}% • {formatCurrency(item.amount)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Create Account Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Open New Account
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                select
                label="Account Type"
                value={newAccount.type}
                onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                sx={{ mb: 3 }}
              >
                <MenuItem value="savings">Savings Account</MenuItem>
                <MenuItem value="checking">Checking Account</MenuItem>
                <MenuItem value="business">Business Account</MenuItem>
              </TextField>
              
              <TextField
                fullWidth
                label="Description (Optional)"
                value={newAccount.description}
                onChange={(e) => setNewAccount({ ...newAccount, description: e.target.value })}
                multiline
                rows={3}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateAccount}
              sx={{
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Create Account
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Account created successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Accounts;
