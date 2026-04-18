# System Architecture Overview

This guide helps you understand how all the pieces fit together.

---

## 🏗️ Architecture Diagram

### Local Development Setup
```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR COMPUTER                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────────┐      │
│  │   React App      │         │   Node.js Backend    │      │
│  │  :3000           │◄───────►│   :5000              │      │
│  │  (Frontend)      │  HTTP   │   (Backend API)      │      │
│  └──────────────────┘         └──────────┬───────────┘      │
│                                           │                   │
│         (You test everything here)        │                   │
│                                           │                   │
│                                    ┌──────▼──────────┐       │
│                                    │ .env file       │       │
│                                    │ MongoDB URI     │       │
│                                    │ JWT Secret      │       │
│                                    │ AWS Credentials │       │
│                                    └─────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴──────────────┐
                    │   (Internet)               │
        ┌───────────▼──────────┐     ┌──────────▼────────────┐
        │  MONGODB ATLAS       │     │  AWS (Cloud)          │
        │  (Database Cloud)    │     │  (Infrastructure)     │
        │                      │     │                       │
        │ ┌──────────────────┐ │     │ ┌───────────────────┐ │
        │ │ Collections      │ │     │ │ EC2 Instance      │ │
        │ │ - users          │ │     │ │ (Your server)     │ │
        │ │ - passes         │ │     │ │ :5000             │ │
        │ │ - bookings       │ │     │ │                   │ │
        │ │ - buses          │ │     │ │ PM2 running app   │ │
        │ │ - routes         │ │     │ │                   │ │
        │ └──────────────────┘ │     │ └────────┬──────────┘ │
        └──────────────────────┘     │          │             │
                                     │ ┌────────▼────────┐    │
                                     │ │ S3 Bucket       │    │
                                     │ │ (File Storage)  │    │
                                     │ │ - QR codes      │    │
                                     │ │ - Images        │    │
                                     │ │ - Documents     │    │
                                     │ └─────────────────┘    │
                                     │ ┌───────────────────┐  │
                                     │ │ CloudFront CDN    │  │
                                     │ │ (Frontend Hosting)│  │
                                     │ │ Your domain.com   │  │
                                     │ └───────────────────┘  │
                                     └───────────────────────┘
```

---

## 🔄 Data Flow

### User Registration Flow
```
1. User enters form
   ↓
2. React sends to Backend API
   ↓
3. Backend validates input
   ↓
4. Backend creates user
   ↓
5. User saved to MongoDB
   ↓
6. Backend generates JWT token
   ↓
7. Token sent to React
   ↓
8. Token stored in browser
   ↓
9. User logged in ✅
```

### Bus Pass Purchase Flow
```
1. User selects pass type
   ↓
2. React sends to Backend
   ↓
3. Backend validates
   ↓
4. Backend generates QR code
   ↓
5. Pass saved to MongoDB
   ↓
6. QR code sent to React
   ↓
7. React displays QR code
   ↓
8. QR code uploaded to S3
   ↓
9. Pass visible to user ✅
```

---

## 📊 Technology Stack Breakdown

### Frontend (React)
```
┌─────────────────────────────────┐
│        REACT (Your Website)      │
├─────────────────────────────────┤
│ Pages:                            │
│ ├── Login.js      (login page)   │
│ ├── Register.js   (sign up)      │
│ └── Dashboard.js  (main app)     │
│                                   │
│ Components:                       │
│ ├── PrivateRoute  (auth check)   │
│ └── Context       (auth storage) │
│                                   │
│ Services:                         │
│ └── api.js        (API calls)    │
│                                   │
│ Styling:                          │
│ └── CSS files     (design)       │
└─────────────────────────────────┘
        │
        │ (HTTPS/HTTP)
        │
   Runs on: http://localhost:3000
```

### Backend (Node.js)
```
┌──────────────────────────────────┐
│      NODE.JS (Your Server)       │
├──────────────────────────────────┤
│ Server:                            │
│ └── server.js    (main entry)    │
│                                   │
│ Routes:                           │
│ ├── /api/auth    (login, register)
│ └── /api/passes  (pass management)
│                                   │
│ Controllers:                      │
│ ├── authController.js            │
│ └── passController.js            │
│                                   │
│ Models:                           │
│ ├── User.js                      │
│ ├── BusPass.js                   │
│ ├── Bus.js                       │
│ ├── Route.js                     │
│ └── Booking.js                   │
│                                   │
│ Config:                           │
│ ├── database.js  (MongoDB setup) │
│ └── aws.js       (S3 setup)      │
│                                   │
│ Middleware:                       │
│ ├── auth.js      (JWT check)     │
│ └── errorHandler.js              │
└──────────────────────────────────┘
        │
        │ (Network)
        │
   Runs on: http://localhost:5000
```

