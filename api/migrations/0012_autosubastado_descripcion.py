# Generated by Django 2.2.13 on 2020-11-12 01:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_notacredito'),
    ]

    operations = [
        migrations.AddField(
            model_name='autosubastado',
            name='descripcion',
            field=models.CharField(blank=True, max_length=3000, null=True),
        ),
    ]
