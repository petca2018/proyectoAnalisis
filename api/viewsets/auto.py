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

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     usuario = User.objects.get(username=request.data["username"])
    #     usuario.set_password(request.data["password"])
    #     usuario.save()
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    # @action(methods=["put"], detail=False)
    # def update_me(self, request, *args, **kwargs):
    #     data = request.data
    #     try:
    #         avatar = data.get("avatar")
    #         data = json.loads(data["data"])
    #         user = request.user
    #         if user.username != data["username"]:
    #             try:
    #                 User.objects.get(username=data["username"])
    #                 return Response(
    #                     {"detail": "El usuario no esta disponible, por favor selecciona otro"},
    #                     status=status.HTTP_400_BAD_REQUEST
    #                 )
    #             except User.DoesNotExist:
    #                 pass
    #         user.username = data["username"]
    #         user.first_name = data["first_name"]
    #         user.last_name = data["last_name"]
    #         perfil, created = Profile.objects.get_or_create(user=user)
    #         if avatar is not None:
    #             perfil.avatar = File(avatar)
    #         profile = data.get("profile")
    #         if profile is not None:
    #             perfil.phone = profile.get("phone", perfil.phone)
    #             perfil.address = profile.get("address", perfil.address)
    #             perfil.gender = profile.get("gender", perfil.gender)
    #         user.save()
    #         perfil.save()
    #         serializer = UserReadSerializer(user)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     except KeyError as e:
    #         return Response({"detail": "{} es un campo requerido".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

