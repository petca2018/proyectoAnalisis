from rest_framework import serializers
from api.models import Auto


class AutoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Auto
        fields = (
            "tipo",
            "modelo",
            "color",
            "año",
        )


class AutoReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Auto
        fields = "__all__"
