# Generated by Django 4.0.1 on 2023-02-15 18:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Email',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recurring_invoice_sent', models.BooleanField(default=True)),
                ('comment_added_on_invoice', models.BooleanField(default=True)),
                ('online_payment_received', models.BooleanField(default=True)),
                ('comment_added_on_estimate_or_proposal', models.BooleanField(default=True)),
                ('estimate_or_proposal_accepted', models.BooleanField(default=True)),
                ('comment_added_on_project', models.BooleanField(default=True)),
                ('post_made_on_project', models.BooleanField(default=True)),
                ('user', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='user_id', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'EmailNotifications',
                'verbose_name_plural': 'EmailNotifications',
            },
        ),
    ]