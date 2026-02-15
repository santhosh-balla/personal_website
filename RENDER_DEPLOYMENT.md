# Render Deployment Guide

Complete step-by-step guide to deploy your Django backend on Render.

## Prerequisites
- GitHub account with your code pushed
- Render account (free tier available at [render.com](https://render.com))

## Step 1: Prepare Your Code

Your code is already prepared! Make sure you've committed and pushed to GitHub:

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

## Step 2: Generate a New SECRET_KEY

**IMPORTANT**: Never use the default SECRET_KEY in production!

Generate a new one by running this Python command:

```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

Or use this one-liner:
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output - you'll need it in Step 5.

## Step 3: Create Web Service on Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** button → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select your repository: `personal_website`
5. Click **"Connect"**

## Step 4: Configure Web Service

Fill in the following settings:

### Basic Settings
- **Name**: `your-app-name` (e.g., `my-portfolio-backend`)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`

### Build & Deploy Settings
- **Build Command**: 
  ```bash
  pip install -r requirements.txt && cd backend && python manage.py collectstatic --noinput && python manage.py migrate
  ```

- **Start Command**:
  ```bash
  cd backend && gunicorn backend.wsgi:application
  ```

### Instance Type
- **Free** (or choose paid plan for better performance)

## Step 5: Set Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

### Required Variables

1. **SECRET_KEY**
   - Value: `<paste-the-secret-key-you-generated-in-step-2>`

2. **DEBUG**
   - Value: `False`

3. **ALLOWED_HOSTS**
   - Value: `your-app-name.onrender.com`
   - (Replace `your-app-name` with the name you chose in Step 4)

4. **CORS_ALLOWED_ORIGINS**
   - Value: `https://your-frontend.vercel.app`
   - (You'll update this after deploying frontend)

5. **CORS_ALLOW_ALL_ORIGINS**
   - Value: `False`

6. **PYTHON_VERSION**
   - Value: `3.11.0`

## Step 6: Add PostgreSQL Database (Optional but Recommended)

1. In your Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Fill in:
   - **Name**: `your-app-db`
   - **Database**: `your_app_db`
   - **User**: `your_app_user`
   - **Region**: Same as your web service
   - **Plan**: Free
3. Click **"Create Database"**
4. Once created, copy the **"Internal Database URL"**
5. Go back to your Web Service → **"Environment"** tab
6. Add new environment variable:
   - **Key**: `DATABASE_URL`
   - **Value**: `<paste-internal-database-url>`

**Note**: If you skip this step, the app will use SQLite (not recommended for production).

## Step 7: Deploy

1. Click **"Create Web Service"** at the bottom
2. Render will start building and deploying your app
3. Wait for the build to complete (5-10 minutes)
4. Your backend will be live at: `https://your-app-name.onrender.com`

## Step 8: Create Django Superuser

After deployment, you need to create an admin user:

1. In your Render dashboard, go to your web service
2. Click **"Shell"** tab on the left
3. Run these commands:
   ```bash
   cd backend
   python manage.py createsuperuser
   ```
4. Follow the prompts to create your admin account

## Step 9: Test Your Backend

1. Visit: `https://your-app-name.onrender.com/admin`
2. Log in with your superuser credentials
3. Add some projects and blog posts
4. Test API endpoints:
   - `https://your-app-name.onrender.com/api/projects`
   - `https://your-app-name.onrender.com/api/blogs`

## Step 10: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `personal_website`
   - **Framework Preset**: Next.js (auto-detected)
5. Add Environment Variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-app-name.onrender.com`
6. Click **"Deploy"**

## Step 11: Update CORS Settings

After your frontend is deployed on Vercel:

1. Copy your Vercel URL (e.g., `https://your-site.vercel.app`)
2. Go to Render dashboard → Your web service → **"Environment"**
3. Update **CORS_ALLOWED_ORIGINS**:
   - Value: `https://your-site.vercel.app`
4. Click **"Save Changes"**
5. Render will automatically redeploy

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in `requirements.txt`
- Verify Python version is correct

### Static Files Not Loading
- Make sure `collectstatic` is in the build command
- Check that `whitenoise` is in `requirements.txt`

### Database Errors
- Verify `DATABASE_URL` is set correctly
- Check that migrations ran successfully in build logs
- Try running migrations manually in Shell

### CORS Errors
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Make sure there are no trailing slashes
- Check that the protocol (https://) is correct

### 502 Bad Gateway
- Check the logs for Python errors
- Verify the start command is correct
- Ensure gunicorn is installed

### Media Files Not Showing
- For production, consider using cloud storage (AWS S3, Cloudinary)
- Render's free tier has ephemeral storage (files are deleted on redeploy)

## Important Notes

1. **Free Tier Limitations**:
   - Service spins down after 15 minutes of inactivity
   - First request after spin-down takes 30-60 seconds
   - Upgrade to paid plan ($7/month) for always-on service

2. **Media Files**:
   - Render's free tier has ephemeral storage
   - Uploaded files are deleted when service restarts
   - For persistent storage, use AWS S3 or Cloudinary

3. **Database Backups**:
   - Free PostgreSQL doesn't include automatic backups
   - Upgrade to paid plan for backups

## Environment Variables Reference

Copy these to Render (update values):

```
SECRET_KEY=<your-generated-secret-key>
DEBUG=False
ALLOWED_HOSTS=your-app-name.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
CORS_ALLOW_ALL_ORIGINS=False
PYTHON_VERSION=3.11.0
DATABASE_URL=<auto-populated-by-render-if-using-postgresql>
```

## Next Steps

1. Upload your projects and blog posts via Django admin
2. Test all functionality
3. Set up a custom domain (optional)
4. Monitor your app's performance in Render dashboard

## Support

- Render Docs: https://render.com/docs
- Django Deployment: https://docs.djangoproject.com/en/stable/howto/deployment/
