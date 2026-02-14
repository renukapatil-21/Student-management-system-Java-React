# Quick Start Guide - Student Management System

## Prerequisites Check
- ✅ Java JDK 17+ installed
- ✅ Node.js 16+ installed  
- ✅ Maven (included in project)

## Step 1: Start the Backend

### Option A: Using Terminal

```bash
cd backend-java
./apache-maven-3.9.6/bin/mvn spring-boot:run
```

### Option B: Using Startup Script

```bash
cd backend-java
chmod +x start-backend.sh
./start-backend.sh
```

**Backend will start on:** `http://localhost:8081/api`

**Wait for this message:**
```
Started StudentManagementApplication in X.XXX seconds
```

## Step 2: Start the Frontend

Open a **NEW terminal window/tab** and run:

### Option A: Using Terminal

```bash
cd frontend-react
npm install  # Only needed first time
npm start
```

### Option B: Using Startup Script

```bash
cd frontend-react
chmod +x start-frontend.sh
./start-frontend.sh
```

**Frontend will automatically open at:** `http://localhost:3000`

## Step 3: Access the Application

1. **Main Application**: http://localhost:3000
2. **H2 Database Console**: http://localhost:8081/api/h2-console
   - JDBC URL: `jdbc:h2:mem:studentdb`
   - Username: `sa`
   - Password: (leave empty)

## What You'll See

### Dashboard (Home Page)
- 📊 Total Students count
- 👥 New Admissions this month
- 💵 Total Fees Collected
- ❓ Pending Inquiries
- Quick action buttons
- Recent activities feed

### Navigation Menu
- **Dashboard** - System overview
- **Students** - Manage student records
- **Fees** - Track payments and fees
- **Inquiries** - Handle student inquiries

## Sample Data

The application comes pre-loaded with:
- ✅ 5 Sample Students
- ✅ 8 Sample Fee Records  
- ✅ 4 Sample Inquiries

## Testing the Features

### Add a New Student
1. Click "Students" in navigation
2. Click "+ Add Student" button
3. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Phone: +1234567890
   - Date of Birth: 2000-01-01
   - Gender: Male
   - Course: Computer Science
   - Address: 123 Main St
   - Status: Active
4. Click "Add Student"
5. Success message will appear!

### Search Students
1. Go to Students page
2. Use the search box to find by:
   - Name
   - Email
   - Phone
   - Course

### Manage Fees
1. Click "Fees" in navigation
2. View all fee records
3. Filter by status (Paid/Pending/Overdue)
4. Update status using dropdown

### Handle Inquiries
1. Click "Inquiries" in navigation
2. Click "+ Add Inquiry" to submit new inquiry
3. View inquiry details by clicking the eye icon
4. Update status using dropdown
5. Delete inquiries if needed

## Troubleshooting

### Backend Issues

**Problem: Port 8081 already in use**

Solution:
```bash
# Find process on port 8081
lsof -i:8081

# Kill the process
kill -9 <PID>
```

**Problem: Maven command not found**

Solution: Use the included Maven:
```bash
./apache-maven-3.9.6/bin/mvn spring-boot:run
```

### Frontend Issues

**Problem: Cannot connect to backend**

Solution:
1. Ensure backend is running on http://localhost:8081
2. Check backend terminal for errors
3. Verify in browser: http://localhost:8081/api/students

**Problem: npm install fails**

Solution:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Problem: Port 3000 already in use**

Solution:
```bash
# The terminal will ask if you want to use another port
# Type 'y' to use port 3001
```

## API Testing

You can test the API directly:

### Get All Students
```bash
curl http://localhost:8081/api/students
```

### Get Dashboard Stats
```bash
curl http://localhost:8081/api/dashboard/stats
```

### Create New Student
```bash
curl -X POST http://localhost:8081/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "phone": "+1234567891",
    "dateOfBirth": "1999-05-15",
    "gender": "Female",
    "course": "Business Administration",
    "address": "456 Oak Ave",
    "status": "Active"
  }'
```

## Stopping the Application

### Stop Backend
Press `Ctrl + C` in the backend terminal

### Stop Frontend
Press `Ctrl + C` in the frontend terminal

## Next Steps

1. ✅ Explore all features
2. ✅ Add your own students
3. ✅ Test different filters and searches
4. ✅ Check the H2 database console
5. ✅ Review the code structure

## Need Help?

- Check the main README.md for detailed documentation
- Review the backend logs for errors
- Check browser console (F12) for frontend errors
- Ensure all dependencies are installed

## Success Indicators

✅ Backend running: Check http://localhost:8081/api/students (should return JSON)
✅ Frontend running: Check http://localhost:3000 (should show Dashboard)
✅ API connected: Dashboard shows stats (not all zeros)
✅ Database working: H2 console shows tables with data

---

**🎉 Congratulations! Your Student Management System is now running!**

