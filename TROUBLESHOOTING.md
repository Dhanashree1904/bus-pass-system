# Troubleshooting Guide

When something goes wrong, check this guide first!

---

## MongoDB Issues

### Error: "Failed to connect to MongoDB"

**Symptoms:**
```
MongooseError: Failed to connect to MongoDB
```

**Solutions (try in order):**

1. **Check connection string in `.env`**
   ```powershell
   # Open backend/.env
   # Should look like:
   MONGODB_URI=mongodb+srv://admin:Buspass123456@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - ✓ Username and password correct?
   - ✓ Cluster name included?
   - ✓ No special characters not encoded?

2. **Check MongoDB Atlas whitelist**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click your cluster
   - Go to "Security" → "Network Access"
   - Check if your IP is listed
   - **Solution**: Click "Add IP Address" → "Allow Access from Anywhere"

3. **Check database user exists**
   - MongoDB Atlas → "Security" → "Database Access"
   - Click user → Verify username matches `.env`
   - If password is wrong, reset it

4. **Check internet connection**
   ```powershell
   ping google.com
   ```

5. **Try from different network**
   - Sometimes ISP blocks MongoDB ports
   - Try mobile hotspot or different WiFi

**Still not working?**
- Delete and recreate cluster (takes 5 minutes)
- Create new database user with simpler password
- Contact MongoDB support

---

### Error: "Authentication Failed"

**Symptoms:**
```
Failed to connect: Authentication failed
```

**Solutions:**

1. **Password has special characters?**
   - If password is: `Pass@word#123`
   - URL must have encoded: `Pass%40word%23123`
   - **Use MongoDB's "Copy" button** - it auto-encodes!

2. **Wrong username/password**
   ```powershell
   # Check in MongoDB Atlas
   # Security → Database Access
   # Click "Edit" on user to see username
   ```

3. **Password has been reset**
   - Go to MongoDB Atlas
   - Security → Database Access
   - Click user → "Edit Password"
   - Copy new connection string

---

### Error: "IP 111.222.333.444 is not whitelisted"