### Database (MongoDB)
```
┌──────────────────────────────────┐
│     MONGODB (Your Database)       │
├──────────────────────────────────┤
│ Collections:                      │
│                                   │
│ users {                           │
│   _id, name, email, password     │
│   phone, role, passes[], ...     │
│ }                                │
│                                   │
│ passes {                          │
│   _id, user_id, passType, price  │
│   validFrom, validUntil, qrCode  │
│ }                                │
│                                   │
│ buses {                           │
│   _id, busNumber, model, route   │
│   capacity, driver, location     │
│ }                                │
│                                   │
│ routes {                          │
│   _id, number, from, to, stops   │
│   fare, schedule, buses[]        │
│ }                                │
│                                   │
│ bookings {                        │
│   _id, user, bus, route, seat    │
│   journeyDate, status, price     │
│ }                                │
└──────────────────────────────────┘
```

### AWS Services
```
┌──────────────────────────────────────────┐
│              AWS (Cloud)                  │
├──────────────────────────────────────────┤
│                                           │
│  S3 Bucket (File Storage)                 │
│  ├── QR codes for passes                 │
│  ├── User documents                      │
│  └── Business images                     │
│                                           │
│  EC2 Instance (Virtual Computer)         │
│  ├── Runs Node.js backend                │
│  ├── Connects to MongoDB                 │
│  └── Accepts API requests                │
│                                           │
│  CloudFront (Content Delivery)           │
│  ├── Serves frontend files               │
│  ├── Caches static content               │
│  └── Fast access worldwide               │
│                                           │
│  IAM (Security)                          │
│  ├── User credentials                    │
│  ├── Access keys                         │
│  └── Permissions                         │
│                                           │
│  CloudWatch (Monitoring)                 │
│  ├── Check EC2 health                    │
│  ├── View error logs                     │
│  └── Monitor costs                       │
└──────────────────────────────────────────┘
```

---

## 🔐 Security Layers

```
┌─────────────────────────────────────┐
│        User's Web Browser            │ ← No passwords stored
├─────────────────────────────────────┤
│  Token (JWT) in localStorage        │
│  (Proves user is logged in)          │
└─────────────────────────────────────┘
           │
           │ HTTPS (Encrypted)
           │
┌─────────────────────────────────────┐
│    Backend Server (Node.js)          │
├─────────────────────────────────────┤
│ Auth Middleware                      │ ← Validates token
│ validates every request              │
└─────────────────────────────────────┘
           │
           │ Encrypted Connection
           │
┌─────────────────────────────────────┐
│    MongoDB (Database)                │
├─────────────────────────────────────┤
│ Database User Authentication         │ ← Username/Password
│ Passwords hashed with bcryptjs       │ ← One-way encryption
│ Whitelist IP access                  │ ← Only allowed IPs
└─────────────────────────────────────┘
```

---

## 📈 Request Flow (How Your App Works)

### Step 1: User Opens App
```
1. Browser → http://localhost:3000
2. React app loads from index.html
3. App checks if user is logged in (token in localStorage)
4. If not logged in → shows Login page
5. If logged in → shows Dashboard
```

### Step 2: User Registers
```
1. User fills form with email/password
2. React sends to Backend: POST /api/auth/register
3. Backend receives request
4. Backend validates input
5. Backend hashes password (bcryptjs)
6. Backend saves user to MongoDB
7. Backend generates JWT token
8. Backend returns token to React
9. React saves token in localStorage
10. React redirects to Dashboard
```

### Step 3: User Buys Pass
```
1. User selects pass type (Daily/Monthly/etc)
2. React sends to Backend: POST /api/passes
3. Backend receives request
4. Backend validates JWT token
5. Backend creates pass record
6. Backend generates QR code
7. Backend uploads QR to S3
8. Backend saves pass to MongoDB
9. Backend returns pass to React
10. React displays pass card with QR code
11. User sees their pass ✅
```

### Step 4: Deploy to AWS
```
1. Backend runs on EC2 instance
2. Frontend files on S3 (served by CloudFront)
3. Both connect to MongoDB Atlas
4. User accesses via your domain

Flow:
Browser → CloudFront → S3 (frontend files)
Browser ← CloudFront ← React app

Browser → EC2 → MongoDB (backend)
Browser ← EC2 ← Backend API
```

---

## 🗂️ Environment Variables

