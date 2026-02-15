# Environment Variables for Render Deployment

## Quick Copy-Paste Reference

Add these environment variables in Render dashboard:

### 1. SECRET_KEY
```
Generate new key with:
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```
**Value**: `<paste-generated-key-here>`

### 2. DEBUG
**Value**: `False`

### 3. ALLOWED_HOSTS
**Value**: `your-app-name.onrender.com`
(Replace `your-app-name` with your actual Render service name)

### 4. CORS_ALLOWED_ORIGINS
**Value**: `https://your-frontend.vercel.app`
(Update after deploying frontend to Vercel)

### 5. CORS_ALLOW_ALL_ORIGINS
**Value**: `False`

### 6. PYTHON_VERSION
**Value**: `3.11.0`

### 7. DATABASE_URL (Optional - Auto-populated if using Render PostgreSQL)
**Value**: Leave empty or use Render's internal database URL

---

## Build Command (for Render)
```bash
pip install -r requirements.txt && cd backend && python manage.py collectstatic --noinput && python manage.py migrate
```

## Start Command (for Render)
```bash
cd backend && gunicorn backend.wsgi:application
```

---

## Example Values (DO NOT USE THESE DIRECTLY)

```
SECRET_KEY=django-insecure-abc123xyz789-GENERATE-YOUR-OWN
DEBUG=False
ALLOWED_HOSTS=my-portfolio-backend.onrender.com
CORS_ALLOWED_ORIGINS=https://my-portfolio.vercel.app
CORS_ALLOW_ALL_ORIGINS=False
PYTHON_VERSION=3.11.0
```

---

## After Deployment Checklist

- [ ] Generate and set new SECRET_KEY
- [ ] Set DEBUG=False
- [ ] Update ALLOWED_HOSTS with your Render domain
- [ ] Deploy frontend to Vercel
- [ ] Update CORS_ALLOWED_ORIGINS with Vercel URL
- [ ] Create superuser via Render Shell
- [ ] Test admin panel access
- [ ] Upload test project/blog via admin
- [ ] Test API endpoints
- [ ] Verify frontend can fetch data
