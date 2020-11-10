import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Banco
from api.serializers import BancoSerializer, BancoReadSerializer


class BancoViewset(viewsets.ModelViewSet):

    queryset = Banco.objects.filter(estado=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ["estado"]
    search_fields = ["nombre"]

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return BancoReadSerializer
        else:
            return BancoSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action in ["create","update","delete"]:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
