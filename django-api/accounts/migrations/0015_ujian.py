# Generated by Django 4.0.1 on 2023-06-14 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_alter_business_customer_offer_customized_type_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ujian',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('test', models.CharField(db_index=True, max_length=50)),
            ],
        ),
    ]
