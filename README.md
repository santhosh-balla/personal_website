# Personal Website

A modern personal portfolio website built with Next.js (frontend) and Django (backend).

## Features

- **Projects Showcase**: Stacked card slider displaying projects with images, tech stack, and links
- **Blog**: Grid layout of blog posts with full-content modal view
- **About Me**: Personal information with animated stats
- **Minimal Design**: Clean black-and-white aesthetic throughout

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- CSS Modules
- React

### Backend
- Django 6.0
- Django REST Framework
- SQLite (development) / PostgreSQL (production)
- CORS Headers

## Local Development

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Mac/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   cd backend
   python manage.py migrate
   ```

5. Create superuser:
   ```bash
   python manage.py createsuperuser
   ```

6. Run development server:
   ```bash
   python manage.py runserver
   ```

Backend will be available at `http://localhost:8000`
Admin panel at `http://localhost:8000/admin`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd personal_website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

Frontend will be available at `http://localhost:3000`

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
personal_website/
├── backend/
│   ├── backend/
│   │   ├── api/          # Django app
│   │   ├── backend/      # Django settings
│   │   └── media/        # Uploaded files
│   └── requirements.txt
├── personal_website/
│   ├── app/
│   │   ├── aboutme/      # About page
│   │   ├── blog/         # Blog page
│   │   ├── projects/     # Projects page
│   │   └── ...
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/projects` - List all projects
- `GET /api/blogs` - List all blog posts

## License

MIT
