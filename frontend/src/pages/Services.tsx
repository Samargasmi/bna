import React from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  AccountBalance,
  CreditCard,
  Savings,
  Business,
  TrendingUp,
  Security,
  Speed,
  Support,
  Phone,
  Email,
  LocationOn,
  CheckCircle,
  Star,
  AttachMoney,
  AccountBalanceWallet,
  Payment,
  Receipt,
  School,
  Home,
  CarRental,
  Flight,
} from '@mui/icons-material';

const Services: React.FC = () => {
  const theme = useTheme();

  const services = [
    {
      category: 'Personal Banking',
      icon: <AccountBalance />,
      color: theme.palette.primary.main,
      items: [
        {
          title: 'Checking Accounts',
          description: 'Basic and premium checking accounts with no monthly fees',
          features: ['Free online banking', 'Mobile app access', 'Debit card included'],
          price: 'Free',
        },
        {
          title: 'Savings Accounts',
          description: 'High-yield savings accounts to grow your money',
          features: ['Competitive interest rates', 'No minimum balance', 'Automatic transfers'],
          price: '2.5% APY',
        },
        {
          title: 'Credit Cards',
          description: 'Rewards and cashback credit cards for every lifestyle',
          features: ['Cashback rewards', 'No annual fee', 'Travel insurance'],
          price: 'From 0% APR',
        },
      ],
    },
    {
      category: 'Business Banking',
      icon: <Business />,
      color: theme.palette.secondary.main,
      items: [
        {
          title: 'Business Checking',
          description: 'Comprehensive business banking solutions',
          features: ['Unlimited transactions', 'Business debit card', 'Online invoicing'],
          price: '$15/month',
        },
        {
          title: 'Merchant Services',
          description: 'Accept payments anywhere with our POS solutions',
          features: ['Mobile payments', 'Online payments', '24/7 support'],
          price: '2.9% + $0.30',
        },
        {
          title: 'Business Loans',
          description: 'Flexible financing options for your business growth',
          features: ['Quick approval', 'Competitive rates', 'Flexible terms'],
          price: 'From 4.5% APR',
        },
      ],
    },
    {
      category: 'Investment Services',
      icon: <TrendingUp />,
      color: theme.palette.success.main,
      items: [
        {
          title: 'Investment Accounts',
          description: 'Professional investment management and advisory services',
          features: ['Portfolio management', 'Financial planning', 'Tax optimization'],
          price: '1.2% annually',
        },
        {
          title: 'Retirement Planning',
          description: 'Secure your future with our retirement solutions',
          features: ['401(k) plans', 'IRA accounts', 'Pension management'],
          price: '0.5% annually',
        },
        {
          title: 'Wealth Management',
          description: 'Comprehensive wealth management for high-net-worth individuals',
          features: ['Personal advisor', 'Estate planning', 'Tax services'],
          price: 'Custom pricing',
        },
      ],
    },
    {
      category: 'Digital Services',
      icon: <Speed />,
      color: theme.palette.warning.main,
      items: [
        {
          title: 'Mobile Banking',
          description: 'Bank on the go with our award-winning mobile app',
          features: ['Mobile deposits', 'Bill pay', 'Account alerts'],
          price: 'Free',
        },
        {
          title: 'Online Banking',
          description: 'Complete banking services from your computer',
          features: ['Account management', 'Transfers', 'Statements'],
          price: 'Free',
        },
        {
          title: 'Digital Wallet',
          description: 'Pay with your phone using our secure digital wallet',
          features: ['Contactless payments', 'Loyalty programs', 'Transaction history'],
          price: 'Free',
        },
      ],
    },
  ];

  const loanProducts = [
    {
      title: 'Personal Loans',
      icon: <AttachMoney />,
      description: 'Flexible personal loans for any purpose',
      rate: 'From 5.99% APR',
      amount: 'Up to $50,000',
    },
    {
      title: 'Home Loans',
      icon: <Home />,
      description: 'Mortgage solutions for homebuyers and refinancers',
      rate: 'From 3.25% APR',
      amount: 'Up to $2,000,000',
    },
    {
      title: 'Auto Loans',
      icon: <CarRental />,
      description: 'Competitive auto financing for new and used vehicles',
      rate: 'From 2.99% APR',
      amount: 'Up to $100,000',
    },
    {
      title: 'Student Loans',
      icon: <School />,
      description: 'Education financing to help you achieve your goals',
      rate: 'From 3.50% APR',
      amount: 'Up to $150,000',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Discover our comprehensive range of banking and financial services designed to meet all your needs
          </Typography>
        </Box>

        {/* Services by Category */}
        {services.map((service, index) => (
          <Box key={index} sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  backgroundColor: service.color,
                  width: 60,
                  height: 60,
                  mr: 3,
                }}
              >
                {service.icon}
              </Avatar>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                }}
              >
                {service.category}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {service.items.map((item, itemIndex) => (
                <Grid item xs={12} md={4} key={itemIndex}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 40px ${service.color}30`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: service.color,
                        }}
                      >
                        {item.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 3,
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {item.description}
                      </Typography>

                      <List dense>
                        {item.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle
                                sx={{
                                  color: theme.palette.success.main,
                                  fontSize: '1.2rem',
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                variant: 'body2',
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Chip
                          label={item.price}
                          sx={{
                            backgroundColor: service.color,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '1rem',
                            px: 2,
                            py: 1,
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* Loan Products */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Loan Products
          </Typography>

          <Grid container spacing={3}>
            {loanProducts.map((loan, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      {loan.icon}
                    </Avatar>
                    
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {loan.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {loan.description}
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                          mb: 1,
                        }}
                      >
                        {loan.rate}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {loan.amount}
                      </Typography>
                    </Box>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Card
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
          }}
        >
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                opacity: 0.9,
              }}
            >
              Contact our banking specialists to find the perfect solution for your needs
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 2 }} />
                  <Typography variant="h6">Call Us</Typography>
                </Box>
                <Typography variant="body1">+1 (555) 123-4567</Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Email sx={{ mr: 2 }} />
                  <Typography variant="h6">Email Us</Typography>
                </Box>
                <Typography variant="body1">services@bnabank.com</Typography>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 2 }} />
                  <Typography variant="h6">Visit Us</Typography>
                </Box>
                <Typography variant="body1">123 Financial District, NY</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Services;