### What They Do
```
.env file = Configuration storage (SECRET!)

Frontend .env:
  REACT_APP_API_URL = Where to find backend
  
Backend .env:
  PORT = What port to run on
  MONGODB_URI = Database connection (with password!)
  JWT_SECRET = Secret key for tokens (can't guess!)
  AWS_ACCESS_KEY_ID = AWS access (like username)
  AWS_SECRET_ACCESS_KEY = AWS password
  AWS_REGION = Which AWS region to use
  AWS_S3_BUCKET = Name of S3 bucket
```

### Why Secret?
```
.env contains:
  ✓ Database password
  ✓ AWS credentials
  ✓ Secret keys
  
If someone gets .env:
  ✗ They can access your database
  ✗ They can access your AWS
  ✗ They can hack your app
  
Solution:
  ✓ Never commit .env to Git
  ✓ Add to .gitignore
  ✓ Only store on your computer
  ✓ On server, create new .env with DIFFERENT credentials
```

---

## 🚀 Deployment Architecture

### Local (Your Computer)
```
Your Computer
├── Backend (port 5000)
├── Frontend (port 3000)
├── MongoDB (cloud connection)
└── .env file (secret!)
```

### Production (AWS)
```
Internet Users
    │
    ├──► CloudFront CDN ──► S3 Bucket
    │    (Frontend)       (React files)
    │
    └──► Route 53 DNS ──► EC2 Instance
         (Domain)         (Backend)
                           │
                           └──► MongoDB Atlas
                                (Database)
```

---

## 💾 Data Storage Locations

```
Stored on Your Computer:
  • .env file (credentials)
  • node_modules/ (code libraries)
  • Source code files

Stored on MongoDB Atlas:
  • User data (name, email, password hash)
  • Bus data
  • Pass data
  • Bookings
  • Routes

Stored on AWS S3:
  • QR code images
  • Profile pictures
  • Documents
  • Frontend files (if hosted on S3)

Stored on AWS EC2:
  • Node.js backend code
  • Running application

Stored in Browser:
  • JWT token (in localStorage)
  • User session
  • Cookies
```

---

## 🔄 Typical User Journey

```
1. User visits app
   ↓
2. Browser loads React app from S3/CloudFront
   ↓
3. React shows Login page
   ↓
4. User enters email/password
   ↓
5. React sends to Backend on EC2
   ↓
6. Backend queries MongoDB for user
   ↓
7. Backend compares passwords
   ↓
8. If correct, Backend sends JWT token
   ↓
9. React saves token in browser storage
   ↓
10. React redirects to Dashboard
    ↓
11. User clicks "Buy Pass"
    ↓
12. React sends request to Backend with token
    ↓
13. Backend validates token
    ↓
14. Backend creates pass in MongoDB
    ↓
15. Backend generates QR code
    ↓
16. Backend uploads QR to S3
    ↓
17. Backend returns pass to React
    ↓
18. React displays pass card with QR
    ↓
19. User sees pass and downloads/shares QR ✅
```

---

## 📊 System Components Summary

| Component | What It Is | Why We Need It |
|-----------|-----------|----------------|
| React | Frontend library | Build user interface |
| Node.js | Backend runtime | Run server code |
| Express | Web framework | Build API endpoints |
| MongoDB | Database | Store user data |
| JWT | Auth tokens | Know who's logged in |
| AWS EC2 | Virtual computer | Host backend |
| AWS S3 | File storage | Store QR codes, images |
| AWS CloudFront | CDN | Serve frontend fast |
| .env | Config storage | Keep secrets safe |
| Docker | Container | Easy deployment |

---

## 📈 Scalability

### As you grow:
```
Stage 1 (Development)
  1 EC2 instance
  1 MongoDB instance
  No caching
  No CDN

Stage 2 (Growing)
  2-3 EC2 instances
  Load Balancer
  Read replicas for MongoDB
  CloudFront CDN
  Redis caching

Stage 3 (Production)
  Auto Scaling Groups (5-10 instances)
  Application Load Balancer
  Multi-region MongoDB
  CloudFront worldwide
  ElastiCache (Redis)
  RDS or managed MongoDB
  CloudWatch monitoring
```

---

## 🎯 Everything You Learned

You now understand:

✅ Frontend (React) - user interface
✅ Backend (Node.js) - business logic
✅ Database (MongoDB) - data storage
✅ API communication - how pieces talk
✅ Authentication - JWT tokens
✅ Cloud services - AWS infrastructure
✅ Security - .env, credentials, encryption
✅ Deployment - how to go live
✅ Architecture - how everything connects

**Congratulations!** 🎉

---

**For detailed setup, follow:** [QUICK_START.md](QUICK_START.md)
