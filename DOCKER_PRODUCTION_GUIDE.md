# Docker Production Deployment Guide

## Production-Ready Setup

Your docker-compose.yml is now configured for production with:
- ✅ Environment variable configuration
- ✅ Health checks for both services
- ✅ Restart policies
- ✅ Network isolation
- ✅ Alpine-based PostgreSQL (smaller image)
- ✅ No hardcoded secrets

## Prerequisites

1. **Server with Docker installed** (VPS, EC2, DigitalOcean, etc.)
2. **Domain name** pointed to your server
3. **SSL certificate** (use Let's Encrypt/Certbot)

## Step 1: Prepare Your Server

### Install Docker & Docker Compose

**Ubuntu/Debian:**
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

## Step 2: Clone Your Repository

```bash
cd /opt
sudo git clone https://github.com/your-username/personal_website.git
cd personal_website/backend
```

## Step 3: Configure Environment Variables

Create production environment file:

```bash
nano .env
```

Add your production values:

```env
# Django Settings
SECRET_KEY=<generate-new-secret-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
PORT=8000

# Database Settings
POSTGRES_DB=portfolio_db
POSTGRES_USER=portfolio_user
POSTGRES_PASSWORD=<strong-password-here>

# CORS Settings
CORS_ALLOWED_ORIGINS=https://yourdomain.com
CORS_ALLOW_ALL_ORIGINS=False
```

**Generate SECRET_KEY:**
```bash
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## Step 4: Build and Start Services

```bash
# Build images
docker-compose build

# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f
```

## Step 5: Run Initial Setup

```bash
# Run migrations
docker-compose exec web python manage.py migrate

# Create superuser
docker-compose exec web python manage.py createsuperuser

# Collect static files (already done in Dockerfile, but just in case)
docker-compose exec web python manage.py collectstatic --noinput
```

## Step 6: Set Up Nginx Reverse Proxy

Install Nginx:
```bash
sudo apt install nginx -y
```

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static/ {
        alias /opt/personal_website/backend/backend/staticfiles/;
    }

    location /media/ {
        alias /opt/personal_website/backend/backend/media/;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 7: Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

## Step 8: Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Production Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f web
docker-compose logs -f db
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart web
```

### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Run migrations
docker-compose exec web python manage.py migrate
```

### Database Backup
```bash
# Backup
docker-compose exec db pg_dump -U portfolio_user portfolio_db > backup_$(date +%Y%m%d).sql

# Restore
docker-compose exec -T db psql -U portfolio_user portfolio_db < backup_20240101.sql
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes (CAUTION: Deletes data)
```bash
docker-compose down -v
```

## Monitoring

### Check Service Status
```bash
docker-compose ps
```

### Check Resource Usage
```bash
docker stats
```

### Check Health
```bash
# Web service health
curl http://localhost:8000/admin/login/

# Database health
docker-compose exec db pg_isready -U portfolio_user
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs web

# Check if port is in use
sudo netstat -tulpn | grep 8000
```

### Database connection errors
```bash
# Check database is running
docker-compose ps db

# Check database logs
docker-compose logs db

# Verify DATABASE_URL
docker-compose exec web env | grep DATABASE_URL
```

### Permission errors
```bash
# Fix ownership
sudo chown -R $USER:$USER /opt/personal_website
```

### Out of disk space
```bash
# Clean up Docker
docker system prune -a

# Remove unused volumes
docker volume prune
```

## Security Best Practices

1. **Never commit .env file** - It's in .gitignore
2. **Use strong passwords** - For database and SECRET_KEY
3. **Keep Docker updated** - `sudo apt update && sudo apt upgrade`
4. **Regular backups** - Automate database backups
5. **Monitor logs** - Set up log rotation
6. **Firewall rules** - Only open necessary ports
7. **SSL/TLS** - Always use HTTPS in production

## Auto-Start on Boot

Docker Compose services will auto-start on boot by default due to `restart: always` policy.

To disable:
```bash
docker-compose stop
```

## Scaling (Optional)

To run multiple web instances:

```bash
docker-compose up -d --scale web=3
```

Then configure Nginx for load balancing.

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| SECRET_KEY | Yes | - | Django secret key |
| DEBUG | No | False | Debug mode |
| ALLOWED_HOSTS | Yes | - | Comma-separated domains |
| PORT | No | 8000 | Application port |
| POSTGRES_DB | No | portfolio_db | Database name |
| POSTGRES_USER | No | portfolio_user | Database user |
| POSTGRES_PASSWORD | Yes | - | Database password |
| CORS_ALLOWED_ORIGINS | Yes | - | Frontend URLs |
| CORS_ALLOW_ALL_ORIGINS | No | False | Allow all origins |

## Cost Optimization

**Recommended VPS Specs:**
- **Development/Small**: 1 CPU, 1GB RAM ($5-10/month)
- **Production**: 2 CPU, 2GB RAM ($12-20/month)

**Providers:**
- DigitalOcean Droplets
- Linode
- Vultr
- AWS Lightsail
- Hetzner Cloud

## Next Steps

1. Set up automated backups
2. Configure monitoring (Prometheus, Grafana)
3. Set up log aggregation
4. Implement CI/CD pipeline
5. Add CDN for static files
