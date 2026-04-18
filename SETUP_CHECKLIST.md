# Complete Setup Checklist

Use this checklist to track your progress through the entire setup process.

## Phase 1: Local Development Setup ✅

- [x] Node.js installed
- [x] Backend folder structure created
- [x] Frontend folder structure created
- [x] Both package.json files created
- [x] Dependencies installed
- [x] .env files created

**Status**: ✅ Complete

---

## Phase 2: MongoDB Setup

### Account & Cluster
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create free M0 cluster
- [ ] Wait for cluster to be created (3-5 minutes)

### Database Access
- [ ] Create database user (username: `buspass_user` or custom)
- [ ] Save your password somewhere safe
- [ ] Assign "Atlas admin" role

### Network Access
- [ ] Add IP to whitelist
- [ ] Select "Allow access from anywhere" (for development)

### Connection & Setup
- [ ] Copy connection string
- [ ] Replace PASSWORD with your password
- [ ] Create database: `buspass`
- [ ] Create collection: `users`
- [ ] Update backend `.env` with connection string

### Testing
- [ ] Start backend: `npm run dev` in backend folder
- [ ] Check for "MongoDB Connected" message
- [ ] Verify in MongoDB Atlas "Browse Collections"

**Status**: ⏳ To Do

**Resources**:
- Follow: [MONGODB_SETUP.md](MONGODB_SETUP.md)
- Link: https://www.mongodb.com/cloud/atlas

---

## Phase 3: AWS Setup

### AWS Account
- [ ] Create AWS account at https://aws.amazon.com/
- [ ] Verify email
- [ ] Add credit card
- [ ] Complete identity verification

### IAM Setup (Security)
- [ ] Create IAM user: `buspass-dev`
- [ ] Attach permissions:
  - [ ] AmazonS3FullAccess
  - [ ] AmazonEC2FullAccess
  - [ ] CloudFrontFullAccess
- [ ] Create access keys
- [ ] Download CSV file with keys
- [ ] Save Access Key ID and Secret Key

### S3 Setup (File Storage)
- [ ] Create S3 bucket: `buspass-files-yourname-2026`
- [ ] Allow public access
- [ ] Configure CORS
- [ ] Update backend `.env`:
  ```
  AWS_ACCESS_KEY_ID=your_key
  AWS_SECRET_ACCESS_KEY=your_secret
  AWS_REGION=us-east-1
  AWS_S3_BUCKET=buspass-files-yourname-2026
  ```

### EC2 Setup (Backend Server)
- [ ] Launch EC2 instance (t2.micro, Ubuntu 24.04)
- [ ] Create security group with ports: 22, 80, 443, 5000
- [ ] Create key pair (save `.pem` file)
- [ ] Get public IP address
- [ ] Connect via SSH/PuTTY
- [ ] Install Node.js and npm
- [ ] Clone/upload backend code
- [ ] Create `.env` file on server
- [ ] Install dependencies: `npm install`
- [ ] Install PM2: `sudo npm install -g pm2`
- [ ] Start app: `pm2 start server.js`
- [ ] Verify running: `pm2 logs`

### CloudFront Setup (Frontend CDN)
- [ ] Create S3 bucket for frontend: `buspass-frontend-yourname-2026`
- [ ] Build React app: `npm run build`
- [ ] Upload build files to S3
- [ ] Create CloudFront distribution
- [ ] Set default root object: `index.html`
- [ ] Wait for deployment (15-20 minutes)
- [ ] Get CloudFront domain name

**Status**: ⏳ To Do

**Resources**:
- Follow: [AWS_SETUP.md](AWS_SETUP.md)
- Links: 
  - https://aws.amazon.com/
  - https://console.aws.amazon.com/

---

## Phase 4: Testing & Validation

### Backend Testing
- [ ] Backend runs without errors
- [ ] MongoDB connection successful
- [ ] Test auth endpoints with Postman
- [ ] Test pass endpoints with Postman
- [ ] Server accessible on `http://localhost:5000`

