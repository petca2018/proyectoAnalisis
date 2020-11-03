from rest_framework import serializers
from api.models import AutoSubastado, FotoAutoSubastado
from api.serializers import ProveedorReadSerializer, AutoReadSerializer

class FotoAutoSubastadoReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = FotoAutoSubastado
        fields = (
            'id',
            'foto',
        )

class AutoSubastadoSerializer(serializers.ModelSerializer):

    class Meta:
        model = AutoSubastado
        fields = (
            'subasta',
            'auto',
            'provedor',
            'precio_base',
            'condiciones'
        )


class AutoSubastadoReadSerializer(serializers.ModelSerializer):

    auto = AutoReadSerializer(read_only=True)
    provedor = ProveedorReadSerializer(read_only=True)
    fotos = FotoAutoSubastadoReadSerializer(many=True, read_only=True)

    class Meta:
        model = AutoSubastado
        fields = [
            "id",
            "subasta",
            "auto",
            "provedor",
            "precio_base",
            "condiciones",
            "fotos",
            "estado",
            "creado",
            "modificado"
        ]


