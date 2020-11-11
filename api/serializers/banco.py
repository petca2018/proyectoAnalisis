from rest_framework import serializers
from api.models import Banco


class BancoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Banco
        fields = (
            "nombre",
            "direccion",
            "telefono",
        )


class BancoReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Banco
        fields = "__all__"
