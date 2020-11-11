from rest_framework import serializers
from api.models import Proveedor


class ProveedorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proveedor
        fields = (
            "nombre",
            "direccion",
            "telefono",
        )


class ProveedorReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proveedor
        fields = "__all__"
