# Image Paths Reference

## Folder Structure

Your images should be organized like this:

```
personal_website/
└── public/
    ├── blog_images/
    │   ├── blog1.jpg
    │   ├── blog2.png
    │   └── my-first-post.jpg
    └── project_images/
        ├── project1.jpg
        ├── portfolio-site.png
        └── django-app.jpg
```

## Django Admin - Image URL Examples

### For Projects
When adding/editing a Project in Django admin, use these paths:

```
/project_images/project1.jpg
/project_images/portfolio-site.png
/project_images/django-app.jpg
```

### For Blogs
When adding/editing a Blog in Django admin, use these paths:

```
/blog_images/blog1.jpg
/blog_images/my-first-post.jpg
/blog_images/tech-article.png
```

## Important Rules

✅ **DO:**
- Start with a forward slash: `/project_images/...`
- Use lowercase filenames
- Use hyphens instead of spaces: `my-project.jpg` not `my project.jpg`
- Keep filenames simple and descriptive

❌ **DON'T:**
- Forget the leading slash: `project_images/...` ❌
- Use full URLs: `http://localhost:3000/project_images/...` ❌
- Use backslashes: `\project_images\...` ❌
- Use spaces in filenames: `my project.jpg` ❌

## Quick Copy-Paste Examples

### Project Examples
```
/project_images/ecommerce-site.jpg
/project_images/weather-app.png
/project_images/task-manager.jpg
```

### Blog Examples
```
/blog_images/django-tutorial.jpg
/blog_images/react-hooks.png
/blog_images/deployment-guide.jpg
```

## How It Works

1. **File Location**: `personal_website/public/project_images/project1.jpg`
2. **Django Admin**: Enter `/project_images/project1.jpg`
3. **API Response**: Returns `"image_url": "/project_images/project1.jpg"`
4. **Frontend**: Next.js serves from `public/` folder automatically
5. **Browser**: Loads `http://localhost:3000/project_images/project1.jpg`

## Verification Checklist

Before adding data in Django admin:

- [ ] Image file exists in correct folder (`blog_images/` or `project_images/`)
- [ ] Filename matches exactly (case-sensitive)
- [ ] Path starts with `/`
- [ ] No spaces in filename
- [ ] File extension is correct (.jpg, .png, etc.)

## Testing

After adding a project/blog:

1. Visit the API endpoint:
   - Projects: `http://localhost:8000/api/projects`
   - Blogs: `http://localhost:8000/api/blogs`

2. Check the `image_url` field in the response

3. Copy the URL and test in browser:
   - `http://localhost:3000/project_images/project1.jpg`
   - `http://localhost:3000/blog_images/blog1.jpg`

4. If 404 error, check:
   - File exists in correct folder
   - Filename matches exactly
   - Path in Django admin is correct
