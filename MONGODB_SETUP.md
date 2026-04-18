# MongoDB Atlas Setup Guide (For Beginners)

## What is MongoDB?

MongoDB is a **database** - a place to store your app's data (users, bus passes, bookings, etc.). 
MongoDB Atlas is the **cloud version** - you don't have to install anything on your computer, it runs on MongoDB's servers.

## Step-by-Step Setup

### Step 1: Create MongoDB Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Start Free"** button
3. Click **"Sign Up"** (you can use Google, GitHub, or email)
   
   ![Screenshot: MongoDB signup page]

4. Fill in details:
   - Email
   - Password (at least 8 characters)
   - First/Last name
   - Company (optional)
   - Click **"Create your Atlas account"**

5. Verify your email by clicking the link MongoDB sends

### Step 2: Create Your First Cluster

A cluster is where your data lives.

1. After login, click **"Create a Deployment"**
2. Choose **"M0 Free"** (completely free!)
   
   ![Screenshot: Select M0 free tier]

3. Click **"Create"** button
4. Choose your provider and region:
   - Provider: AWS (leave default)
   - Region: Choose closest to you (e.g., us-east-1)
   - Click **"Create Cluster"**

⏳ Wait 3-5 minutes for cluster to be created (you'll see a spinner)

### Step 3: Create Database User

This is like a username/password to access your database.

1. On the left sidebar, click **"Security" → "Database Access"**

2. Click **"Add New Database User"**

3. Fill in details:
   - **Username**: `buspass_user` (or any name)
   - **Password**: Generate a strong one or create: `Buspass123!@#`
   - **Built-in Role**: Select **"Atlas admin"**
   
4. Click **"Add User"**

📝 **SAVE YOUR PASSWORD** - You'll need it!

### Step 4: Allow Network Access

MongoDB needs to know which computers can connect to it.

1. Still in **Security** section, click **"Network Access"**

2. Click **"Add IP Address"**

3. Click **"Allow Access from Anywhere"** (for development only!)
   - This adds `0.0.0.0/0`
   
4. Click **"Confirm"**

⚠️ **Note**: For production, you'd whitelist specific IPs. For now, this is fine for development.

### Step 5: Get Connection String

This is the URL you'll use to connect to your database.

1. Go back to **"Clusters"** (click the MongoDB logo or in sidebar)

2. Click the **"Connect"** button on your cluster

3. Select **"Drivers"** (it might already be selected)

4. Choose:
   - Driver: **Node.js**
   - Version: **3.12 or later** (leave as is)

5. You'll see a connection string like:
   ```
   mongodb+srv://buspass_user:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. Copy this string and replace:
   - `PASSWORD` with the password you created
   - Keep everything else the same

### Step 6: Create Database & Collection

1. Click **"Browse Collections"** button

2. Click **"Create Database"**

3. Enter:
   - **Database name**: `buspass`
   - **Collection name**: `users` (create first collection)

4. Click **"Create"**

🎉 Your database is ready!

### Step 7: Update Your `.env` File

Now update your backend `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://buspass_user:Buspass123!@#@cluster0.xxxxx.mongodb.net/buspass?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_12345
JWT_EXPIRE=7d
```

Replace:
- `buspass_user` with your database user
- `Buspass123!@#` with your password
- `cluster0.xxxxx` with your actual cluster name
- `JWT_SECRET` with any random string

### Testing Connection

Once you've updated `.env`, start your backend:

```powershell
cd backend
npm run dev
```

You should see in the terminal:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
Server running on port 5000
```

If you see a connection error, check:
- ✓ Username/password are correct
- ✓ IP is whitelisted (check Network Access)
- ✓ Connection string is copied correctly
- ✓ `.env` file has correct MongoDB_URI

## MongoDB Atlas Dashboard Features

### Collections
- Click **"Browse Collections"** to see your data
- View all users, passes, bookings in a nice interface
- You can manually add/edit/delete data here for testing

### Metrics
- Click **"Metrics"** to see database performance
- Storage used, operations per second, etc.

### Backups
- Click **"Backup"** to backup your data
- Automatic backups happen daily on free tier

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Connection timeout | Check Network Access - whitelist your IP |
| Authentication failed | Verify username/password in .env |
| Database not found | Create the database first in MongoDB Atlas |
| IP whitelisted but can't connect | Wait 5-10 minutes after whitelisting |

## Important Security Tips ⚠️

1. **Never share your connection string** - it has your password!
2. **Don't commit `.env` to Git** - add it to `.gitignore`
3. **Use strong passwords** - MongoDB scans for breaches
4. **For production**: Create restricted users, not "Atlas admin"
5. **Keep free tier** - sufficient for learning and testing

## Next Steps

✅ MongoDB is set up!

Now you can:
1. Test connection (run `npm run dev`)
2. Create test users using Postman or cURL
3. View data in MongoDB Atlas dashboard
4. Set up AWS (see AWS_SETUP.md)

## Need Help?

- MongoDB Atlas Status: https://status.mongodb.com/
- Common Issues: https://docs.mongodb.com/manual/faq/
- Support: https://support.mongodb.com/

---

**Remember**: Your free MongoDB Atlas cluster includes:
- 512 MB storage
- Shared cluster (shared resources)
- Automatic backups
- Monitoring & alerts
- Free forever (if you stay in free tier limits)
