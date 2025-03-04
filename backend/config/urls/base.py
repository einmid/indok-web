"""api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from apps.ping.views import Ping
from config.views import csrf
from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path(settings.ADMIN_URL, admin.site.urls),
    path("ping", Ping.as_view()),
    path("-/", include("django_alive.urls")),
    path("ecommerce/", include("apps.ecommerce.urls")),
    path("csrf/", csrf_exempt(csrf.csrf)),
]
