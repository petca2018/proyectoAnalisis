from django.db import models


class Tarjeta(models.Model):

    numero = models.CharField(max_length=20)
    banco = models.ForeignKey('Banco', on_delete=models.CASCADE, related_name='tarjetas')
    profile = models.ForeignKey('profile', on_delete=models.CASCADE, related_name='tarjetas')

    estado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}). {} {} {}".format(self.id, self.numero, self.banco, self.profile)

