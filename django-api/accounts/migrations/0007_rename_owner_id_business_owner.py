# Generated by Django 4.0.1 on 2023-01-03 19:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_rename_owner_business_owner_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='business',
            old_name='owner_id',
            new_name='owner',
        ),
    ]
