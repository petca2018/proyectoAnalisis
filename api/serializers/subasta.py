from rest_framework import serializers
from api.models import Subasta, AutoSubastado
from api.serializers import AutoSubastadoReadSerializer

class SubastaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subasta
        fields = (
            'fecha_inicio',
            'fecha_fin',
            'autoSubastado',
        )


class SubastaReadSerializer(serializers.ModelSerializer):

    autoSubastado = AutoSubastadoReadSerializer(many=True, read_only=True)
    total_autos = serializers.SerializerMethodField()

    class Meta:
        model = Subasta
        fields = (
            'id',
            'fecha_inicio',
            'fecha_fin',
            'autoSubastado',
            'cerrado',
            "total_autos",
        )

    def get_total_autos(self,obj):
        return AutoSubastado.objects.filter(estado=True,subasta=obj.id).count()
