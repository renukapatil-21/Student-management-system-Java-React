# Student Management System

A full-stack Student Management System built with React (Frontend) and Java Spring Boot (Backend).

## Features

- **Dashboard**: Overview of system statistics including total students, new admissions, fees collected, and pending inquiries
- **Student Management**: Add, edit, view, and delete student records
- **Fee Management**: Track and manage student fees and payments
- **Inquiry Management**: Handle student inquiries and track their status
- **Search & Filter**: Search students, fees, and inquiries with various filters
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (in-memory)
- Maven

### Frontend
- React 18.2.0
- React Router 6.8.0
- Axios
- Lucide React (icons)
- React Toastify (notifications)

## Prerequisites

- Java JDK 17 or higher
- Node.js 16 or higher
- Maven 3.9.6 (included in the project)

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend-java
```

2. Build the project using Maven:
```bash
./apache-maven-3.9.6/bin/mvn clean install
```

3. Run the Spring Boot application:
```bash
./apache-maven-3.9.6/bin/mvn spring-boot:run
```

The backend will start on `http://localhost:8080/api`

#### H2 Console Access
- URL: `http://localhost:8080/api/h2-console`
- JDBC URL: `jdbc:h2:mem:studentdb`
- Username: `sa`
- Password: (leave empty)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student
- `GET /api/students/search?q={query}` - Search students
- `GET /api/students/status/{status}` - Get students by status
- `GET /api/students/course/{course}` - Get students by course

### Fees
- `GET /api/fees` - Get all fees
- `GET /api/fees/{id}` - Get fee by ID
- `POST /api/fees` - Create new fee
- `PUT /api/fees/{id}` - Update fee
- `DELETE /api/fees/{id}` - Delete fee
- `GET /api/fees/student/{studentId}` - Get fees by student
- `GET /api/fees/status/{status}` - Get fees by status
- `POST /api/fees/{id}/payment` - Process payment

### Inquiries
- `GET /api/inquiries` - Get all inquiries
- `GET /api/inquiries/{id}` - Get inquiry by ID
- `POST /api/inquiries` - Create new inquiry
- `PUT /api/inquiries/{id}` - Update inquiry
- `DELETE /api/inquiries/{id}` - Delete inquiry
- `GET /api/inquiries/status/{status}` - Get inquiries by status
- `POST /api/inquiries/{id}/respond` - Respond to inquiry

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/recent-activities` - Get recent activities

## Student Data Model

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "2000-01-01",
  "gender": "Male",
  "course": "Computer Science",
  "address": "123 Main St, City",
  "status": "Active"
}
```

## Default Data

The application comes with sample data that is automatically loaded on startup:
- 5 sample students
- 8 sample fee records
- 4 sample inquiries

## Project Structure

```
StudentManagementSystem-React-Java/
├── backend-java/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/studentmanagement/
│   │       │   ├── config/          # Configuration classes
│   │       │   ├── controller/      # REST controllers
│   │       │   ├── dto/             # Data Transfer Objects
│   │       │   ├── model/           # Entity models
│   │       │   ├── repository/      # JPA repositories
│   │       │   └── service/         # Business logic
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── frontend-react/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout/              # Layout components
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API service
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Features Breakdown

### Dashboard
- View total number of students
- View new admissions this month
- View total fees collected
- View pending inquiries
- Quick action buttons
- Recent activity feed

### Student Management
- Add new students with complete information
- Edit existing student details
- Delete students
- Search students by name, email, or course
- Filter students by status or course
- View student details in card format

### Fee Management
- View all fee records
- Track payment status (Paid, Pending, Overdue)
- Filter fees by status
- Search fees by student name or fee type
- Update fee status

### Inquiry Management
- Submit new inquiries
- View all inquiries
- Filter by status (Open, In Progress, Resolved, Closed)
- View detailed inquiry information
- Update inquiry status
- Delete inquiries

## Troubleshooting

### Backend Issues

1. **Port 8080 already in use**
   - Change the port in `application.properties`: `server.port=8081`
   - Update the frontend proxy in `package.json`

2. **Maven command not found**
   - Use the included Maven: `./apache-maven-3.9.6/bin/mvn`

### Frontend Issues

1. **Cannot connect to backend**
   - Ensure backend is running on port 8080
   - Check CORS configuration in backend controllers

2. **Module not found errors**
   - Run `npm install` again
   - Delete `node_modules` and `package-lock.json`, then run `npm install`

## Future Enhancements

- User authentication and authorization
- File upload for student documents
- Export data to PDF/Excel
- Email notifications
- Advanced reporting and analytics
- Course management module
- Attendance tracking
- Grade management

## License

This project is created for educational purposes.

## Contributors

- Your Name

## Support

For issues and questions, please create an issue in the repository.

