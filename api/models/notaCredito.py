from django.db import models


class NotaCredito(models.Model):

    fecha_hora = models.DateTimeField()
    monto = models.CharField(max_length=20)
    profile = models.ForeignKey('profile', on_delete=models.CASCADE, related_name="notaCredito")
    concepto = models.CharField(max_length=500)
    tarjeta = models.ForeignKey('tarjeta', on_delete=models.CASCADE, related_name="notaCredito")

    estado = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}). {} {} {} {}".format(self.id, self.monto, self.profile, self.concepto, self.tarjeta)

