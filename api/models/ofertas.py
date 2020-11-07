from django.db import models


class Ofertas(models.Model):

    fecha_hora = models.DateTimeField()
    monto = models.FloatField()
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name='ofertas')
    autoSubastado = models.ForeignKey('AutoSubastado', on_delete=models.CASCADE, related_name='ofertas')

    estado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}). {} {} {}".format(self.id, self.fecha_hora, self.monto, self.autoSubastado)

