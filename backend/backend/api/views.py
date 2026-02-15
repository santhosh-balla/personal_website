from django.shortcuts import render
from rest_framework import generics
from .models import Project, Blog
from .serializers import ProjectSerializer, BlogSerializer

class ListProjects(generics.ListAPIView):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ListBlogs(generics.ListAPIView):

    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

