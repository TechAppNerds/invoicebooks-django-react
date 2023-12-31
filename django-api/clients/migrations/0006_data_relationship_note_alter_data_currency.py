# Generated by Django 4.0.1 on 2023-05-31 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0005_paymentreminder_personal_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='relationship_note',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='data',
            name='currency',
            field=models.CharField(db_index=True, default='USD', max_length=100),
        ),
    ]
