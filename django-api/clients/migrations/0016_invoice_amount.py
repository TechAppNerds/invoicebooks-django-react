# Generated by Django 4.0.1 on 2023-06-13 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0015_invoice_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='amount',
            field=models.DecimalField(db_index=True, decimal_places=2, default=0.0, max_digits=15),
            preserve_default=False,
        ),
    ]
