# Generated by Django 4.0.1 on 2023-07-12 00:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0016_delete_ujian'),
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='checkoutlink',
            name='business',
            field=models.ForeignKey(db_column='business_id', default=None, on_delete=django.db.models.deletion.CASCADE, to='accounts.business'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='invoicepayments',
            name='business',
            field=models.ForeignKey(db_column='business_id', default=None, on_delete=django.db.models.deletion.CASCADE, to='accounts.business'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='otherincome',
            name='business',
            field=models.ForeignKey(db_column='business_id', default=None, on_delete=django.db.models.deletion.CASCADE, to='accounts.business'),
            preserve_default=False,
        ),
    ]