from django.db import models


class FotoAutoSubastado(models.Model):

    autoSubastado = models.ForeignKey(
        'AutoSubastado',
        on_delete=models.CASCADE,
        related_name='fotos'
    )
    foto = models.ImageField(upload_to='autoSubastado')

    estado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}). {} {}".format(self.id, self.autoSubastado, self.foto)

