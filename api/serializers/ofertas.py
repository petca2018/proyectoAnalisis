from rest_framework import serializers
from api.models import Ofertas
from api.serializers import ProfileReadSerializer, AutoSubastadoReadSerializer

class OfertasSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ofertas
        fields = [
            "fecha_hora",
            "monto",
            "profile",
            "autoSubastado",
        ]


class OfertasReadSerializer(serializers.ModelSerializer):

    profile = ProfileReadSerializer(read_only=True)
    autoSubastado = AutoSubastadoReadSerializer(read_only=True)

    class Meta:
        model = Ofertas
        fields = "__all__"
