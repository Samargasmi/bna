import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import Navbar from './components/layout/Navbar.tsx';

// Pages
import LandingPage from './pages/LandingPage.tsx';
import Login from './pages/Login.tsx';
import ClientDashboard from './pages/ClientDashboard.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import Profile from './pages/Profile.tsx';
import Accounts from './pages/Accounts.tsx';
import Settings from './pages/Settings.tsx';
import Services from './pages/Services.tsx';
import AboutUs from './pages/AboutUs.tsx';
import Contact from './pages/Contact.tsx';

// Admin Pages
import AddUser from './pages/admin/AddUser.tsx';
import ManageUsers from './pages/admin/ManageUsers.tsx';
import ViewAnalytics from './pages/admin/ViewAnalytics.tsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // BNA Green
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8BC34A', // Light BNA Green
      light: '#AED581',
      dark: '#689F38',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F1F8E9', // Very light green
      paper: '#ffffff',
    },
    text: {
      primary: '#1B5E20',
      secondary: '#2E7D32',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    warning: {
      main: '#FF9800',
      light: '#FFB74D',
      dark: '#F57C00',
    },
    error: {
      main: '#F44336',
      light: '#E57373',
      dark: '#D32F2F',
    },
    info: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      color: '#1B5E20',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      color: '#1B5E20',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      color: '#1B5E20',
    },
    h4: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    h5: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    h6: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    body1: {
      color: '#1B5E20',
      lineHeight: 1.6,
    },
    body2: {
      color: '#2E7D32',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 25px rgba(46, 125, 50, 0.08)',
          border: '1px solid rgba(46, 125, 50, 0.05)',
          borderRadius: 16,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(46, 125, 50, 0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          boxShadow: '0 4px 14px rgba(46, 125, 50, 0.25)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(46, 125, 50, 0.35)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B5E20',
          boxShadow: '0 4px 20px rgba(46, 125, 50, 0.15)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  return (
    <Router>
      <CssBaseline />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<><Navbar /><Services /></>} />
        <Route path="/about" element={<><Navbar /><AboutUs /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        
        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            {/* Client Routes */}
            <Route path="/profile" element={<><Navbar /><Profile /></>} />
            <Route path="/accounts" element={<><Navbar /><Accounts /></>} />
            <Route path="/settings" element={<><Navbar /><Settings /></>} />
            
            {/* Admin Routes */}
            {isAdmin && (
              <>
                <Route path="/admin" element={<><Navbar /><AdminDashboard /></>} />
                <Route path="/admin/users/create" element={<><Navbar /><AddUser /></>} />
                <Route path="/admin/users" element={<><Navbar /><ManageUsers /></>} />
                <Route path="/admin/analytics" element={<><Navbar /><ViewAnalytics /></>} />
              </>
            )}
            
            {/* Dashboard Route - Only for clients */}
            {!isAdmin && (
              <Route path="/dashboard" element={<><Navbar /><ClientDashboard /></>} />
            )}
            
            {/* Default route based on role */}
            <Route
              path="/"
              element={
                <Navigate
                  to={isAdmin ? '/admin' : '/dashboard'}
                  replace
                />
              }
            />
          </>
        ) : (
          /* Redirect to login if not authenticated */
          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />
        )}

        {/* Fallback Route */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? (isAdmin ? '/admin' : '/dashboard') : '/login'}
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
