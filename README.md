# Bus Pass System

A cloud-based bus pass management system built with React, Node.js, MongoDB, and AWS.

## Features

- 🔐 User Authentication (JWT)
- 🎫 Bus Pass Management (Daily, Weekly, Monthly, Quarterly, Annual)
- 📱 QR Code Generation for Passes
- 🚌 Bus & Route Management
- 📅 Booking System
- 💳 Payment Integration (Stripe)
- 🏢 Admin Dashboard
- ☁️ AWS Integration (S3, EC2, RDS)
- 📊 Real-time Location Tracking

## Tech Stack

### Frontend
- React 18
- React Router v6
- Axios for API calls
- QRCode.react for QR code generation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- BCryptjs for password hashing
- AWS SDK for S3 integration
- Stripe for payments

### Infrastructure
- AWS EC2 for backend hosting
- AWS RDS for MongoDB/Database
- AWS S3 for file storage
- AWS CloudFront for CDN

## Project Structure

```
bus-pass-system/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── aws.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Bus.js
│   │   ├── BusPass.js
│   │   ├── Route.js
│   │   └── Booking.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── passController.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── passes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Dashboard.js
│   │   ├── components/
│   │   │   └── PrivateRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- AWS account

### Backend Setup

1. Navigate to backend folder
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`)
```bash
cp .env.example .env
```

4. Update `.env` with your configurations:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buspass
JWT_SECRET=your_secret_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
STRIPE_SECRET_KEY=your_stripe_key
```

5. Start the server
```bash
npm run dev  # For development
npm start   # For production
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)

### Bus Passes
- `POST /api/passes` - Create new pass (requires auth)
- `GET /api/passes` - Get user's passes (requires auth)
- `GET /api/passes/:id` - Get pass details (requires auth)
- `PUT /api/passes/:id/cancel` - Cancel pass (requires auth)

## AWS Deployment

### Backend Deployment (EC2)

1. **Launch EC2 Instance**
   - Ubuntu 20.04 LTS
   - t2.micro (free tier)
   - Open ports: 22, 5000

2. **SSH into Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Dependencies**
```bash
sudo apt update
sudo apt install nodejs npm git
```

4. **Clone and Setup**
```bash
git clone your-repo-url
cd bus-pass-system/backend
npm install
```

5. **Configure Environment**
```bash
nano .env
# Add your configurations
```

6. **Run with PM2** (Process Manager)
```bash
npm install -g pm2
pm2 start server.js --name "buspass-api"
pm2 startup
pm2 save
```

### Frontend Deployment (S3 + CloudFront)

1. **Build React App**
```bash
cd frontend
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://your-bucket-name
```

3. **Upload Files**
```bash
aws s3 cp build/ s3://your-bucket-name --recursive --acl public-read
```

4. **Create CloudFront Distribution**
   - Point to S3 bucket
   - Use CloudFront domain for CDN

5. **Update API URL**
   - Create `.env.production` with backend API URL
```
REACT_APP_API_URL=https://your-backend-url/api
```

### Database (MongoDB Atlas)

1. Create MongoDB Atlas cluster
2. Get connection string
3. Add to `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buspass
```

## Security Considerations

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ Input validation
- ✅ HTTPS for production (use AWS Certificate Manager)
- ⚠️ Add rate limiting for API endpoints
- ⚠️ Add request validation middleware
- ⚠️ Add database backups

## Testing API

Using Postman or cURL:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Create Pass (with token)
curl -X POST http://localhost:5000/api/passes \
  -H "Authorization: Bearer your_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "passType": "monthly",
    "routes": []
  }'
```

## Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Real-time bus tracking with WebSocket
- [ ] Mobile app (React Native)
- [ ] Admin dashboard for analytics
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Machine learning for route optimization
- [ ] Multi-language support
- [ ] Dark mode UI

## License

MIT

## Support

For issues and feature requests, please create an issue in the repository.
