from django.db import models

from datetime import date

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.JSONField(default=list)
    github_link = models.URLField(blank=True, null=True)
    live_demo_link = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    date = models.DateField(default = date.today, blank = False, null = True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return self.title
