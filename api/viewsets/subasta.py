import json
import base64
from django.core.files import File
from django.core.files.base import ContentFile
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from datetime import datetime
from django.db.models import Max
from django.shortcuts import get_object_or_404

from api.models import (
    Subasta,
    AutoSubastado,
    FotoAutoSubastado,
    AutosComprados,
    NotaCredito,
    Ofertas
)

from api.serializers import (
    SubastaReadSerializer, SubastaSerializer, AutoSubastadoReadSerializer,
    AutoSubastadoConSubastaReadSerializer, AutosCompradosSerializer,
    NotaCreditoReadSerializer)


class SubastaViewset(viewsets.ModelViewSet):

    queryset = Subasta.objects.filter(estado=True).order_by('-id')
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_fields = ["fecha_inicio", "fecha_fin", "cerrado", "autoSubastado__precio_base"]
    search_fields = ["fecha_inicio", "fecha_fin",
        "autoSubastado__auto__tipo", "autoSubastado__auto__año", "autoSubastado__provedor__nombre",
        "autoSubastado__auto__color", "autoSubastado__auto__modelo",
        "autoSubastado__condiciones"
    ]


    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return SubastaReadSerializer
        else:
            return SubastaSerializer


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


    def create(self, request, *args, **kwargs):

        data = request.data
        dataParaFotos = request.data

        try:
            with transaction.atomic():

                data = json.loads(data["data"])
                _AutoSubastado = data.get('autoSubastado')
                if _AutoSubastado is None:
                    return Response({"detail":"Se necesita almenos un auto"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    autoSubastadoData = data.pop('autoSubastado')

                # crea la subasta
                subasta = Subasta.objects.create(
                    **data
                )

                # crear los autos subastados
                for autoIndex in autoSubastadoData:

                    # verificar su el auto tiene fotos
                    fotosAutoSubastado = None
                    if autoSubastadoData[autoIndex]["fotos"] is not None:
                        fotosAutoSubastado = autoSubastadoData[autoIndex].pop('fotos')

                    # crear el registro de auto subastado
                    autoSubastado = AutoSubastado.objects.create(
                        subasta = subasta,
                        auto_id = autoSubastadoData[autoIndex]["auto"]["id"],
                        provedor_id = autoSubastadoData[autoIndex]["provedor"]["id"],
                        precio_base = autoSubastadoData[autoIndex]["precio_base"],
                        condiciones = autoSubastadoData[autoIndex]["condiciones"],
                        descripcion = autoSubastadoData[autoIndex]["descripcion"]
                    )

                    if fotosAutoSubastado:
                        for indexFoto in range(0,len(fotosAutoSubastado)):
                            nombreArchivo = 'foto {} {}'.format(autoIndex,indexFoto)
                            foto = dataParaFotos.get(nombreArchivo)
                            if foto is not None:
                                fotoAutoSubastado = FotoAutoSubastado.objects.create(
                                    autoSubastado = autoSubastado,
                                    foto = File(foto)
                                )
                                fotoAutoSubastado.save()

                    autoSubastado.save()
                subasta.save()

                return Response({"detail": "Subasta creada"}, status=status.HTTP_200_OK)

            return Response({"detail": "No se pudo completar el proceso"}, status= status.HTTP_400_BAD_REQUEST)

        except Exception as error:
            print(error)
            return Response({"detail":"{}".format(str(error))}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, *args, **kwargs):

        data = request.data
        dataParaFotos = request.data
        subasta = self.get_object()

        try:
            with transaction.atomic():

                data = json.loads(data["data"])
                _AutoSubastado = data.get('autoSubastado')
                if _AutoSubastado is None:
                    return Response({"detail":"Se necesita almenos un auto"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    autoSubastadoData = data.pop('autoSubastado')

                # Editar los autos subastados
                ids_autos = []
                for autoIndex in autoSubastadoData:

                    # verificar su el auto tiene fotos
                    fotosAutoSubastado = None
                    if autoSubastadoData[autoIndex]["fotos"] is not None:
                        fotosAutoSubastado = autoSubastadoData[autoIndex].pop('fotos')

                    if 'id' in autoSubastadoData[autoIndex]:
                        dataItem = AutoSubastado.objects.get(id=autoSubastadoData[autoIndex]["id"])
                        dataItem.auto_id = autoSubastadoData[autoIndex]["auto"]["id"]
                        dataItem.provedor_id = autoSubastadoData[autoIndex]["provedor"]["id"]
                        dataItem.precio_base = autoSubastadoData[autoIndex]["precio_base"]
                        dataItem.condiciones = autoSubastadoData[autoIndex]["condiciones"]
                        dataItem.descripcion = autoSubastadoData[autoIndex]["descripcion"]

                    else:
                        dataItem = AutoSubastado.objects.create(
                            subasta = subasta,
                            auto_id = autoSubastadoData[autoIndex]["auto"]["id"],
                            provedor_id = autoSubastadoData[autoIndex]["provedor"]["id"],
                            precio_base = autoSubastadoData[autoIndex]["precio_base"],
                            condiciones = autoSubastadoData[autoIndex]["condiciones"],
                            descripcion = autoSubastadoData[autoIndex]["descripcion"]
                        )

                    ids_fotos = []
                    if fotosAutoSubastado:
                        for indexFoto in range(0,len(fotosAutoSubastado)):
                            nombreArchivo = 'foto {} {}'.format(autoIndex,indexFoto)
                            foto = dataParaFotos.get(nombreArchivo, None)
                            if 'id' in fotosAutoSubastado[indexFoto]:
                                foto_object = FotoAutoSubastado.objects.get(id = fotosAutoSubastado[indexFoto]["id"])
                                if foto is not None:
                                    foto_object.foto = File(foto)
                                    foto_object.save()
                            else:
                                if foto is not None:
                                    foto_object = FotoAutoSubastado.objects.create(
                                        autoSubastado_id = dataItem.id,
                                        foto = File(foto)
                                    )
                            ids_fotos.append(foto_object.id)
                            foto_object.save()

                    fotos_desactivar = dataItem.fotos.exclude(id__in=ids_fotos)

                    for _desactivar in fotos_desactivar:
                        _desactivar.delete()

                    ids_autos.append(dataItem.id)
                    dataItem.save()

                autos_desactivar = subasta.autoSubastado.exclude(id__in=ids_autos)

                for _desactivar in autos_desactivar:
                    _desactivar.delete()

                subasta.fecha_inicio = data["fecha_inicio"]
                subasta.fecha_fin = data["fecha_fin"]
                subasta.save()

                return Response({"detail": "Subasta editada"}, status=status.HTTP_200_OK)

            return Response({"detail": "No se pudo completar el proceso"}, status= status.HTTP_400_BAD_REQUEST)

        except Exception as error:
            print(error)
            return Response({"detail":"{}".format(str(error))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def get_auto_subastado(self, request, *args, **kwargs):

        try:

            user = request.user
            idAutoSubastado = self.request.GET.get("id", None)

            if idAutoSubastado is not None:
                auto = AutoSubastado.objects.get(id = idAutoSubastado)
                serializer = AutoSubastadoConSubastaReadSerializer(
                    auto,
                    context={'profile': user.profile}
                )
                return Response(serializer.data, status=status.HTTP_200_OK)

            else:
                return Response({"detail": "No hay un auto seleccionado"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["post"],detail=True)
    def cerrar_subasta(self, request, *args, **kwargs):

        try:
            with transaction.atomic():

                subasta = self.get_object()
                if subasta.cerrado == True:
                    return Response({"detail": "La subasta ya esta cerrada"}, status=status.HTTP_400_BAD_REQUEST)

                autoSubastado = AutoSubastado.objects.filter(subasta = subasta.id)

                for itemAuto in autoSubastado:
                    oferta_ganadora = itemAuto.ofertas.all().order_by("-monto")
                    if oferta_ganadora:
                        oferta_ganadora = oferta_ganadora[0]
                        tarjetas = oferta_ganadora.profile.tarjetas.all()
                        for item in tarjetas:
                            idTarjeta = item
                            break
                        NotaCredito.objects.create(
                            fecha_hora = datetime.now(),
                            monto = oferta_ganadora.monto,
                            profile = oferta_ganadora.profile,
                            tarjeta = idTarjeta,
                            concepto = 'Compra de auto subastado',
                        )

                        AutosComprados.objects.create(
                            fecha_hora = datetime.now(),
                            monto = oferta_ganadora.monto,
                            profile = oferta_ganadora.profile,
                            autoSubastado_id = itemAuto.id
                        )

                subasta.cerrado = True
                subasta.save()

                return Response({"detail": "Subasta cerrada"}, status=status.HTTP_200_OK)

            return Response({"detail": "Hubo un error en el proceso"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @action(methods=["get"], detail=False)
    def get_autos_comprados(self, request, *args, **kwargs):

        profile = request.user.profile

        try:

            queryset = AutosComprados.objects.filter(profile = profile)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = AutosCompradosSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @action(methods=["get"], detail=True)
    def retrive_autos_comprados(self, request, *args, **kwargs):

        id = self.kwargs["pk"]

        try:

            queryset = AutosComprados.objects.get(id=id)
            serializer = AutosCompradosSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as error:
            print(error)
            return Response({"detail":str(error)}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["get"], detail=False)
    def get_notas_credito(self, request, *args, **kwargs):

        profile = request.user.profile

        try:

            queryset = NotaCredito.objects.filter(profile=profile)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = NotaCreditoReadSerializer(queryset, many=True)
            return self.get_paginated_response(serializer.data)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(methods=["get"], detail=True)
    def get_nota_credito(self, request, *args, **kwargs):

        id = self.kwargs["pk"]

        try:

            item = NotaCredito.objects.get(id=id)
            serializer = NotaCreditoReadSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)