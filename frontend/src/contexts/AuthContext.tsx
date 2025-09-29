import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'client' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  dateOfBirth?: string;
  nationalId?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock user database
  const mockUsers = {
    'client@bna.com': {
      id: 'client-1',
      email: 'client@bna.com',
      firstName: 'Mehdi',
      lastName: 'Alami',
      role: 'client',
      status: 'active',
      password: 'password123',
    },
    'admin@bna.com': {
      id: 'admin-1',
      email: 'admin@bna.com',
      firstName: 'Oussama',
      lastName: 'BNA',
      role: 'admin',
      status: 'active',
      password: 'admin123',
    },
  };

  const login = async (email: string, password: string) => {
    console.log('AuthContext login called with:', { email, password });
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = mockUsers[email as keyof typeof mockUsers];
    console.log('Found user data:', userData);
    
    if (userData && userData.password === password) {
      const { password: _, ...userWithoutPassword } = userData;
      console.log('Login successful, setting user:', userWithoutPassword);
      setUser(userWithoutPassword as User);
      setToken('mock-jwt-token');
      localStorage.setItem('bna_token', 'mock-jwt-token');
      localStorage.setItem('bna_user', JSON.stringify(userWithoutPassword));
    } else {
      console.log('Login failed - invalid credentials');
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const register = async (userData: RegisterData) => {
    // Mock registration - always succeeds
    console.log('Mock registration:', userData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bna_token');
    localStorage.removeItem('bna_user');
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const savedToken = localStorage.getItem('bna_token');
    const savedUser = localStorage.getItem('bna_user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};