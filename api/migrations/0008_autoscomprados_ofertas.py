# Generated by Django 2.2.13 on 2020-11-05 00:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_subasta_cerrado'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ofertas',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_hora', models.DateTimeField()),
                ('monto', models.FloatField()),
                ('estado', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('autoSubastado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ofertas', to='api.AutoSubastado')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ofertas', to='api.Profile')),
            ],
        ),
        migrations.CreateModel(
            name='AutosComprados',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_hora', models.DateTimeField()),
                ('monto', models.FloatField()),
                ('estado', models.BooleanField(default=True)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('modificado', models.DateTimeField(auto_now=True)),
                ('autoSubastado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='autos_comprados', to='api.AutoSubastado')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='autos_comprados', to='api.Profile')),
            ],
        ),
    ]
