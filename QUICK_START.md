# Quick Start - From Zero to Deployment

**Estimated time: 3-4 hours**

This guide takes you through EVERYTHING from installing to having a working cloud app.

## 🚀 Part 1: Get Your Credentials Ready

### Create MongoDB Connection String (15 minutes)

**What to do:**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Sign Up" → Create account with email
3. Verify email
4. Create FREE cluster (M0)
5. Create database user:
   - Username: `admin`
   - Password: `Buspass123456`
6. Allow all IPs in Network Access
7. Copy connection string

**You should have:**
```
mongodb+srv://admin:Buspass123456@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Copy to notepad → You'll need this!**

### Create AWS Account (30 minutes)

**What to do:**
1. Go to: https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Use email, password, credit card
4. Complete verification
5. Create IAM user (`buspass-dev`)
6. Generate access keys
7. Download CSV with keys

**You should have:**
```
Access Key ID: AKIAIOSFODNN7EXAMPLE
Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

**Save to notepad → Never share these!**

---

## 💾 Part 2: Update Your Backend Config

**File:** `backend/.env`

**Replace entire file with:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://admin:Buspass123456@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# JWT
JWT_SECRET=ThisIsMySecretKeyForJWT12345ChangeMe
JWT_EXPIRE=7d

# AWS (you'll fill these after creating S3)
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=buspass-files-123456

# Stripe (not needed yet)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx

# Email (not needed yet)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

**Replace these parts:**
- `cluster0.xxxxx` → Your actual MongoDB cluster name
- `AKIAIOSFODNN7EXAMPLE` → Your AWS Access Key
- `wJalrXUtnFEMI/K7...` → Your AWS Secret Key

---

## 🧪 Part 3: Test Locally First

### Start MongoDB
1. Verify MongoDB URI is correct in `.env`

### Start Backend

```powershell
# Open PowerShell in backend folder
cd c:\Users\admin\MYPROJECTS\bus-pass-system\backend

# Start server
npm run dev
```

**You should see:**
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
Environment: development
```

✅ **If you see this, MongoDB works!**

### Test API (Open new PowerShell)

```powershell
# Test 1: Register user
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"John Doe","email":"john@test.com","password":"password123","phone":"1234567890"}'

$response | ConvertTo-Json

# Copy the token from response
```

**Expected response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@test.com",
    "phone": "1234567890",
    "role": "user"
  }
}
```

```powershell
# Test 2: Login
$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"john@test.com","password":"password123"}'

$token = $loginResponse.token
echo "Token: $token"
```

```powershell
# Test 3: Create pass (use token from login)
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$passResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/passes" `
  -Method POST `
  -Headers $headers `
  -Body '{"passType":"daily","routes":[]}'

$passResponse | ConvertTo-Json
```

✅ **If all tests work, backend is ready!**

---

## 🎨 Part 4: Start Frontend

### Update Frontend `.env`

**File:** `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Start React

```powershell
# In new PowerShell window
cd c:\Users\admin\MYPROJECTS\bus-pass-system\frontend

npm start
```

**Browser opens automatically** to http://localhost:3000

✅ **You should see Login page**

### Test Frontend

1. Click **"Register"**
2. Fill in form:
   - Name: John Doe
   - Email: john2@test.com
   - Password: password123
   - Phone: 9876543210
3. Click **"Register"**

✅ **You should be logged in to Dashboard!**

### Test Pass Purchase

1. Select **"Daily - $50"**
2. Click **"Purchase Pass"**
3. You should see a pass card with QR code!

🎉 **Your app works!**

---

## ☁️ Part 5: Deploy to AWS

### Step 1: Create S3 Bucket for Files

```powershell
# Use AWS CLI or AWS Console
# Go to: https://console.aws.amazon.com/s3/

# Create bucket named: buspass-files-123456

# Then update backend/.env:
AWS_S3_BUCKET=buspass-files-123456
```

### Step 2: Deploy Backend to EC2

