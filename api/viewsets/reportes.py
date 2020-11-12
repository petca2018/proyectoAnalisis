import json
import calendar
from datetime import datetime

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db.models import Sum

from api.models import Subasta, AutosComprados, AutoSubastado
from api.serializers import SubastaSerializer, SubastaReadSerializer, AutosCompradosSerializer


def nombre_mes(mes):
    if mes == 1:
        return "Enero"
    elif mes == 2:
        return "Febrero"
    elif mes == 3:
        return "Marzo"
    elif mes == 4:
        return "Abril"
    elif mes == 5:
        return "Mayo"
    elif mes == 6:
        return "Junio"
    elif mes == 7:
        return "Julio"
    elif mes == 8:
        return "Agosto"
    elif mes == 9:
        return "Septiembre"
    elif mes == 10:
        return "Octubre"
    elif mes == 11:
        return "Noviembre"
    elif mes == 12:
        return "Diciembre"
    else:
        return "Mes invalido"

class ReportesViewset(viewsets.ModelViewSet):

    queryset = Subasta.objects.filter(estado=True)

    def get_serializer_class(self):
            return AutosCompradosSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


    def perform_destroy(self, instance):
        return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


    def create(self, request, *args, **kwargs):
        return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


    def update(self, request, *args, **kwargs):
        return Response({}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


    @action(methods=["get"], detail=False)
    def reporte_autos_comprados(self, request, *args, **kwargs):

        try:
            total_autos_comprados = AutosComprados.objects.count()
            total_autos_subastados = AutoSubastado.objects.count()

            obj = [
                ['Comparativa', 'Autos subastados', 'Autos comprados'],
                ["Total", total_autos_subastados, total_autos_comprados]
            ]

            return Response(obj, status=status.HTTP_200_OK)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def reporte_ventas(self, request, *args, **kwargs):

        try:

            cliente = self.request.GET.get('cliente', None)
            print(cliente)

            lista_meses = [[
                'Mes', 'Monto total', { "role": 'style' },
                { "sourceColumn": 0,"role": 'annotation',"type": 'string',"calc": 'stringify' }
            ]]

            for mes in range(1,13):

                # calculo de total para el año actual
                ################################################
                ultimo_dia_mes_actual = calendar.monthrange(datetime.now().year,mes)[1]

                fecha_inicio_actual = datetime.strptime(
                    "{}-{}-{}".format(datetime.now().year, mes, 1),
                    "%Y-%m-%d"
                )
                fecha_final_actual = datetime.strptime(
                    "{}-{}-{}".format(datetime.now().year, mes, ultimo_dia_mes_actual),
                    "%Y-%m-%d"
                )

                queryset = AutosComprados.objects.filter(
                    fecha_hora__gte = fecha_inicio_actual,
                    fecha_hora__lt = fecha_final_actual,
                )
                if cliente:
                    queryset = queryset.filter(profile = cliente)
                monto_total = queryset.aggregate(monto_total=Sum('monto'))
                total_autos = queryset.count()

                # Creacion de lista para el reporte
                ##################################################
                monto_total = monto_total.get('monto_total', None)
                if monto_total == None:
                    monto_total = 0

                labelTotalAutos = "{} Auto".format(total_autos) if total_autos == 1 else "{} Autos".format(total_autos)
                lista_meses.append([
                        nombre_mes(mes),
                        monto_total,
                        "color: #c4183c",
                        labelTotalAutos
                    ])

            list_reporte = lista_meses

            return Response(list_reporte, status= status.HTTP_200_OK)

        except Exception as error:
            print(error)
            return Response({"detail": str(error)}, status= status.HTTP_400_BAD_REQUEST)

