# AWS Setup Guide (For Beginners)

## What is AWS and Why Do We Need It?

AWS = Amazon Web Services - a cloud platform that provides:
- **EC2**: Virtual computers to run your backend
- **S3**: File storage (for QR codes, images, documents)
- **CloudFront**: CDN to serve your frontend faster

For the bus pass system, we'll use:
1. **S3** - Store QR codes, documents, images
2. **EC2** - Host the backend server (Node.js)
3. **CloudFront** - Serve frontend files faster globally

## Creating AWS Account

### Step 1: Create Account

1. Go to https://aws.amazon.com/
2. Click **"Create an AWS Account"** (top right)
3. Enter:
   - Email address
   - AWS account name (e.g., "buspass-project")
   - Password
4. Click **"Verify email address"** and follow link in email
5. Fill in personal information:
   - Full name
   - Address
   - Phone number
   - Country
6. Enter credit card (required but won't charge for free tier)
7. Choose **"Personal"** account type
8. Complete identity verification (phone call)

🎉 Account created!

### Step 2: Activate Free Tier

1. After login, you should see **"Welcome"** page
2. Make sure **"Free tier"** is enabled
   - Check top right: "Free tier available"
3. You get:
   - **EC2**: 750 hours/month
   - **S3**: 5 GB storage
   - **CloudFront**: 50 GB/month
   - Free for 12 months!

## Understanding IAM (Identity & Access Management)

Before using AWS, create an IAM user (don't use root account for daily work).

### Step 1: Create IAM User

1. Search for **"IAM"** in AWS search bar (top)
2. Click **"Users"** in left sidebar
3. Click **"Create User"** button
4. Enter name: `buspass-dev` (or similar)
5. Check **"Provide user access to AWS Management Console"**
6. Click **"Next"**

### Step 2: Set Permissions

1. Select **"Attach policies directly"**
2. Search and select:
   - ✓ `AmazonS3FullAccess`
   - ✓ `AmazonEC2FullAccess`
   - ✓ `CloudFrontFullAccess`
3. Click **"Next"** → **"Create User"**

### Step 3: Get Access Keys

Now create keys to use in your code:

1. Click on the user you just created
2. Go to **"Security Credentials"** tab
3. Click **"Create access key"**
4. Choose **"Application running outside AWS"**
5. Click **"Next"**
6. Click **"Create access key"**

📝 **SAVE THIS!** You'll see:
- `Access key ID`: Like a username
- `Secret access key`: Like a password

**Download the CSV file - you won't see these again!**

---

## Part 1: Setting Up S3 (File Storage)

### Step 1: Create S3 Bucket

1. Search for **"S3"** in AWS search bar
2. Click **"Create bucket"** button
3. Enter bucket name:
   - Must be globally unique
   - Try: `buspass-files-yourname-2026`
   - Allowed: lowercase, numbers, hyphens
4. Choose region: Pick closest to you
5. Click **"Create bucket"**

✅ Bucket created!

### Step 2: Allow Public Access (for QR codes)

1. Click your bucket name to open it
2. Click **"Permissions"** tab
3. Scroll down to **"Block public access"**
4. Click **"Edit"**
5. Uncheck **"Block all public access"**
6. Check the confirmation box
7. Click **"Save changes"**

⚠️ **Warning**: Only QR codes are public. User data stays private.

### Step 3: Configure CORS

This allows your React app to access S3 files:

1. Still in **Permissions** tab
2. Scroll to **"CORS"**
3. Click **"Edit"**
4. Paste this:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

5. Click **"Save changes"**

### Step 4: Update Backend `.env`

Add these to your backend `.env`:

```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_S3_BUCKET=buspass-files-yourname-2026
```

Replace with your actual values from IAM.

---

## Part 2: Setting Up EC2 (Backend Server)

EC2 is like renting a virtual computer in AWS to run your Node.js server.

### Step 1: Launch EC2 Instance

1. Search **"EC2"** in AWS search bar
2. Click **"Instances"** in left sidebar
3. Click **"Launch Instances"** button

### Step 2: Configure Instance

1. **Name**: `buspass-backend`

2. **OS Image**: Select **"Ubuntu"**
   - Edition: **"Ubuntu Server 24.04 LTS free tier eligible"**

3. **Instance Type**: Select **"t2.micro"** (free tier)

4. **Key Pair**:
   - Click **"Create new key pair"**
   - Name: `buspass-key`
   - Format: **"pem"** (for Mac/Linux) or **"ppk"** (for Windows PuTTY)
   - Click **"Create key pair"**
   
   📝 Save this file! You'll need it to connect to server.

5. **Network Settings**:
   - VPC: Keep default
   - Subnet: Keep default
   - Auto-assign public IP: **Enable**

6. **Firewall (Security Group)**:
   - Click **"Create security group"**
   - Name: `buspass-sg`
   - Add these rules:
   
   | Type | Port | Source |
   |------|------|--------|
   | SSH | 22 | My IP |
   | HTTP | 80 | 0.0.0.0/0 |
   | HTTPS | 443 | 0.0.0.0/0 |
   | Custom TCP | 5000 | 0.0.0.0/0 |

7. **Storage**: Keep 20 GB (default)

8. Click **"Launch Instance"**

⏳ Wait 2-3 minutes for instance to start.

### Step 3: Connect to Your Server

#### For Windows (Using PuTTY - Easiest):

1. Download PuTTY: https://www.putty.org/
2. Open PuTTY and enter:
   - **Host Name**: `ubuntu@your-instance-public-ip` (for Ubuntu) or `ec2-user@your-instance-public-ip` (for Amazon Linux)
   - **Port**: 22
3. Go to **Connection → SSH → Auth**
4. Browse and select your `.pem` key file
5. Click **"Open"**

#### For Windows (Using PowerShell):

```powershell
# Navigate to where you saved your key
cd Downloads

# Connect to your server
ssh -i buspass-key.pem ubuntu@your-instance-public-ip
```

Replace `your-instance-public-ip` with actual IP (find in EC2 console).

#### For Mac/Linux:

```bash
# Make key readable
chmod 400 buspass-key.pem

# Connect
ssh -i buspass-key.pem ubuntu@your-instance-public-ip
```

### Step 4: Setup Node.js on Server

Once connected via SSH, run these commands:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
sudo apt install -y nodejs npm

# Verify installation
node -v
npm -v
```

### Step 5: Deploy Your Backend

```bash
# Clone your project (or upload files)
git clone https://github.com/yourname/bus-pass-system.git
cd bus-pass-system/backend

# Install dependencies
npm install

# Create .env file
sudo nano .env
```

Paste your environment variables, then press `Ctrl+O`, `Enter`, `Ctrl+X`.

```bash
# Start server
npm run dev
```

If you see: `Server running on port 5000` ✅ Success!

### Step 6: Keep Server Running (PM2)

Terminal will close when you disconnect. Use PM2 to keep it running:

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start your app with PM2
pm2 start server.js --name "buspass-api"

# Make it autostart
pm2 startup
pm2 save

# View logs
pm2 logs buspass-api
```

---

## Part 3: Setting Up CloudFront (Frontend CDN)

CloudFront serves your React app from servers near your users (faster!).

### Step 1: Build React App

On your local computer:

```powershell
cd frontend
npm run build
```

This creates a `build/` folder with optimized files.

### Step 2: Create S3 Bucket for Frontend

1. Go to S3 in AWS
2. Click **"Create bucket"**
3. Name: `buspass-frontend-yourname-2026`
4. Click **"Create bucket"**

### Step 3: Upload Files

```powershell
# Install AWS CLI if not already
# Download from: https://aws.amazon.com/cli/

# Configure with your IAM credentials
aws configure
# Enter: Access Key ID, Secret Access Key, region

# Upload files
cd frontend/build
aws s3 cp . s3://buspass-frontend-yourname-2026 --recursive --acl public-read
```

### Step 4: Create CloudFront Distribution

1. Search **"CloudFront"** in AWS
2. Click **"Create distribution"**
3. Under **"Origin domain"**, select your S3 bucket
4. **Viewer protocol policy**: Redirect HTTP to HTTPS
5. **Compress objects automatically**: Yes
6. **Default root object**: index.html
7. Click **"Create distribution"**

⏳ Wait 15-20 minutes for deployment.

Once done, you'll get a URL like: `d123abc.cloudfront.net`

---

## Updating Your `.env` Files

### Backend (in EC2):

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/buspass
JWT_SECRET=your_random_secret_here
NODE_ENV=production

AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=wJal...
AWS_REGION=us-east-1
AWS_S3_BUCKET=buspass-files-yourname-2026
```

### Frontend (build before deployment):

```env
REACT_APP_API_URL=http://your-ec2-public-ip:5000/api
```

---

## Getting Your Server IP

1. Go to EC2 Console
2. Click **Instances**
3. Select your instance
4. Look for **"Public IPv4 address"**

This is your `your-instance-public-ip`

---

## Estimated Monthly Cost (Free Tier)

| Service | Free Tier |
|---------|-----------|
| EC2 | 750 hours/month (always free) |
| S3 | 5 GB/month |
| CloudFront | 50 GB/month |
| Data transfer out | 100 GB/month |
| **Total** | **$0** (first 12 months) |

After free tier: ~$15-30/month for small projects.

---

## Security Checklist ⚠️

- ✅ Store credentials in `.env` (never in code)
- ✅ Don't commit `.env` to Git
- ✅ Use strong passwords/secrets
- ✅ Whitelist your IP for SSH (Security Group)
- ✅ Enable MFA on AWS account
- ✅ Rotate IAM keys quarterly
- ✅ Use HTTPS in production
- ✅ Keep instances updated

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect to EC2 | Check security group allows SSH from your IP |
| 404 errors on S3 | Check bucket is public and CORS is configured |
| Node app won't start | Check `npm install` ran and .env is correct |
| CloudFront shows old files | Clear CloudFront cache in console |

---

## Next Steps

✅ AWS is set up!

Now you can:
1. Deploy your backend to EC2
2. Upload frontend to S3 with CloudFront
3. Test the complete app
4. Set up custom domain (Route 53)
5. Enable HTTPS (AWS Certificate Manager)

---

**Congratulations! Your cloud infrastructure is ready!** 🚀
