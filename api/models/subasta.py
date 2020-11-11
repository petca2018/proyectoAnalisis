from django.db import models


class Subasta(models.Model):

    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    cerrado = models.BooleanField(default=False)

    estado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}). {} {}".format(self.id, self.fecha_inicio, self.fecha_fin)

