'''Use this for development'''

from .base import *

ALLOWED_HOSTS += ['127.0.0.1', 'localhost']
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'

# Database setup
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sunshine_health',
        'USER': 'root',
        'PASSWORD': 'mysql',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
)
