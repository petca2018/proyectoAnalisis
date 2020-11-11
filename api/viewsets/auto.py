import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Auto
from api.serializers import AutoSerializer, AutoReadSerializer


class AutoViewset(viewsets.ModelViewSet):

    queryset = Auto.objects.filter(estado=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ("modelo", "tipo")
    search_fields = ("modelo", "tipo")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AutoReadSerializer
        else:
            return AutoSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action in ["create","update","delete"]:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}
