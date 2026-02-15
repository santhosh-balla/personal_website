# Migration Guide: ImageField to URL-based Storage

## What Changed

We're replacing `ImageField` with `CharField` to store image URLs instead of uploading files to Django. Images will now be stored in your Next.js `/public/images` folder.

### Changes Made:
- `Project.image` → `Project.image_url` (CharField)
- `Blog.image` → `Blog.image_url` (CharField)

## Step-by-Step Migration Process

### Step 1: Activate Virtual Environment

```bash
cd backend
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # Mac/Linux
```

### Step 2: Create Migration

```bash
cd backend
python manage.py makemigrations
```

You'll see output like:
```
Migrations for 'api':
  api/migrations/0005_auto_XXXXXX.py
    - Remove field image from blog
    - Remove field image from project
    - Add field image_url to blog
    - Add field image_url to project
```

### Step 3: Review the Migration (Optional)

Check the generated migration file in `backend/api/migrations/` to ensure it looks correct.

### Step 4: Apply Migration

```bash
python manage.py migrate
```

### Step 5: Update Existing Data (If You Have Any)

If you already have projects or blogs in your database with images, you'll need to:

1. **Option A: Start Fresh** (Recommended if no important data)
   ```bash
   # Delete the database
   del db.sqlite3  # Windows
   # or
   rm db.sqlite3  # Mac/Linux
   
   # Run migrations again
   python manage.py migrate
   
   # Create superuser
   python manage.py createsuperuser
   ```

2. **Option B: Manually Update** (If you have data to preserve)
   - Go to Django admin: `http://localhost:8000/admin`
   - Edit each project/blog
   - Add the image URL (e.g., `/images/project1.jpg`)

## Step 6: Set Up Images in Next.js

### Create images folders:
```bash
cd personal_website
mkdir public\blog_images     # Windows
mkdir public\project_images  # Windows
# or
mkdir -p public/blog_images public/project_images  # Mac/Linux
```

### Add your images:
Place your project and blog images in their respective folders:

Example structure:
```
personal_website/
└── public/
    ├── blog_images/
    │   ├── blog1.jpg
    │   └── blog2.png
    └── project_images/
        ├── project1.jpg
        └── project2.png
```

## Step 7: Update Frontend Code

The frontend code needs to be updated to use the new field name and path.

### Update TypeScript Interfaces

**File: `personal_website/app/projects/projectInterface.ts`**
```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_link: string | null;
  live_demo_link: string | null;
  image_url: string | null;  // Changed from 'image'
  date: string;
}
```

**File: `personal_website/app/blog/blogInterface.ts`**
```typescript
interface Blog {
  id: number;
  title: string;
  content: string;
  date: string;
  image_url: string | null;  // Changed from 'image'
  social_media_link: string | null;
}
```

### Update Components

**File: `personal_website/app/projects/ProjectsClient.tsx`**
Change:
```typescript
{project.image && (
  <img src={project.image} alt={project.title} />
)}
```
To:
```typescript
{project.image_url && (
  <img src={project.image_url} alt={project.title} />
)}
```

**File: `personal_website/app/blog/BlogsClient.tsx`**
Change:
```typescript
{selectedBlog.image && (
  <img src={selectedBlog.image} alt={selectedBlog.title} />
)}
```
To:
```typescript
{selectedBlog.image_url && (
  <img src={selectedBlog.image_url} alt={selectedBlog.title} />
)}
```

## Step 8: Add Data via Django Admin

1. Start Django server:
   ```bash
   cd backend/backend
   python manage.py runserver
   ```

2. Go to admin: `http://localhost:8000/admin`

3. Add projects/blogs with image URLs like:
   - `/project_images/project1.jpg`
   - `/blog_images/blog1.png`

## Step 9: Test Everything

1. Start both servers:
   ```bash
   # Terminal 1 - Backend
   cd backend/backend
   python manage.py runserver
   
   # Terminal 2 - Frontend
   cd personal_website
   npm run dev
   ```

2. Visit `http://localhost:3000` and verify:
   - Projects page shows images correctly
   - Blog page shows images correctly
   - Images load from `/public/images/` folder

## Benefits of This Approach

✅ **No media file storage issues on Render** (free tier has ephemeral storage)
✅ **Images served by Next.js** (optimized, cached, fast)
✅ **Simpler deployment** (no need to configure S3 or Cloudinary)
✅ **Version controlled images** (images in git with your code)
✅ **No CORS issues** (images served from same domain)

## Image URL Format

When adding data in Django admin, use these formats:

**For Projects:**
- **Relative path**: `/project_images/project1.jpg`
- **Full path**: `https://your-domain.vercel.app/project_images/project1.jpg`

**For Blogs:**
- **Relative path**: `/blog_images/blog1.jpg`
- **Full path**: `https://your-domain.vercel.app/blog_images/blog1.jpg`

Relative paths are recommended as they work in both development and production.

## Troubleshooting

### Images not showing?
- Check the image file exists in `public/blog_images/` or `public/project_images/`
- Check the URL in Django admin matches the filename
- Check browser console for 404 errors
- Verify the path starts with `/blog_images/` or `/project_images/`

### Migration errors?
- Make sure virtual environment is activated
- Try deleting `db.sqlite3` and starting fresh
- Check for typos in model field names

### API returning old field name?
- Restart Django server after migration
- Clear browser cache
- Check API response in browser DevTools
