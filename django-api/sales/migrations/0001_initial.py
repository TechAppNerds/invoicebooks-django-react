# Generated by Django 4.0.1 on 2023-02-21 21:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0011_remove_user_all_email_notifications_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tax',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rate', models.DecimalField(db_index=True, decimal_places=3, max_digits=6)),
                ('name', models.CharField(db_index=True, max_length=20, null=True)),
                ('number', models.CharField(db_index=True, max_length=30, null=True)),
                ('business', models.ForeignKey(db_column='business_id', on_delete=django.db.models.deletion.CASCADE, to='accounts.business')),
            ],
            options={
                'verbose_name': 'SalesTax',
                'verbose_name_plural': 'SalesTaxes',
            },
        ),
    ]