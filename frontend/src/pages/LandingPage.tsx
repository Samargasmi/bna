import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Paper,
  useTheme,
} from '@mui/material';
import {
  AccountBalance,
  Security,
  Speed,
  Support,
  TrendingUp,
  CreditCard,
  Savings,
  Business,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
  Star,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Security fontSize="large" />,
      title: 'Secure Banking',
      description: 'Advanced encryption and security protocols to protect your financial data.',
    },
    {
      icon: <Speed fontSize="large" />,
      title: 'Fast Transactions',
      description: 'Lightning-fast transfers and payments with our optimized banking infrastructure.',
    },
    {
      icon: <Support fontSize="large" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help.',
    },
    {
      icon: <TrendingUp fontSize="large" />,
      title: 'Investment Options',
      description: 'Diverse investment opportunities with expert financial advice and guidance.',
    },
    {
      icon: <CreditCard fontSize="large" />,
      title: 'Digital Cards',
      description: 'Virtual and physical cards with advanced fraud protection and instant notifications.',
    },
    {
      icon: <Savings fontSize="large" />,
      title: 'High-Yield Savings',
      description: 'Competitive interest rates on savings accounts to grow your wealth.',
    },
  ];

  const stats = [
    { number: '2.5M+', label: 'Active Customers' },
    { number: '$50B+', label: 'Assets Under Management' },
    { number: '150+', label: 'Countries Served' },
    { number: '99.9%', label: 'Uptime Guarantee' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'BNA Bank has transformed how I manage my business finances. The digital platform is intuitive and secure.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Investor',
      content: 'Excellent investment opportunities and personalized financial advice. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Freelancer',
      content: 'The mobile app makes banking so convenient. I can manage everything on the go.',
      rating: 5,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            animation: 'float 20s ease-in-out infinite',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  background: 'linear-gradient(45deg, #ffffff 30%, #E2E8F0 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'fadeInUp 1s ease-out',
                  '@keyframes fadeInUp': {
                    '0%': {
                      opacity: 0,
                      transform: 'translateY(30px)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                Welcome to{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    background: 'linear-gradient(45deg, #68D391 30%, #38A169 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900,
                  }}
                >
                  BNA Bank
                </Box>
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  opacity: 0.9,
                  fontWeight: 400,
                }}
              >
                Your trusted partner for secure, innovative banking solutions
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  opacity: 0.8,
                  fontSize: '1.1rem',
                }}
              >
                Experience the future of banking with our cutting-edge digital platform,
                personalized financial services, and unwavering commitment to your success.
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(255,255,255,0.3)',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[50],
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 40px rgba(255,255,255,0.4)',
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { boxShadow: '0 8px 32px rgba(255,255,255,0.3)' },
                      '50%': { boxShadow: '0 8px 32px rgba(255,255,255,0.5)' },
                      '100%': { boxShadow: '0 8px 32px rgba(255,255,255,0.3)' },
                    },
                  }}
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    borderWidth: '2px',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      borderColor: 'white',
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 25px rgba(255,255,255,0.2)',
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                  position: 'relative',
                }}
              >
                {/* Main Bank Icon */}
                <AccountBalance
                  sx={{
                    fontSize: '20rem',
                    opacity: 0.2,
                    color: 'white',
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                      '50%': { transform: 'translateY(-20px) rotate(5deg)' },
                    },
                  }}
                />
                
                {/* Floating Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    animation: 'float 4s ease-in-out infinite',
                    animationDelay: '1s',
                  }}
                >
                  <TrendingUp
                    sx={{
                      fontSize: '3rem',
                      color: theme.palette.success.light,
                      opacity: 0.8,
                    }}
                  />
                </Box>
                
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '30%',
                    left: '15%',
                    animation: 'float 5s ease-in-out infinite',
                    animationDelay: '2s',
                  }}
                >
                  <Security
                    sx={{
                      fontSize: '2.5rem',
                      color: theme.palette.info.light,
                      opacity: 0.8,
                    }}
                  />
                </Box>
                
                <Box
                  sx={{
                    position: 'absolute',
                    top: '60%',
                    right: '20%',
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: '0.5s',
                  }}
                >
                  <Speed
                    sx={{
                      fontSize: '2rem',
                      color: theme.palette.warning.light,
                      opacity: 0.8,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                  border: `1px solid ${theme.palette.primary.light}20`,
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Why Choose BNA Bank?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              We combine cutting-edge technology with personalized service to deliver
              exceptional banking experiences.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            Join thousands of satisfied customers who trust BNA Bank
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          color: theme.palette.warning.main,
                          fontSize: '1.2rem',
                        }}
                      />
                    ))}
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
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
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Join BNA Bank today and experience the future of banking with our
              innovative digital platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  backgroundColor: theme.palette.grey[100],
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
              endIcon={<ArrowForward />}
              onClick={() => navigate('/dashboard')}
            >
              Open Your Account
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: theme.palette.grey[900],
          color: 'white',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance
                  sx={{
                    fontSize: '2rem',
                    color: theme.palette.primary.light,
                    mr: 1,
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  BNA Bank
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  mb: 3,
                }}
              >
                Your trusted partner for secure, innovative banking solutions.
                Building a better financial future together.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ fontSize: '1rem', mr: 1, opacity: 0.8 }} />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ fontSize: '1rem', mr: 1, opacity: 0.8 }} />
                <Typography variant="body2">info@bnabank.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ fontSize: '1rem', mr: 1, opacity: 0.8 }} />
                <Typography variant="body2">123 Financial District, NY 10004</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  color="inherit"
                  onClick={() => navigate('/dashboard')}
                  sx={{ justifyContent: 'flex-start', p: 0 }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/services')}
                  sx={{ justifyContent: 'flex-start', p: 0 }}
                >
                  Services
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/about')}
                  sx={{ justifyContent: 'flex-start', p: 0 }}
                >
                  About Us
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/contact')}
                  sx={{ justifyContent: 'flex-start', p: 0 }}
                >
                  Contact
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              mt: 4,
              pt: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              © 2024 BNA Bank. All rights reserved. | Licensed and regulated by the Central Bank.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
