#!/bin/bash

# Bus Pass System - Quick Start Script

echo "🚀 Bus Pass System - Setup Script"
echo "=================================="

# Backend Setup
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
cp .env.example .env
echo "✅ Backend setup complete. Edit backend/.env with your configurations"

# Frontend Setup
echo ""
echo "🎨 Setting up Frontend..."
cd ../frontend
npm install
echo "✅ Frontend setup complete"

# Instructions
echo ""
echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. Configure Backend Environment:"
echo "   - Edit backend/.env"
echo "   - Add MongoDB URI, JWT Secret, AWS credentials, etc."
echo ""
echo "2. Configure Frontend Environment:"
echo "   - Edit frontend/.env"
echo "   - Set API URL to your backend"
echo ""
echo "3. Start Backend:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "4. Start Frontend (in another terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "5. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "✨ Happy coding!"
