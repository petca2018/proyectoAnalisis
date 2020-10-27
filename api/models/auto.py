from django.db import models


class Auto(models.Model):

    tipo = models.CharField(max_length=45)
    modelo = models.CharField(max_length=45)
    color = models.CharField(max_length=45)
    año = models.CharField(max_length=4)

    estado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}). {} {} {} {}".format(self.id, self.tipo, self.modelo, self.año, self.color)

