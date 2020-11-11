import json
from django.db import transaction
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db.models import Max

from api.models import Ofertas, AutoSubastado
from api.serializers import OfertasSerializer, OfertasReadSerializer


class OfertasViewset(viewsets.ModelViewSet):

    queryset = Ofertas.objects.filter(estado=True).order_by('-id')
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ["fecha_hora", "profile", "monto"]
    search_fields = ["profile__user__last_name", "profile__user__first_name"]

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return OfertasReadSerializer
        else:
            return OfertasSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]


    @transaction.atomic
    def create(self, request, *args, **kwargs):

        data = request.data
        user = request.user

        try:

            autoSubastado = data.get('autoSubastado', None)

            if autoSubastado is None:
                return Response({"detail": "Se necesita una auto"}, status=status.HTTP_400_BAD_REQUEST)
            if user.profile.tarjetas is None:
                return Response({"detail": "No tiene registrado una tarjeta"}, status=status.HTTP_400_BAD_REQUEST)

            autoSubastadoData = AutoSubastado.objects.get(id = autoSubastado)
            monto = data.get('monto',None)
            if monto is None:
                return Response({"detail": "Se necesita un monto"}, status=status.HTTP_400_BAD_REQUEST)

            monto_mas_alto = Ofertas.objects.filter(autoSubastado = autoSubastado).aggregate(Max('monto'))["monto__max"]
            if monto_mas_alto and float(monto) < monto_mas_alto:
                return Response({"detail": "Hay una oferta mas alta"}, status=status.HTTP_400_BAD_REQUEST)

            if float(monto) < autoSubastadoData.precio_base:
                return Response({"detail": "La oferta es menor al precio base"}, status=status.HTTP_400_BAD_REQUEST)

            serializerModel = self.get_serializer_class()
            serializer = serializerModel(data=data)
            serializer.is_valid(raise_exception=True)
            oferta = serializer.save()
            serializer = serializerModel(oferta)
            return Response({"detail": "Oferta realizada"}, status=status.HTTP_200_OK)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @transaction.atomic
    def update(self, request, *args, **kwargs):

        data = request.data
        id = self.kwargs['pk']

        try:
            oferta = self.get_object()
            monto = data.get('monto', None)
            if monto is not None:

                autoSubastado = data.get('autoSubastado', None)
                if autoSubastado is None:
                    return Response({"detail": "Se necesita una auto"}, status=status.HTTP_400_BAD_REQUEST)

                if user.profile.tarjetas is None:
                    return Response({"detail": "No tiene registrado una tarjeta"}, status=status.HTTP_400_BAD_REQUEST)

                monto_mas_alto = Ofertas.objects.filter(autoSubastado = autoSubastado).exclude(id = id).aggregate(Max('monto'))["monto__max"]
                if monto_mas_alto and float(monto) < monto_mas_alto:
                    return Response({"detail": "Hay una oferta mas alta"}, status=status.HTTP_400_BAD_REQUEST)

                if float(monto) < oferta.monto:
                    return Response({"detail": "El monto debe ser mayor al anterior"}, status=status.HTTP_400_BAD_REQUEST)

                serializerModel = self.get_serializer_class()
                serializer = serializerModel(oferta, data=data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response({"detail": "Monto actualizado"}, status=status.HTTP_200_OK)

            else:
                return Response({"detail": "Monto requerido"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        oferta = self.get_object()
        oferta.delete()
        return Response(status=status.HTTP_200_OK)


