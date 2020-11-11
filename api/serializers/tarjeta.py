from rest_framework import serializers
from api.models import Tarjeta


class TarjetaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tarjeta
        fields = (
            "numero",
            "banco",
            "profile",
        )


class TarjetaReadSerializer(serializers.ModelSerializer):

    banco = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tarjeta
        fields = "__all__"

    def get_banco(self, obj):
        return {
            "id": obj.banco.id,
            "nombre": obj.banco.nombre,
            "direccion": obj.banco.direccion,
            "telefono": obj.banco.telefono,
        }
