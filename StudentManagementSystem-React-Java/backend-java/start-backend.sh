#!/bin/bash

# Student Management System - Backend Startup Script

echo "==============================================="
echo "  Student Management System - Backend"
echo "==============================================="
echo ""

# Navigate to backend directory
cd "$(dirname "$0")"

echo "Starting Spring Boot Application..."
echo "Backend will be available at: http://localhost:8081/api"
echo "H2 Console will be available at: http://localhost:8081/api/h2-console"
echo ""

# Run the Spring Boot application
./apache-maven-3.9.6/bin/mvn spring-boot:run

