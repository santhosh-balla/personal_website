from django.db import models

from datetime import date

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.JSONField(default=list)
    github_link = models.URLField(blank=True, null=True)
    live_demo_link = models.URLField(blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True, null=True, help_text="Path to image in Next.js public folder (e.g., /project_images/project1.jpg)")
    date = models.DateField(default = date.today, blank = False, null = True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return self.title


class Blog(models.Model):
    content = models.TextField()
    date = models.DateField(default = date.today, blank = False, null = True)
    title = models.CharField(max_length = 200)
    image_url = models.CharField(max_length=500, blank=True, null=True, help_text="Path to image in Next.js public folder (e.g., /blog_images/blog1.jpg)")
    social_media_link = models.URLField(blank = True, null = True)


    class Meta:

        ordering = ['-date']

    def __str__(self):
        return self.title 
    
