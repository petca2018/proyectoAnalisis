from rest_framework import serializers
from api.models import NotaCredito
from api.serializers import ProfileReadSerializer,TarjetaReadSerializer

class NotaCreditoSerializer(serializers.ModelSerializer):

    class Meta:
        model = NotaCredito
        fields = (
            "fecha_hora",
            "monto",
            "concepto",
            "profile",
            "tarjeta",
        )


class NotaCreditoReadSerializer(serializers.ModelSerializer):

    profile = ProfileReadSerializer(read_only=True)
    tarjeta = TarjetaReadSerializer(read_only=True)

    class Meta:
        model = NotaCredito
        fields = "__all__"
