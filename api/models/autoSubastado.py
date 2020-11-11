from django.db import models


class AutoSubastado(models.Model):

    NUEVO = 'Nuevo'
    USADO = 'Usado'
    CHOCADO = 'Chocado'
    OPTIMO = 'Optimo'

    CONDICIONES_AUTO = (
        (NUEVO, 'Nuevo'),
        (USADO, 'Usado'),
        (CHOCADO, 'Chocado'),
        (OPTIMO, 'Optimo')
    )

    subasta = models.ForeignKey('subasta', on_delete=models.CASCADE, related_name='autoSubastado')
    auto = models.ForeignKey('auto', on_delete=models.CASCADE, related_name='autoSubastado')
    provedor = models.ForeignKey('proveedor', on_delete=models.CASCADE, related_name='autoSubastado')
    precio_base = models.FloatField()
    condiciones = models.CharField(max_length=10, choices=CONDICIONES_AUTO, default=OPTIMO)

    estado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}). {} {}".format(self.id, self.subasta, self.auto)

