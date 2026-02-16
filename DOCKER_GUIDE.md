# Docker Deployment Guide

## Files Created

- `backend/Dockerfile` - Docker image configuration
- `backend/.dockerignore` - Files to exclude from Docker image
- `backend/docker-compose.yml` - Local development with PostgreSQL

## Local Development with Docker

### Option 1: Docker Compose (Recommended for Local Dev)

This runs Django + PostgreSQL together:

```bash
cd backend
docker-compose up --build
```

This will:
- Start PostgreSQL database
- Build Django container
- Run migrations automatically
- Start Django server on `http://localhost:8000`

**Create superuser:**
```bash
docker-compose exec web python backend/manage.py createsuperuser
```

**Stop containers:**
```bash
docker-compose down
```

**Stop and remove volumes (fresh start):**
```bash
docker-compose down -v
```

### Option 2: Docker Only (SQLite)

Build the image:
```bash
cd backend
docker build -t portfolio-backend .
```

Run the container:
```bash
docker run -p 8000:8000 \
  -e SECRET_KEY=your-secret-key \
  -e DEBUG=True \
  -e ALLOWED_HOSTS=localhost,127.0.0.1 \
  -e CORS_ALLOWED_ORIGINS=http://localhost:3000 \
  portfolio-backend
```

## Deploying to Render with Docker

### Step 1: Update Render Configuration

In your Render dashboard:

1. **Build Command**: Leave empty (Docker handles this)
2. **Start Command**: Leave empty (Docker handles this)
3. **Docker Command**: Render auto-detects Dockerfile

### Step 2: Set Environment Variables in Render

Same as before:
```
SECRET_KEY=<your-generated-secret-key>
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
DATABASE_URL=<render-provides-this>
```

### Step 3: Deploy

Push to GitHub and Render will automatically:
1. Detect the Dockerfile
2. Build the Docker image
3. Run the container
4. Execute migrations

## Dockerfile Explanation

```dockerfile
FROM python:3.11-slim
# Uses lightweight Python image

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Prevents Python from writing .pyc files and buffering stdout/stderr

WORKDIR /app
# Sets working directory

RUN apt-get update && apt-get install -y postgresql-client gcc python3-dev musl-dev libpq-dev
# Installs PostgreSQL client and build dependencies

COPY requirements.txt /app/
RUN pip install -r requirements.txt
# Installs Python packages

COPY backend/ /app/
# Copies Django project

RUN python manage.py collectstatic --noinput
# Collects static files

EXPOSE 8000
# Exposes port 8000

CMD python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3
# Runs migrations and starts Gunicorn server
```

## Docker Commands Reference

### Build
```bash
docker build -t portfolio-backend .
```

### Run
```bash
docker run -p 8000:8000 portfolio-backend
```

### Run with environment variables
```bash
docker run -p 8000:8000 \
  -e SECRET_KEY=your-key \
  -e DEBUG=False \
  portfolio-backend
```

### View running containers
```bash
docker ps
```

### Stop container
```bash
docker stop <container-id>
```

### View logs
```bash
docker logs <container-id>
```

### Execute commands in running container
```bash
docker exec -it <container-id> python manage.py createsuperuser
```

## Docker Compose Commands

### Start services
```bash
docker-compose up
```

### Start in background
```bash
docker-compose up -d
```

### Rebuild and start
```bash
docker-compose up --build
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Execute commands
```bash
docker-compose exec web python backend/manage.py migrate
docker-compose exec web python backend/manage.py createsuperuser
```

## Benefits of Docker

✅ **Consistent environment** - Same setup on dev, staging, production
✅ **Easy deployment** - Single container with all dependencies
✅ **Isolated** - Doesn't affect your system Python
✅ **Scalable** - Easy to run multiple instances
✅ **Portable** - Works on any platform with Docker

## Troubleshooting

### Port already in use
```bash
# Find process using port 8000
netstat -ano | findstr :8000  # Windows
lsof -i :8000  # Mac/Linux

# Kill the process or use different port
docker run -p 8001:8000 portfolio-backend
```

### Database connection errors
- Make sure PostgreSQL container is running
- Check DATABASE_URL is correct
- Verify network connectivity between containers

### Static files not loading
- Ensure `collectstatic` runs in Dockerfile
- Check STATIC_ROOT and STATIC_URL settings
- Verify whitenoise is installed

### Permission errors
```bash
# Run as root (not recommended for production)
docker run --user root portfolio-backend
```

## Production Best Practices

1. **Use multi-stage builds** for smaller images
2. **Don't run as root** - create a non-root user
3. **Use secrets management** - Don't hardcode credentials
4. **Health checks** - Add Docker health checks
5. **Logging** - Configure proper logging
6. **Security scanning** - Scan images for vulnerabilities

## Next Steps

1. Test locally with Docker Compose
2. Push to GitHub
3. Deploy to Render (auto-detects Dockerfile)
4. Monitor logs and performance
5. Scale as needed
