# Generated by Django 4.0.1 on 2023-05-23 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0003_alter_data_late_fee_amount_alter_data_number_days'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='email',
            field=models.EmailField(blank=True, db_index=True, max_length=255, null=True, unique=True),
        ),
    ]
