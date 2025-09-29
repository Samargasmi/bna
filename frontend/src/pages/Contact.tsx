import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  useTheme,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Send,
  Support,
  Business,
  AccountBalance,
  Chat,
  Fax,
} from '@mui/icons-material';

const Contact: React.FC = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general',
      });
    }, 2000);
  };

  const contactInfo = [
    {
      title: 'Customer Service',
      phone: '+1 (555) 123-4567',
      email: 'support@bnabank.com',
      hours: '24/7 Support',
      icon: <Support />,
    },
    {
      title: 'Business Banking',
      phone: '+1 (555) 123-4568',
      email: 'business@bnabank.com',
      hours: 'Mon-Fri 8AM-6PM',
      icon: <Business />,
    },
    {
      title: 'Investment Services',
      phone: '+1 (555) 123-4569',
      email: 'investments@bnabank.com',
      hours: 'Mon-Fri 9AM-5PM',
      icon: <AccountBalance />,
    },
  ];

  const branches = [
    {
      name: 'Main Branch',
      address: '123 Financial District, New York, NY 10004',
      phone: '+1 (555) 123-4570',
      hours: 'Mon-Fri 9AM-5PM, Sat 9AM-1PM',
    },
    {
      name: 'Downtown Branch',
      address: '456 Business Ave, New York, NY 10005',
      phone: '+1 (555) 123-4571',
      hours: 'Mon-Fri 8AM-6PM, Sat 9AM-2PM',
    },
    {
      name: 'Midtown Branch',
      address: '789 Commerce St, New York, NY 10006',
      phone: '+1 (555) 123-4572',
      hours: 'Mon-Fri 9AM-5PM, Sat 10AM-1PM',
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
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            We're here to help! Get in touch with our team for any questions, support, or banking services.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: theme.palette.primary.main,
                  }}
                >
                  Send us a Message
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        InputProps={{
                          startAdornment: <Phone sx={{ mr: 1, color: theme.palette.primary.main }} />,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        InputProps={{
                          startAdornment: <Email sx={{ mr: 1, color: theme.palette.primary.main }} />,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        InputProps={{
                          startAdornment: <Phone sx={{ mr: 1, color: theme.palette.primary.main }} />,
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Inquiry Type"
                        value={formData.inquiryType}
                        onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                        required
                      >
                        <option value="general">General Inquiry</option>
                        <option value="account">Account Services</option>
                        <option value="business">Business Banking</option>
                        <option value="investment">Investment Services</option>
                        <option value="loan">Loan Services</option>
                        <option value="technical">Technical Support</option>
                      </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        required
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        multiline
                        rows={6}
                        required
                        placeholder="Please describe your inquiry in detail..."
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        disabled={loading}
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          px: 4,
                          py: 1.5,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {/* Quick Contact */}
              <Grid item xs={12}>
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Quick Contact
                    </Typography>
                    
                    <List>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <Phone sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Main Phone"
                          secondary="+1 (555) 123-4567"
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <Email sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="General Email"
                          secondary="info@bnabank.com"
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <LocationOn sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Headquarters"
                          secondary="123 Financial District, NY 10004"
                        />
                      </ListItem>
                      
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemIcon>
                          <Schedule sx={{ color: theme.palette.primary.main }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Business Hours"
                          secondary="Mon-Fri 9AM-5PM EST"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Department Contacts */}
              <Grid item xs={12}>
                <Card>
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Department Contacts
                    </Typography>
                    
                    {contactInfo.map((dept, index) => (
                      <Box key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            sx={{
                              backgroundColor: theme.palette.primary.main,
                              mr: 2,
                              width: 40,
                              height: 40,
                            }}
                          >
                            {dept.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {dept.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {dept.hours}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ ml: 6, mb: 3 }}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            📞 {dept.phone}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            ✉️ {dept.email}
                          </Typography>
                        </Box>
                        
                        {index < contactInfo.length - 1 && <Divider sx={{ mb: 3 }} />}
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* Live Chat */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    color: 'white',
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Chat sx={{ fontSize: '3rem', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Live Chat Support
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                      Get instant help from our support team
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: 'white',
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.grey[100],
                        },
                      }}
                    >
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Branch Locations */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Branch Locations
          </Typography>

          <Grid container spacing={3}>
            {branches.map((branch, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 2,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {branch.name}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOn sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body2">
                          {branch.address}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Phone sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body2">
                          {branch.phone}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Schedule sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: '1.2rem' }} />
                        <Typography variant="body2">
                          {branch.hours}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light + '10',
                          borderColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Message sent successfully! We'll get back to you within 24 hours.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;
