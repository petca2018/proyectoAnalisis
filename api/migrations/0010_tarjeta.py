# Generated by Django 2.2.13 on 2020-11-10 03:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_banco'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tarjeta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.CharField(max_length=20)),
                ('estado', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('banco', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tarjetas', to='api.Banco')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tarjetas', to='api.Profile')),
            ],
        ),
    ]