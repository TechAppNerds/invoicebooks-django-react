# Generated by Django 4.0.1 on 2023-02-22 14:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_remove_user_all_email_notifications_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='logged_in',
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name='business',
            name='all_email_notifications',
            field=models.BooleanField(db_index=True, default=True),
        ),
    ]