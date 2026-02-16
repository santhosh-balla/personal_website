# Use Python 3.11 slim image
FROM python:3.11-slim

# Prevent Python from writing pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system dependencies (for Postgres + building wheels)
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for Docker caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy entire project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Start gunicorn (Cloud Run provides $PORT)
CMD gunicorn backend.wsgi:application \
    --bind 0.0.0.0:$PORT \
    --workers 3
