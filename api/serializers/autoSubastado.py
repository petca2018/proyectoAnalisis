from rest_framework import serializers
from api.models import AutoSubastado, FotoAutoSubastado, Ofertas, AutosComprados
from api.serializers import ProveedorReadSerializer, AutoReadSerializer, ProfileReadSerializer

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
            'condiciones',
            'descripcion',
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
            "descripcion",
            "fotos",
            "estado",
            "creado",
            "modificado"
        ]

class AutoSubastadoConSubastaReadSerializer(serializers.ModelSerializer):

    auto = AutoReadSerializer(read_only=True)
    provedor = ProveedorReadSerializer(read_only=True)
    fotos = FotoAutoSubastadoReadSerializer(many=True, read_only=True)
    subasta = serializers.SerializerMethodField()
    ofertas = serializers.SerializerMethodField()

    class Meta:
        model = AutoSubastado
        fields = [
            "id",
            "subasta",
            "auto",
            "provedor",
            "precio_base",
            "condiciones",
            "descripcion",
            "ofertas",
            "fotos",
            "estado",
            "creado",
            "modificado"
        ]

    def get_subasta(self, obj):
        return {
            "id": obj.subasta.id,
            "fecha_inicio": obj.subasta.fecha_inicio,
            "fecha_fin": obj.subasta.fecha_fin,
            "cerrado": obj.subasta.cerrado,
        }

    def get_ofertas(self, obj):
        profile = self.context.get('profile', None)
        ofertas = Ofertas.objects.filter(autoSubastado = obj.id).order_by('-id')
        lista = []
        for item in ofertas:
            resultado = {
                "id": item.id,
                "fecha_hora": item.fecha_hora,
                "monto": item.monto,
                "profile": item.profile.id,
                "autoSubastado": item.autoSubastado.id,
            }
            if resultado["profile"] == profile.id:
                resultado["mi_oferta"] = True
            lista.append(resultado)
        return lista

class AutosCompradosSerializer(serializers.ModelSerializer):

    profile = ProfileReadSerializer(read_only=True)
    autoSubastado = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = AutosComprados
        fields = "__all__"

    def get_autoSubastado(self, obj):
        serializer = AutoSubastadoConSubastaReadSerializer(
            obj.autoSubastado,
            context={ "profile": obj.profile }
        )
        return serializer.data
