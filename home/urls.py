from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from queue_forms import views


router = routers.DefaultRouter()                      
router.register(r'businesscardqueues', views.BusinessCardFormView, 'queue')
router.register(r'flyerqueues', views.FlyerFormView, 'queue')


urlpatterns = [
    path('queue_forms/', include('queue_forms.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    # re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]