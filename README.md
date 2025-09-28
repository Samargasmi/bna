# BNA Backend - Spring Boot Application

A comprehensive Spring Boot backend for the BNA Banking Application, providing secure banking services including user management, transactions, loans, and administrative functions.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: User registration, profile management, and verification
- **Transaction Management**: Secure financial transactions, transfers, and transaction history
- **Loan Management**: Loan applications, approvals, and payment processing
- **Admin Dashboard**: Comprehensive administrative tools and system monitoring
- **Security**: Spring Security with JWT tokens and CORS configuration
- **Database**: H2 in-memory database with JPA/Hibernate
- **API Documentation**: RESTful API endpoints with proper HTTP status codes

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security**
- **Spring Data JPA**
- **H2 Database**
- **JWT (JSON Web Tokens)**
- **Lombok**
- **Maven**

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Build the Project

```bash
mvn clean install
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 4. Access H2 Database Console

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:bnadb`
- Username: `sa`
- Password: `password`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /init` - Initialize default users
- `GET /health` - Health check

### User Management (`/api/user`)
- `GET /profile` - Get current user profile
- `PUT /profile` - Update user profile
- `GET /{userId}` - Get user by ID (Admin only)
- `GET /all` - Get all users (Admin only)
- `GET /search` - Search users (Admin only)

### Transactions (`/api/transactions`)
- `GET /my` - Get user transactions
- `GET /my/paginated` - Get paginated transactions
- `POST /create` - Create new transaction
- `GET /pending` - Get pending transactions (Admin only)

### Loans (`/api/loans`)
- `GET /my` - Get user loans
- `POST /apply` - Apply for loan
- `POST /{loanNumber}/approve` - Approve loan (Admin only)
- `POST /{loanNumber}/reject` - Reject loan (Admin only)

### Admin (`/api/admin`)
- `GET /dashboard` - Admin dashboard statistics
- `GET /system/health` - System health check
- `POST /users/{userId}/toggle-status` - Toggle user status

## Default Users

The application automatically creates default users on startup:

### Admin User
- Email: `admin@bna.com`
- Password: `admin123`
- Role: `ADMIN`

### Regular User
- Email: `user@bna.com`
- Password: `user123`
- Role: `USER`
- Account Balance: $125,000

## Database Schema

### Users Table
- User information, authentication, and account details
- Role-based access control (USER/ADMIN)
- Account balance and verification status

### Transactions Table
- Financial transaction records
- Transaction types: CREDIT, DEBIT, TRANSFER, WITHDRAWAL, DEPOSIT
- Status tracking: PENDING, COMPLETED, FAILED, CANCELLED

### Loans Table
- Loan applications and management
- Loan types: PERSONAL, BUSINESS, MORTGAGE, AUTO, EQUIPMENT, AGRICULTURAL
- Status tracking: PENDING, APPROVED, REJECTED, ACTIVE, PAID_OFF, DEFAULTED

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for users and admins
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Cross-origin resource sharing setup
- **Input Validation**: Request validation and sanitization

## Configuration

### Application Properties
- Server port: 8080
- Database: H2 in-memory
- JWT secret and expiration
- CORS settings
- Logging configuration

### Environment Variables
- `JWT_SECRET`: Custom JWT secret key
- `MAIL_USERNAME`: Email service username
- `MAIL_PASSWORD`: Email service password

## Development

### Project Structure
```
src/main/java/com/bna/
├── config/          # Configuration classes
├── controller/      # REST controllers
├── dto/            # Data transfer objects
├── entity/         # JPA entities
├── repository/     # Data access layer
├── security/       # Security configuration
└── service/        # Business logic services
```

### Adding New Features
1. Create entity classes in `entity/` package
2. Create repository interfaces in `repository/` package
3. Implement business logic in `service/` package
4. Create DTOs in `dto/` package
5. Implement REST endpoints in `controller/` package
6. Add security configurations if needed

## Testing

### Run Tests
```bash
mvn test
```

### Test Coverage
```bash
mvn jacoco:report
```

## Deployment

### Build JAR
```bash
mvn clean package
```

### Run JAR
```bash
java -jar target/bna-backend-0.0.1-SNAPSHOT.jar
```

### Docker (Optional)
```bash
docker build -t bna-backend .
docker run -p 8080:8080 bna-backend
```

## Monitoring and Logging

- Application logs with configurable levels
- Health check endpoints
- Performance monitoring capabilities
- Error tracking and reporting

## Troubleshooting

### Common Issues
1. **Port already in use**: Change server.port in application.yml
2. **Database connection issues**: Check H2 console access
3. **JWT token issues**: Verify JWT secret configuration
4. **CORS issues**: Check CORS configuration for frontend integration

### Logs
Check application logs for detailed error information and debugging.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
