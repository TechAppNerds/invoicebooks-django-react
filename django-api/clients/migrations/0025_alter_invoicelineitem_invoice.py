# Generated by Django 4.0.1 on 2023-07-13 00:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0024_alter_invoicelineitem_invoice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoicelineitem',
            name='invoice',
            field=models.ForeignKey(db_column='invoice_id', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invoice_line_items', to='clients.invoice'),
        ),
    ]
