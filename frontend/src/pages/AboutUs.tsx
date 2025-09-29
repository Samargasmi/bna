import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AccountBalance,
  Security,
  Speed,
  Support,
  TrendingUp,
  People,
  Star,
  CheckCircle,
  Business,
  School,
  Home,
  AttachMoney,
} from '@mui/icons-material';

const AboutUs: React.FC = () => {
  const theme = useTheme();

  const values = [
    {
      title: 'Trust & Security',
      description: 'Your financial security is our top priority. We use advanced encryption and security protocols to protect your data.',
      icon: <Security />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Innovation',
      description: 'We continuously invest in cutting-edge technology to provide you with the best banking experience.',
      icon: <Speed />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Customer Focus',
      description: 'Every decision we make is centered around providing exceptional value and service to our customers.',
      icon: <People />,
      color: theme.palette.success.main,
    },
    {
      title: 'Growth',
      description: 'We help our customers achieve their financial goals through smart investment and savings solutions.',
      icon: <TrendingUp />,
      color: theme.palette.warning.main,
    },
  ];

  const milestones = [
    {
      year: '1985',
      title: 'Founded',
      description: 'BNA Bank was established with a vision to provide accessible banking services to everyone.',
    },
    {
      year: '1995',
      title: 'First Branch',
      description: 'Opened our first physical branch, expanding our reach to serve more communities.',
    },
    {
      year: '2005',
      title: 'Digital Banking',
      description: 'Launched our first online banking platform, revolutionizing how customers manage their finances.',
    },
    {
      year: '2015',
      title: 'Mobile App',
      description: 'Introduced our award-winning mobile banking app, bringing banking to customers\' fingertips.',
    },
    {
      year: '2020',
      title: 'AI Integration',
      description: 'Integrated artificial intelligence to provide personalized financial advice and fraud detection.',
    },
    {
      year: '2024',
      title: 'Future Ready',
      description: 'Continuing to innovate with blockchain technology and sustainable banking practices.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      position: 'Chief Executive Officer',
      experience: '25 years in banking',
      avatar: 'SJ',
    },
    {
      name: 'Michael Chen',
      position: 'Chief Technology Officer',
      experience: '20 years in fintech',
      avatar: 'MC',
    },
    {
      name: 'Emily Rodriguez',
      position: 'Chief Financial Officer',
      experience: '18 years in finance',
      avatar: 'ER',
    },
    {
      name: 'David Thompson',
      position: 'Chief Risk Officer',
      experience: '22 years in risk management',
      avatar: 'DT',
    },
  ];

  const achievements = [
    {
      title: 'Best Digital Bank 2023',
      description: 'Awarded by Financial Times for outstanding digital banking services',
      icon: <Star />,
    },
    {
      title: 'Customer Satisfaction Award',
      description: 'Highest customer satisfaction rating in the banking industry',
      icon: <People />,
    },
    {
      title: 'Security Excellence',
      description: 'Recognized for implementing the highest security standards',
      icon: <Security />,
    },
    {
      title: 'Innovation Leader',
      description: 'Leading the industry in financial technology innovation',
      icon: <TrendingUp />,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            About BNA Bank
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            For over 35 years, we've been committed to providing exceptional banking services and building lasting relationships with our customers.
          </Typography>
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccountBalance
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: '3rem',
                      mr: 2,
                    }}
                  />
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Our Mission
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                  To empower individuals and businesses with innovative financial solutions that help them achieve their goals and build a secure financial future.
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText primary="Provide accessible banking services to everyone" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText primary="Maintain the highest standards of security and trust" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText primary="Support community growth and development" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <TrendingUp
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: '3rem',
                      mr: 2,
                    }}
                  />
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Our Vision
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                  To be the most trusted and innovative financial partner, recognized globally for our commitment to customer success and technological excellence.
                </Typography>
                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText primary="Lead the industry in digital banking innovation" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText primary="Expand our services to serve more communities" />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText primary="Maintain sustainable and responsible banking practices" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Our Values */}
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
            Our Values
          </Typography>

          <Grid container spacing={3}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px ${value.color}30`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        backgroundColor: value.color,
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      {value.icon}
                    </Avatar>
                    
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {value.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Company Timeline */}
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
            Our Journey
          </Typography>

          <Grid container spacing={3}>
            {milestones.map((milestone, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -15,
                        left: 20,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    >
                      {milestone.year}
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {milestone.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {milestone.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Leadership Team */}
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
            Leadership Team
          </Typography>

          <Grid container spacing={3}>
            {team.map((member, index) => (
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
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 3,
                        fontSize: '2rem',
                        fontWeight: 600,
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      {member.name}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        mb: 2,
                      }}
                    >
                      {member.position}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {member.experience}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Achievements */}
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
            Awards & Recognition
          </Typography>

          <Grid container spacing={3}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${theme.palette.warning.main}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      sx={{
                        backgroundColor: theme.palette.warning.main,
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      {achievement.icon}
                    </Avatar>
                    
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {achievement.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                      }}
                    >
                      {achievement.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Card
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            textAlign: 'center',
          }}
        >
          <CardContent sx={{ p: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Join the BNA Bank Family
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
              Experience the difference of banking with a trusted partner who puts your financial success first.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoney />
                <Typography variant="body1">2.5M+ Customers</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business />
                <Typography variant="body1">150+ Countries</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star />
                <Typography variant="body1">35+ Years Experience</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AboutUs;
