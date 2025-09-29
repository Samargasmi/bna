import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import {
  AccountCircle,
  Dashboard,
  People,
  AccountBalance,
  ExitToApp,
  Home,
  Analytics,
  AccountBalanceWallet,
  Notifications,
  Settings,
  Business,
  Phone,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.tsx';

const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  return (
    <AppBar 
      position="static" 
      elevation={2}
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Toolbar sx={{ minHeight: '70px !important' }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <AccountBalance 
            sx={{ 
              fontSize: '2rem', 
              mr: 2, 
              color: theme.palette.secondary.light,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }} 
          />
          <Box>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: 1,
              }}
            >
              BNA Bank
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.secondary.light,
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              Trusted Banking Solutions
            </Typography>
          </Box>
        </Box>
        
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 3 }}>
          {isAdmin ? (
            // Admin Navigation - Only Admin Dashboard
            <Button
              color="inherit"
              startIcon={<Analytics />}
              onClick={() => navigate('/admin')}
              sx={{
                fontWeight: 500,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Admin Dashboard
            </Button>
          ) : (
            // Client Navigation - All links except Admin Dashboard
            <>
              <Button
                color="inherit"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Home
              </Button>

              <Button
                color="inherit"
                startIcon={<AccountBalanceWallet />}
                onClick={() => navigate('/accounts')}
                sx={{
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Accounts
              </Button>

              <Button
                color="inherit"
                startIcon={<Business />}
                onClick={() => navigate('/services')}
                sx={{
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Services
              </Button>

              <Button
                color="inherit"
                startIcon={<People />}
                onClick={() => navigate('/about')}
                sx={{
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                About
              </Button>

              <Button
                color="inherit"
                startIcon={<Phone />}
                onClick={() => navigate('/contact')}
                sx={{
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Contact
              </Button>
            </>
          )}
        </Box>

        {/* User Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Notifications */}
          <IconButton
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <Notifications />
          </IconButton>

          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'white' }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Chip
                label={isAdmin ? 'Administrator' : 'Client'}
                size="small"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: 20,
                }}
              />
            </Box>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  backgroundColor: theme.palette.secondary.main,
                  border: `2px solid ${theme.palette.secondary.light}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                {user?.firstName?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>
          
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                border: `1px solid ${theme.palette.primary.light}20`,
              },
            }}
          >
            <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
              <AccountCircle sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                My Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/settings')} sx={{ py: 1.5 }}>
              <Settings sx={{ mr: 2, color: theme.palette.primary.main }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Settings
              </Typography>
            </MenuItem>
            <MenuItem 
              onClick={handleLogout} 
              sx={{ 
                py: 1.5,
                borderTop: `1px solid ${theme.palette.grey[200]}`,
                mt: 0.5,
              }}
            >
              <ExitToApp sx={{ mr: 2, color: theme.palette.error.main }} />
              <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.error.main }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
