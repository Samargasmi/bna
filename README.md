# BNA Banking Client Management System

A comprehensive banking client management system built with React.js, Material-UI, NestJS, and PostgreSQL.

## 🚀 Features

### Client Portal
- ✅ View account balance and transaction history
- ✅ Real-time transaction notifications
- ✅ Account statement downloads
- ✅ Profile management
- ✅ Secure authentication with JWT
- ✅ Multiple account types (Savings, Checking, Business, Investment)
- ✅ Transaction filtering and search

### Admin Dashboard
- ✅ Manage all bank clients
- ✅ View comprehensive analytics and insights
- ✅ Monitor transaction patterns
- ✅ User management and permissions
- ✅ Financial reporting tools
- ✅ Real-time dashboard statistics
- ✅ User status management (Active, Inactive, Suspended)

## 🛠️ Tech Stack

- **Frontend**: React.js 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **Backend**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT tokens with role-based access
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router v6

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd bna-banking-system
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Database Setup
1. Create a PostgreSQL database named `bna_banking`
2. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. Update `backend/.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=bna_banking
   ```

### 4. Start the Application
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api

### 5. Default Admin Access
- **Email**: admin@bna.com
- **Password**: admin123

## 📁 Project Structure

```
bna-banking-system/
├── frontend/                 # React.js client application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── App.tsx         # Main app component
│   └── public/             # Static assets
├── backend/                 # NestJS API server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── clients/        # Client management module
│   │   ├── admin/          # Admin management module
│   │   ├── entities/       # Database entities
│   │   └── config/         # Configuration files
│   └── package.json
└── README.md
```

## 🔌 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get current user profile
- `POST /api/auth/refresh` - Refresh JWT token

### Client Endpoints
- `GET /api/clients/profile` - Get client profile
- `PUT /api/clients/profile` - Update client profile
- `GET /api/clients/accounts` - Get client accounts
- `GET /api/clients/accounts/summary` - Get account summary
- `GET /api/clients/transactions` - Get transaction history
- `GET /api/clients/transactions/summary` - Get transaction summary
- `POST /api/clients/transactions` - Create new transaction

### Admin Endpoints
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/analytics/transactions` - Get transaction analytics
- `GET /api/admin/analytics/users` - Get user analytics

## 🗄️ Database Schema

### Users Table
- User management with roles (Client, Admin)
- Profile information and status tracking
- Secure password hashing with bcrypt

### Accounts Table
- Multiple account types (Savings, Checking, Business, Investment)
- Balance tracking and account status
- Interest rate management

### Transactions Table
- Complete transaction history
- Multiple transaction types (Deposit, Withdrawal, Transfer, Payment)
- Transaction status tracking
- Fee and reference management

## 🔐 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Protected routes

## 🎨 UI/UX Features

- Responsive Material-UI design
- Dark/Light theme support
- Real-time dashboard updates
- Interactive data tables
- Form validation
- Loading states and error handling
- Mobile-friendly interface

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm run test

# Run frontend tests
cd frontend
npm test
```

## 📦 Production Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Start the backend in production mode:
   ```bash
   cd backend
   npm run start:prod
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@bna.com or create an issue in the repository.

---

**BNA Banking System** - Secure, Modern, and User-Friendly Banking Solution 🏦
