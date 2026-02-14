# Student Management System - Java Spring Boot API

This is a REST API backend for the Student Management System built with Java Spring Boot.

## Features

- **Student Management**: Create, read, update, and delete student records
- **Fee Management**: Manage student fees and process payments
- **Inquiry Management**: Handle student inquiries and responses
- **Dashboard**: Get dashboard statistics and recent activities
- **Search & Filter**: Search students, filter by status, course, etc.
- **Payment Processing**: Process fee payments with transaction tracking

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (In-memory for development)
- **Maven**
- **Bean Validation**

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven 3.6 or higher

### Installation & Running

1. **Clone the repository** (if not already done)
   ```bash
   cd StudentManagementSystem-React-Java/backend-java
   ```

2. **Install dependencies**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**
   - API Base URL: `http://localhost:8080/api`
   - H2 Console: `http://localhost:8080/api/h2-console`
     - JDBC URL: `jdbc:h2:mem:studentdb`
     - Username: `sa`
     - Password: (leave empty)

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student
- `GET /api/students/search?q={searchTerm}` - Search students
- `GET /api/students/status/{status}` - Get students by status
- `GET /api/students/course/{course}` - Get students by course

### Fees
- `GET /api/fees` - Get all fees
- `GET /api/fees/{id}` - Get fee by ID
- `GET /api/fees/student/{studentId}` - Get fees for a student
- `GET /api/fees/status/{status}` - Get fees by status
- `GET /api/fees/type/{feeType}` - Get fees by type
- `POST /api/fees` - Create new fee
- `PUT /api/fees/{id}` - Update fee
- `POST /api/fees/{id}/payment` - Process payment
- `DELETE /api/fees/{id}` - Delete fee

### Inquiries
- `GET /api/inquiries` - Get all inquiries
- `GET /api/inquiries/{id}` - Get inquiry by ID
- `GET /api/inquiries/status/{status}` - Get inquiries by status
- `POST /api/inquiries` - Create new inquiry
- `PUT /api/inquiries/{id}` - Update inquiry
- `POST /api/inquiries/{id}/respond` - Respond to inquiry
- `DELETE /api/inquiries/{id}` - Delete inquiry

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-activities` - Get recent activities

## Sample API Responses

### Student Creation
```json
POST /api/students
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@email.com",
  "phone": "+1234567890",
  "dateOfBirth": "1995-05-15",
  "gender": "Male",
  "address": "123 Main St, City, State",
  "course": "Computer Science"
}
```

### Fee Payment Processing
```json
POST /api/fees/{feeId}/payment
{
  "amount": 1500.00,
  "paymentMethod": "Credit Card"
}
```

### Dashboard Stats Response
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "totalStudents": 3,
    "newAdmissions": 2,
    "feesCollected": 6700.00,
    "pendingInquiries": 2,
    "lastUpdated": "2026-02-14T14:30:00"
  }
}
```

## Database Schema

### Students Table
- id (Primary Key)
- first_name, last_name, email, phone
- date_of_birth, gender, address, course
- enrollment_date, status

### Fees Table
- id (Primary Key)
- student_id (Foreign Key)
- fee_type, amount, paid_amount, status
- due_date, created_date, paid_date
- payment_method, transaction_id

### Inquiries Table
- id (Primary Key)
- name, email, phone, subject, message
- status, created_date, response, response_date

## Configuration

The application uses the following configuration:
- Server runs on port 8080
- Context path: `/api`
- CORS enabled for `http://localhost:3000`
- H2 database for development
- Automatic database schema creation and sample data initialization

## Development

### Adding New Features
1. Create/update model classes in `model` package
2. Add repository interfaces in `repository` package
3. Implement business logic in `service` package
4. Create REST endpoints in `controller` package
5. Update data initialization if needed

### Testing
- H2 Console available at `/h2-console` for database inspection
- All endpoints return standardized `ApiResponse<T>` format
- Sample data is automatically loaded on startup

## Production Considerations

For production deployment:
1. Replace H2 with a production database (PostgreSQL, MySQL)
2. Configure proper database connection properties
3. Add security (Spring Security, JWT)
4. Add logging configuration
5. Configure external configuration management
6. Add comprehensive unit and integration tests
7. Configure proper CORS origins
8. Add API documentation (Swagger/OpenAPI)