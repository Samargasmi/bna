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
  Switch,
  FormControlLabel,
  TextField,
  Divider,
  useTheme,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Notifications,
  Security,
  Language,
  Palette,
  Email,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
  Save,
  Restore,
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false,
    },
    security: {
      twoFactor: true,
      biometric: false,
      autoLogout: true,
    },
    preferences: {
      language: 'en',
      theme: 'light',
      currency: 'USD',
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
    },
  });
  const [success, setSuccess] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handleSecurityChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value,
      },
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  const handlePrivacyChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    // Simulate saving settings
    setSuccess(true);
  };

  const handleReset = () => {
    setSettings({
      notifications: {
        email: true,
        sms: false,
        push: true,
        marketing: false,
      },
      security: {
        twoFactor: true,
        biometric: false,
        autoLogout: true,
      },
      preferences: {
        language: 'en',
        theme: 'light',
        currency: 'USD',
      },
      privacy: {
        profileVisibility: 'private',
        dataSharing: false,
      },
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
            Settings
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 400,
            }}
          >
            Manage your account preferences and security settings
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Notifications */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Notifications sx={{ color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Notifications
                  </Typography>
                </Box>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Notifications"
                      secondary="Receive updates via email"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.notifications.email}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Phone />
                    </ListItemIcon>
                    <ListItemText
                      primary="SMS Notifications"
                      secondary="Receive updates via SMS"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.notifications.sms}
                        onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Notifications />
                    </ListItemIcon>
                    <ListItemText
                      primary="Push Notifications"
                      secondary="Receive push notifications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.notifications.push}
                        onChange={(e) => handleNotificationChange('push', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText
                      primary="Marketing Emails"
                      secondary="Receive promotional content"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.notifications.marketing}
                        onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Security */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Security sx={{ color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Security
                  </Typography>
                </Box>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Lock />
                    </ListItemIcon>
                    <ListItemText
                      primary="Two-Factor Authentication"
                      secondary="Add an extra layer of security"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.security.twoFactor}
                        onChange={(e) => handleSecurityChange('twoFactor', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Security />
                    </ListItemIcon>
                    <ListItemText
                      primary="Biometric Login"
                      secondary="Use fingerprint or face ID"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.security.biometric}
                        onChange={(e) => handleSecurityChange('biometric', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <Visibility />
                    </ListItemIcon>
                    <ListItemText
                      primary="Auto Logout"
                      secondary="Automatically log out after inactivity"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={settings.security.autoLogout}
                        onChange={(e) => handleSecurityChange('autoLogout', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Preferences */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Palette sx={{ color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Preferences
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    select
                    label="Language"
                    value={settings.preferences.language}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </TextField>
                  
                  <TextField
                    fullWidth
                    select
                    label="Theme"
                    value={settings.preferences.theme}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </TextField>
                  
                  <TextField
                    fullWidth
                    select
                    label="Currency"
                    value={settings.preferences.currency}
                    onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                  </TextField>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Privacy */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <VisibilityOff sx={{ color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Privacy
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    select
                    label="Profile Visibility"
                    value={settings.privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="friends">Friends Only</option>
                  </TextField>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.privacy.dataSharing}
                        onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                      />
                    }
                    label="Allow data sharing for analytics"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Save Your Changes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Don't forget to save your settings to apply changes
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Restore />}
                      onClick={handleReset}
                    >
                      Reset to Default
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      Save Settings
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert onClose={() => setSuccess(false)} severity="success">
            Settings saved successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Settings;