### Frontend Testing
- [ ] Frontend runs: `npm start`
- [ ] Can navigate to Login/Register
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Dashboard displays correctly
- [ ] Can create bus pass
- [ ] QR code displays
- [ ] Frontend accessible on `http://localhost:3000`

### Integration Testing
- [ ] Frontend connects to backend
- [ ] Login/Register works
- [ ] Data saved to MongoDB
- [ ] Can view data in MongoDB Atlas

**Status**: ⏳ To Do

---

## Phase 5: Deployment

### Frontend Deployment
- [ ] Update `.env` with production API URL
- [ ] Build: `npm run build`
- [ ] Upload to S3
- [ ] Verify CloudFront URL works
- [ ] Test all pages on CloudFront

### Backend Deployment
- [ ] SSH into EC2
- [ ] Pull latest code
- [ ] Update `.env` for production
- [ ] Restart PM2: `pm2 restart all`
- [ ] Check logs: `pm2 logs`
- [ ] Test API endpoints

### Domain & HTTPS (Optional)
- [ ] Register domain (Route 53 or external)
- [ ] Point DNS to CloudFront
- [ ] Point DNS to EC2 (or load balancer)
- [ ] Install SSL certificate (AWS Certificate Manager)
- [ ] Update frontend API URL to HTTPS

**Status**: ⏳ To Do

---

## Phase 6: Post-Deployment

### Monitoring
- [ ] Set up CloudWatch alarms
- [ ] Enable database monitoring
- [ ] Track API usage
- [ ] Monitor costs

### Backups
- [ ] Enable MongoDB backups
- [ ] Test backup restoration
- [ ] Document recovery process

### Security
- [ ] Audit IAM permissions
- [ ] Rotate access keys
- [ ] Enable MFA on AWS
- [ ] Review security groups
- [ ] Test HTTPS/SSL

### Documentation
- [ ] Document deployment steps
- [ ] Document database schema
- [ ] Document API endpoints
- [ ] Create troubleshooting guide

**Status**: ⏳ To Do

---

## Quick Reference

### Key Resources
- Backend: `c:\Users\admin\MYPROJECTS\bus-pass-system\backend`
- Frontend: `c:\Users\admin\MYPROJECTS\bus-pass-system\frontend`
- MongoDB Docs: [MONGODB_SETUP.md](MONGODB_SETUP.md)
- AWS Docs: [AWS_SETUP.md](AWS_SETUP.md)
- Full Guide: [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md)

### Important Files
- Backend config: `backend/.env`
- Frontend config: `frontend/.env`
- Backend server: `backend/server.js`
- Frontend app: `frontend/src/App.js`

### Terminal Commands

```bash
# Backend
cd backend && npm run dev          # Start development

# Frontend
cd frontend && npm start           # Start development

# MongoDB
# Login to: https://www.mongodb.com/cloud/atlas

# AWS
# Login to: https://console.aws.amazon.com/

# EC2 SSH (Windows)
ssh -i buspass-key.pem ubuntu@your-ip

# EC2 SSH (Mac/Linux)
ssh -i buspass-key.pem ubuntu@your-ip
```

---

## Getting Help

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check [MONGODB_SETUP.md](MONGODB_SETUP.md) Step 7 |
| AWS account creation blocked | Use different email or contact AWS support |
| EC2 SSH won't connect | Check security group allows your IP |
| Frontend/Backend won't communicate | Verify `.env` API URLs |
| S3 files not accessible | Check CORS and public access settings |

---

## Success! 🎉

Once you complete all phases:
- ✅ Local development works
- ✅ MongoDB connected
- ✅ AWS infrastructure set up
- ✅ Backend deployed
- ✅ Frontend deployed
- ✅ Full app in cloud

**Next Steps**:
- Add more features
- Scale the application
- Add payment integration
- Build mobile app

**Estimated Time**: 2-3 hours for complete setup

---

**Last Updated**: April 17, 2026

**Questions?** Refer to individual setup guides or AWS/MongoDB documentation links.
