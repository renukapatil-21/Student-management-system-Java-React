#!/bin/bash

# Student Management System - Frontend Startup Script

echo "==============================================="
echo "  Student Management System - Frontend"
echo "==============================================="
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")"

echo "Installing dependencies (if needed)..."
npm install

echo ""
echo "Starting React Development Server..."
echo "Frontend will be available at: http://localhost:3000"
echo ""

# Start the React development server
npm start

