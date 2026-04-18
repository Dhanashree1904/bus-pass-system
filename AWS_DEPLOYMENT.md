# AWS Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CloudFront CDN                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
   ┌────▼─────┐                 ┌────▼──────┐
   │   S3     │                 │  API GW   │
   │(Frontend)│                 │ (ALB)     │
   └──────────┘                 └────┬──────┘
                                     │
                                ┌────▼──────┐
                                │   EC2     │
                                │  Backend  │
                                └────┬──────┘
                                     │
                          ┌──────────┴───────────┐
                          │                      │
                    ┌─────▼────┐         ┌─────▼──────┐
                    │ RDS/Mongo│         │  S3 Bucket │
                    │ (MongoDB)│         │  (Files)   │
                    └──────────┘         └────────────┘
```

## Step-by-Step Deployment

### 1. Database Setup (MongoDB Atlas)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist your IP / allow all IPs
5. Get connection string
6. Add to backend `.env`:
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/buspass
```

### 2. S3 Setup (Frontend Hosting)

```bash
# Create bucket
aws s3 mb s3://buspass-frontend-prod --region us-east-1

# Enable static website hosting
aws s3 website s3://buspass-frontend-prod/ \
  --index-document index.html \
  --error-document index.html

# Create bucket policy (allow public read)
cat > bucket-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::buspass-frontend-prod/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy \
  --bucket buspass-frontend-prod \
  --policy file://bucket-policy.json
```

### 3. EC2 Setup (Backend Hosting)

1. **Launch Instance**
   - Go to AWS EC2 Console
   - Click "Launch Instance"
   - Select Ubuntu 20.04 LTS
   - Choose t2.micro (free tier)
   - Configure security group:
     - SSH (22): Your IP
     - HTTP (80): 0.0.0.0/0
     - HTTPS (443): 0.0.0.0/0
     - Custom TCP (5000): 0.0.0.0/0

2. **Connect to Instance**
```bash
# Download key pair and connect
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

3. **Install Software**
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git curl

# Install Node Version Manager (optional)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

4. **Deploy Backend**
```bash
# Clone repository
git clone https://github.com/yourusername/bus-pass-system.git
cd bus-pass-system/backend

# Install dependencies
npm install

# Create .env file
sudo nano .env
# Paste your environment variables

# Install PM2 globally
sudo npm install -g pm2

# Start application
pm2 start server.js --name "buspass-api"
pm2 startup
pm2 save

# Verify it's running
pm2 logs buspass-api
```

5. **Setup Nginx Reverse Proxy** (Optional but recommended)
```bash
sudo apt install -y nginx

# Create nginx config
sudo nano /etc/nginx/sites-available/buspass

# Add this config:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/buspass /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL with Let's Encrypt** (Free HTTPS)
```bash
sudo apt install -y certbot python3-certbot-nginx

sudo certbot certonly --standalone -d your-domain.com

# Update nginx config to use SSL
sudo certbot --nginx -d your-domain.com
```

### 4. Frontend Deployment

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Upload to S3**
```bash
# Set API URL before building
export REACT_APP_API_URL=http://your-ec2-ip:5000/api

npm run build

# Upload to S3
aws s3 sync build/ s3://buspass-frontend-prod --delete --acl public-read
```

3. **Setup CloudFront CDN**
   - Go to CloudFront console
   - Create distribution
   - Origin: S3 bucket
   - Viewer protocol: Redirect HTTP to HTTPS
   - Default root object: index.html
   - Error pages: Point to index.html (for React Router)

### 5. Domain & DNS Setup

1. Register domain (Route 53 or external)
2. Point DNS records:
   - API: A record to EC2 IP
   - Frontend: CNAME/ALIAS to CloudFront

### 6. Environment Variables

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/buspass
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=production

# AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=buspass-files

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLIC_KEY=pk_live_xxx
```

**Frontend (.env)**
```
REACT_APP_API_URL=https://api.your-domain.com
```

## Monitoring & Maintenance

### EC2 Health Checks
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ip

# Check application status
pm2 status

# View logs
pm2 logs buspass-api

# Monitor CPU/Memory
top

# Check disk space
df -h
```

### Database Backups
```bash
# Backup MongoDB
mongodump --uri="your_connection_string" --out=/backup

# Restore
mongorestore /backup
```

### CloudWatch Monitoring
- Create CloudWatch alarms for EC2
- Monitor CPU, memory, disk usage
- Set SNS notifications for alerts

## Cost Optimization

1. **EC2**: Use t2.micro for free tier (first 12 months)
2. **RDS**: Use MongoDB Atlas free tier (512MB)
3. **S3**: S3 Standard, set lifecycle policies
4. **CloudFront**: Use AWS free tier (50GB/month)
5. **Data Transfer**: Minimize cross-region transfers

Estimated monthly cost: $0-20 with free tier

## Scaling

### Horizontal Scaling
- Load Balancer (ALB/NLB)
- Auto Scaling Groups with EC2
- Database read replicas

### Vertical Scaling
- Upgrade EC2 instance type
- Scale up RDS instance

### Database Optimization
- Add indexes
- Enable query optimization
- Use read replicas

## Troubleshooting

### Backend not responding
```bash
# Check if process is running
pm2 status

# Restart
pm2 restart buspass-api

# Check logs
pm2 logs buspass-api
```

### CORS errors
- Verify backend CORS configuration
- Check frontend API URL in .env
- Ensure headers are correct

### S3 access issues
- Check bucket policy
- Verify IAM permissions
- Check bucket CORS configuration

### Database connection failed
- Verify MongoDB connection string
- Check IP whitelist in MongoDB Atlas
- Verify credentials

## Security Best Practices

1. ✅ Use HTTPS/SSL
2. ✅ Store secrets in environment variables
3. ✅ Enable database authentication
4. ✅ Use IAM roles for AWS services
5. ✅ Enable CloudTrail for audit logs
6. ✅ Regularly update packages
7. ✅ Use strong JWT secret
8. ✅ Implement rate limiting
9. ✅ Enable DDoS protection (AWS Shield)
10. ✅ Regular security audits

## Additional Resources

- [AWS Documentation](https://docs.aws.amazon.com/)
- [MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Node.js Production Checklist](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [React Deployment](https://create-react-app.dev/deployment/)
