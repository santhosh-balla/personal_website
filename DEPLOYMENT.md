# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (for frontend)
- Railway or Render account (for backend)

## Backend Deployment (Django)

### Option 1: Railway (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Select the `backend` folder as the root directory
   - Railway will auto-detect Django

3. **Set Environment Variables in Railway**
   ```
   SECRET_KEY=<generate-a-new-secret-key>
   DEBUG=False
   ALLOWED_HOSTS=<your-railway-domain>.railway.app
   CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
   ```

4. **Add PostgreSQL Database** (Optional but recommended)
   - In Railway, click "New" → "Database" → "PostgreSQL"
   - Railway will automatically set DATABASE_URL

5. **Run Migrations**
   - In Railway dashboard, go to your service
   - Open the "Deploy" tab
   - Add a deploy command: `python backend/manage.py migrate`

### Option 2: Render

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `cd backend && gunicorn backend.wsgi:application`

2. **Set Environment Variables**
   Same as Railway above

## Frontend Deployment (Next.js)

### Vercel (Recommended)

1. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Root Directory: `personal_website`
   - Framework Preset: Next.js (auto-detected)

2. **Set Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

## Post-Deployment

1. **Update CORS in Django**
   - Add your Vercel domain to CORS_ALLOWED_ORIGINS
   - Redeploy backend

2. **Upload Media Files**
   - Use Django admin to upload project images and blog posts
   - Access admin at: `https://your-backend-url/admin`

3. **Create Superuser** (if needed)
   - In Railway/Render console, run:
     ```bash
     python backend/manage.py createsuperuser
     ```

## Environment Variables Summary

### Backend (.env)
```
SECRET_KEY=<your-secret-key>
DEBUG=False
ALLOWED_HOSTS=<your-domain>
CORS_ALLOWED_ORIGINS=<your-frontend-url>
```

### Frontend (.env.local for development)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Frontend (Vercel environment variables)
```
NEXT_PUBLIC_API_URL=<your-backend-url>
```

## Generating a New SECRET_KEY

Run this in Python:
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

## Troubleshooting

- **CORS errors**: Make sure CORS_ALLOWED_ORIGINS includes your frontend URL
- **Static files not loading**: Run `python manage.py collectstatic` in production
- **Database errors**: Ensure migrations are run after deployment
- **Media files not showing**: Check MEDIA_URL and MEDIA_ROOT settings
