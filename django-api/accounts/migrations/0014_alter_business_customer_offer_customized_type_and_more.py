# Generated by Django 4.0.1 on 2023-06-12 01:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_rename_date_joined_user_registration_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business',
            name='customer_offer_customized_type',
            field=models.CharField(db_index=True, max_length=30),
        ),
        migrations.AlterField(
            model_name='business',
            name='industry',
            field=models.CharField(db_index=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='business',
            name='time_completed_service',
            field=models.CharField(db_index=True, max_length=50),
        ),
    ]
