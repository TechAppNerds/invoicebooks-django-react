# Generated by Django 4.0.1 on 2023-07-12 00:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0016_delete_ujian'),
        ('clients', '0021_alter_invoice_theme_logo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='estimateproposallineitem',
            name='is_estimate',
        ),
        migrations.AddField(
            model_name='estimate',
            name='business',
            field=models.ForeignKey(db_column='business_id', default=None, on_delete=django.db.models.deletion.CASCADE, to='accounts.business'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='estimate',
            name='number',
            field=models.CharField(db_index=True, default='', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='proposal',
            name='business',
            field=models.ForeignKey(db_column='business_id', default=None, on_delete=django.db.models.deletion.CASCADE, to='accounts.business'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='proposal',
            name='number',
            field=models.CharField(db_index=True, default='', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='retainer',
            name='notes',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='retainer',
            name='terms',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='data',
            name='business',
            field=models.ForeignKey(db_column='business_id', default=0, on_delete=django.db.models.deletion.CASCADE, to='accounts.business'),
            preserve_default=False,
        ),
    ]