**Solution:**
1. Go to MongoDB Atlas
2. Security → Network Access
3. Click "Add IP Address"
4. Either:
   - Add your specific IP (find at: https://whatismyipaddress.com/)
   - OR "Allow Access from Anywhere" (easier for development)
5. Click "Confirm"
6. Wait 5-10 seconds
7. Try again

---

### MongoDB Atlas dashboard shows no data

**Solutions:**

1. **Check correct database**
   - Click "Browse Collections"
   - Top dropdown should show: `buspass` → `users`
   - If not, create database:
     - Click "Create Database"
     - Name: `buspass`
     - Collection: `users`

2. **Create test data**
   ```powershell
   # From your computer, test API
   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" `
     -Method POST `
     -ContentType "application/json" `
     -Body '{"name":"Test","email":"test@test.com","password":"test123","phone":"1234567890"}'
   ```
   - Then check MongoDB Atlas again

---

## Backend Issues

### Error: "Port 5000 already in use"

**Symptoms:**
```
listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

1. **Find process using port 5000**
   ```powershell
   netstat -ano | findstr :5000
   ```

2. **Kill the process**
   ```powershell
   # Replace XXXX with PID from above
   taskkill /PID XXXX /F
   ```

3. **Or use different port**
   ```powershell
   # In backend/.env, change:
   PORT=5001
   ```

---

### Error: "Cannot find module 'express'"

**Symptoms:**
```
Error: Cannot find module 'express'
```

**Solutions:**

1. **Install dependencies**
   ```powershell
   cd backend
   npm install
   ```

2. **Check package.json exists**
   ```powershell
   ls backend/package.json
   # Should exist
   ```

3. **Delete node_modules and reinstall**
   ```powershell
   cd backend
   rm -r node_modules
   npm install
   ```

---

### Backend starts but won't accept connections

**Symptoms:**
```
Server running on port 5000
# But can't access it
```

**Solutions:**

1. **Test localhost**
   ```powershell
   # In another PowerShell
   Invoke-RestMethod http://localhost:5000
   ```

2. **Check server is actually listening**
   ```powershell
   netstat -ano | findstr :5000
   # Should show a process listening
   ```

3. **Check no errors in backend logs**
   - Look for red text when `npm run dev` started
   - Scroll up to see any errors

4. **Try health endpoint**
   ```powershell
   curl http://localhost:5000/health
   # Should return: {"status":"OK"}
   ```

---

### Error: "ReferenceError: variable is not defined"

**Example:**
```
ReferenceError: process is not defined
```

**Solutions:**

1. **Check .env is loaded**
   - First line in `server.js` should be:
   ```javascript
   require("dotenv").config();
   ```

2. **Check .env file exists**
   ```powershell
   ls backend/.env
   # Should exist
   ```

3. **Check .env syntax**
   ```
   # CORRECT:
   MONGODB_URI=mongodb+srv://...
   
   # WRONG:
   MONGODB_URI = mongodb+srv://...  # spaces around =
   ```

---

## Frontend Issues

### Frontend won't start: "Port 3000 already in use"

**Solutions:**

1. **Kill process using port 3000**
   ```powershell
   netstat -ano | findstr :3000
   taskkill /PID XXXX /F
   ```

2. **Or use different port**
   ```powershell
   cd frontend
   set PORT=3001
   npm start
   ```

---

### Error: "Cannot find module 'react'"

**Solutions:**

```powershell
cd frontend
npm install
```

---

### Frontend loads but shows blank page

**Symptoms:**
- http://localhost:3000 opens but nothing displays
- No errors in console

**Solutions:**

1. **Check browser console for errors**
   - Right-click → "Inspect"
   - Click "Console" tab
   - Look for red errors
   - Report the error

2. **Check React is loading**
   - Right-click → "Inspect" → "Elements"
   - Should see `<div id="root"></div>` with content

3. **Restart frontend**
   ```powershell
   # Stop: Ctrl+C
   # Clear cache
   rm -r node_modules
   npm install
   npm start
   ```

---

### "CORS error" or "Failed to fetch from API"

**Symptoms:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/...'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**

1. **Check backend is running**
   ```powershell
   # Test in PowerShell
   Invoke-RestMethod http://localhost:5000
   ```

2. **Check frontend `.env` has correct API URL**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Restart frontend after changing `.env`**
   - Stop: `Ctrl+C`
   - Start: `npm start`

4. **Check CORS is enabled in backend**
   - In `server.js`, should have:
   ```javascript
   app.use(cors());
   ```

---

### Login/Register doesn't work

**Symptoms:**
- Form submits but nothing happens
- Page doesn't redirect
- No error message

**Solutions:**

1. **Check backend is running**
   ```powershell
   # See "Backend Issues" section
   ```

2. **Check API URL in frontend `.env`**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Check error in browser console**
   - Right-click → Inspect → Console
   - Look for error messages
   - Google the error

4. **Test API directly**
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
     -Method POST `
     -ContentType "application/json" `
     -Body '{"email":"john@test.com","password":"password123"}'
   ```

5. **Check MongoDB has user data**
   - MongoDB Atlas → Browse Collections
   - Check `users` collection has data
   - If empty, register new user

---

## AWS Issues

### "InvalidClientTokenId" when running AWS commands

**Symptoms:**
```
InvalidClientTokenId: The security token included in the request is invalid
```

**Solutions:**

1. **Check credentials in `.env`**
   ```powershell
   cat backend/.env | grep AWS
   ```

2. **Verify Access Key ID is correct**
   - Compare with CSV file you downloaded

3. **Verify Secret Access Key is correct**
   - Compare with CSV file

4. **Create new access keys**
   ```powershell
   # AWS Console → IAM → Users → Your user → Security Credentials
   # Create new access key
   # Download CSV
   # Update .env with new credentials
   ```

5. **Check IAM user has S3 permissions**
   - AWS Console → IAM → Users
   - Click your user
   - Check "AmazonS3FullAccess" is attached

---

### EC2 SSH won't connect

**Symptoms:**
```
ssh: connect to host 54.123.45.67 port 22: Connection timed out
```

**Solutions:**

1. **Check EC2 instance is running**
   - AWS Console → EC2 → Instances
   - Should show "Running" status

2. **Check security group allows SSH**
   - AWS Console → EC2 → Security Groups
   - Click your security group
   - Should have rule: Type=SSH, Port=22, Source=Your IP

3. **Check your IP**
   - Go to: https://whatismyipaddress.com/
   - Add that IP to security group rule

4. **Check key file exists**
   ```powershell
   ls buspass-key.pem
   # Should exist
   ```

5. **Recreate security group**
   - Delete old one
   - Create new with SSH rule
   - Relaunch EC2 instance

---

### S3 bucket says "403 Forbidden"

**Symptoms:**
```
Access Denied
The bucket you are attempting to access must be addressed using the specified endpoint
```

**Solutions:**

1. **Check bucket is public**
   - AWS Console → S3
   - Click bucket
   - Permissions tab
   - Edit "Block public access"
   - Uncheck all boxes

2. **Check bucket policy**
   - Permissions tab → Bucket Policy
   - Should allow public read

3. **Create correct policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket/*"
       }
     ]
   }
   ```

---

### CloudFront says "504 Gateway Timeout"

**Symptoms:**
```
CloudFront Error: 504 Gateway Timeout
```

**Solutions:**

1. **Wait longer**
   - CloudFront deployment takes 15-30 minutes
   - Keep refreshing every 5 minutes

2. **Check S3 bucket**
   - CloudFront → Distributions
   - Click your distribution
   - Check "Origin" is correct S3 bucket

3. **Check index.html exists**
   ```powershell
   aws s3 ls s3://your-bucket/
   # Should show index.html
   ```

---

## General Debugging Tips

### Enable debug mode

**Backend:**
```env
NODE_ENV=development
DEBUG=*
```

Then in terminal:
```powershell
$env:DEBUG="*"
npm run dev
```

### Check logs

```powershell
# Backend logs (already showing)
npm run dev

# MongoDB logs
# Go to MongoDB Atlas → Metrics

# AWS logs
# AWS Console → CloudWatch → Logs
```

### Restart everything

```powershell
# Stop backend: Ctrl+C

# Stop frontend: Ctrl+C

# Restart backend
cd backend
npm run dev

# Restart frontend (new terminal)
cd frontend
npm start
```

---

## When All Else Fails

1. **Search Google**
   - Copy full error message
   - Search: `"error message" node.js mongodb`

2. **Check Stack Overflow**
   - Search error + technology
   - Usually someone had same issue

3. **Check official docs**
   - MongoDB: https://docs.mongodb.com/
   - AWS: https://docs.aws.amazon.com/
   - Express: https://expressjs.com/

4. **Recreate from scratch**
   - Delete node_modules
   - Delete package-lock.json
   - Run `npm install`
   - Try again

5. **Ask for help**
   - Include error message
   - Include what you were doing
   - Include steps to reproduce
   - Include OS and versions

---

## Preventing Issues

✅ **Best Practices:**

- Always commit `.gitignore` to exclude `.env`
- Keep separate `.env` files for dev/prod
- Backup your `buspass-key.pem` file
- Document changes as you make them
- Test before deploying
- Keep MongoDB credentials safe
- Rotate AWS keys monthly
- Monitor AWS costs

---

**Couldn't find your issue?**

Check:
1. Individual setup files: [MONGODB_SETUP.md](MONGODB_SETUP.md), [AWS_SETUP.md](AWS_SETUP.md)
2. Full deployment guide: [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md)
3. Quick start: [QUICK_START.md](QUICK_START.md)

If still stuck, create detailed issue report with:
- Full error message
- What you were doing
- OS (Windows/Mac/Linux)
- Node version: `node -v`
- npm version: `npm -v`