```powershell
# 1. Launch EC2 (Ubuntu 24.04, t2.micro)
#    - Save key pair as: buspass-key.pem
#    - Allow ports: 22, 80, 443, 5000

# 2. Connect via SSH
ssh -i buspass-key.pem ubuntu@your-ec2-ip

# 3. Install Node.js
sudo apt update && sudo apt install -y nodejs npm git

# 4. Clone your code (if in GitHub)
git clone https://github.com/yourname/bus-pass-system.git
cd bus-pass-system/backend

# OR upload your files manually

# 5. Install dependencies
npm install

# 6. Create .env on server
nano .env
# Paste your .env content
# Press Ctrl+O, Enter, Ctrl+X

# 7. Install PM2
sudo npm install -g pm2

# 8. Start app
pm2 start server.js --name "buspass-api"
pm2 startup
pm2 save

# 9. Check it's running
pm2 logs
```

✅ **Backend is live on AWS!**

### Step 3: Get Your EC2 IP

In AWS Console → EC2 → Instances → Copy "Public IPv4"

Example: `54.123.45.67`

### Step 4: Update Frontend API URL

**File:** `frontend/.env`

```env
REACT_APP_API_URL=http://54.123.45.67:5000/api
```

### Step 5: Deploy Frontend to S3

```powershell
# In frontend folder
cd c:\Users\admin\MYPROJECTS\bus-pass-system\frontend

# Build
npm run build

# Configure AWS CLI
aws configure
# Enter: Your Access Key ID
#        Your Secret Access Key
#        Region: us-east-1

# Upload
aws s3 sync build/ s3://buspass-files-123456/frontend --delete --acl public-read
```

### Step 6: Create CloudFront

1. Go to CloudFront in AWS Console
2. Create Distribution
3. Origin: S3 bucket
4. Default root: index.html
5. Click Create

⏳ **Wait 20 minutes for CloudFront to deploy**

✅ **Your app is live on cloud!**

---

## 🔧 Common Issues & Quick Fixes

### Backend won't start

```powershell
# Check MongoDB connection
npm run dev

# See error message, check:
# 1. MONGODB_URI is correct
# 2. Username/password correct
# 3. IP whitelisted in MongoDB Atlas
```

### Frontend can't connect to backend

```powershell
# Check .env file
cat frontend/.env

# Should show correct API URL
# Test manually:
# Open http://localhost:5000/health

# Should return: { "status": "OK" }
```

### AWS credentials not working

```powershell
# Check credentials
cat backend/.env | grep AWS

# Verify in AWS IAM:
# - User has S3 access
# - Keys are active
# - Region is correct
```

### Can't SSH to EC2

```bash
# Check security group allows SSH from your IP
# AWS Console → EC2 → Security Groups
# Add rule: SSH, Port 22, From YOUR IP

# Verify key file exists
ls buspass-key.pem

# Verify permissions (Linux/Mac)
chmod 400 buspass-key.pem

# Try again
ssh -i buspass-key.pem ubuntu@your-ip
```

---

## ✅ Success Checklist

After completing all steps, check:

- [ ] Backend starts without errors
- [ ] Frontend loads without errors
- [ ] Can register and login
- [ ] Can purchase pass
- [ ] QR code displays
- [ ] Data appears in MongoDB Atlas
- [ ] EC2 instance is running
- [ ] Files in S3 bucket
- [ ] CloudFront distribution is live

🎉 **If all checked: Your cloud app is ready!**

---

## 📞 Support

| Issue | Check |
|-------|-------|
| MongoDB error | [MONGODB_SETUP.md](MONGODB_SETUP.md) - Step 7 |
| AWS error | [AWS_SETUP.md](AWS_SETUP.md) |
| Backend not starting | Backend section above |
| Frontend not connecting | Frontend section above |
| Deployment issues | [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md) |

---

## Next Steps

Once your app is live:

1. **Add more features**:
   - Bus management
   - Booking system
   - Admin dashboard
   - Payments

2. **Improve security**:
   - Enable HTTPS
   - Add rate limiting
   - Add input validation

3. **Scale up**:
   - Add load balancer
   - Database replicas
   - CDN optimization

4. **Monitor**:
   - CloudWatch alerts
   - Database backups
   - Error tracking

---

**You did it! You have a cloud-based bus pass system running!** 🚀
