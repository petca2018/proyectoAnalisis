import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Profile, Tarjeta
from api.serializers import UserSerializer, UserReadSerializer, ProfileReadSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ["is_staff"]
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        if(request.data.get("profile") is not None):
            profile = request.data.pop('profile')
        if(request.data.get("confirm_password") is not None):
            request.data.pop("confirm_password")
        user = User.objects.create(
            **request.data
        )
        user.save()
        usuario = User.objects.get(username=request.data["username"])
        usuario.set_password(request.data["password"])
        usuario.save()
        serializer = UserReadSerializer(user)
        headers = self.get_success_headers(serializer.data)
        if profile:
            tarjetas = None
            if profile.get("tarjetas",None) is not None:
                tarjetas = profile.pop("tarjetas")
            perfil = Profile.objects.create(
                user = User.objects.get(id=serializer.data["id"]),
                avatar = None,
                phone = profile.get('phone'),
                address = profile.get('address'),
                gender = profile.get('gender'),
            )
            if tarjetas:
                tarjeta = Tarjeta.objects.create(
                    numero = tarjetas.get("numero"),
                    banco_id = tarjetas.get("banco").get("id"),
                    profile = perfil,
                )
                tarjeta.save()
            perfil.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        try:
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            user = request.user
            if user.username != data["username"]:
                try:
                    User.objects.get(username=data["username"])
                    return Response(
                        {"detail": "El usuario no esta disponible, por favor selecciona otro"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except User.DoesNotExist:
                    pass
            user.username = data["username"]
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            if profile is not None:
                tarjetas = None
                if profile.get('tarjetas', None) is not None:
                    tarjetas = profile.pop('tarjetas')
                perfil.phone = profile.get("phone", perfil.phone)
                perfil.address = profile.get("address", perfil.address)
                perfil.gender = profile.get("gender", perfil.gender)
                if tarjetas:
                    existe = False
                    try:
                        tarjeta = Tarjeta.objects.get(id=tarjetas["id"])
                        existe = True
                    except:
                        existe = False
                    if existe == True:
                        tarjeta = Tarjeta.objects.get(id=tarjetas["id"])
                        tarjeta.numero = tarjetas["numero"]
                        tarjeta.banco_id = tarjetas["banco"]["id"]
                        tarjeta.profile_id = perfil.id
                        tarjeta.save()
                    else:
                        tarjeta = Tarjeta.objects.create(
                            numero = tarjetas.get("numero"),
                            banco_id = tarjetas.get("banco").get("id"),
                            profile = perfil,
                        )
                        tarjeta.save()
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} es un campo requerido".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["put"], detail=False)
    def update_cliente(self, request, *args, **kwargs):
        data = request.data
        try:

            avatar = data.get("avatar")
            user = User.objects.get(id=data["id"])
            if user.username != data["username"]:
                try:
                    User.objects.get(username=data["username"])
                    return Response(
                        {"detail": "El usuario no esta disponible, por favor selecciona otro"},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                except User.DoesNotExist:
                    pass
            user.username = data["username"]
            user.first_name = data["first_name"]
            user.last_name = data["last_name"]
            user.email = data["email"]
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            if profile is not None:
                tarjetas = None
                if profile.get('tarjetas', None) is not None:
                    tarjetas = profile.get('tarjetas')
                perfil.phone = profile.get("phone", perfil.phone)
                perfil.address = profile.get("address", perfil.address)
                perfil.gender = profile.get("gender", perfil.gender)
                if tarjetas:
                    existe = False
                    try:
                        tarjeta = Tarjeta.objects.get(id=tarjetas["id"])
                        existe = True
                    except:
                        existe = False
                    if existe == True:
                        tarjeta = Tarjeta.objects.get(id=tarjetas["id"])
                        tarjeta.numero = tarjetas["numero"]
                        tarjeta.banco_id = tarjetas["banco"]["id"]
                        tarjeta.profile_id = perfil.id
                        tarjeta.save()
                    else:
                        tarjeta = Tarjeta.objects.create(
                            numero = tarjetas.get("numero"),
                            banco_id = tarjetas.get("banco").get("id"),
                            profile = perfil,
                        )
                        tarjeta.save()
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} es un campo requerido".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=True)
    def profile(self, request, *args, **kwargs):

        id = self.kwargs["pk"]

        queryset = Profile.objects.get(id=id)
        serializer = ProfileReadSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["delete"], detail=True)
    def eliminarTarjeta(self, request, *args, **kwargs):

        id = self.kwargs["pk"]

        tarjeta = Tarjeta.objects.get(id = id)
        if not tarjeta:
            return Response({"detail": "No se encuentra la tarjeta"}, status=status.HTTP_400_BAD_REQUEST)

        profile = tarjeta.profile
        tarjeta.delete()

        return Response({"detail": "La tarjeta se elimino", "profile": profile.id}, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        serializer = UserReadSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(username=data["username"])
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                serializer = UserReadSerializer(user)
                return Response({"user": serializer.data, "token": token.key}, status=status.HTTP_200_OK)
            return Response({"detail": "La contraseña no coincide"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} es un campo requerido".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "Session no encontrada"}, status=status.HTTP_404_NOT_FOUND)
