# Generated by Django 4.0.1 on 2023-06-09 13:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('business', '0003_remove_service_invoice_goods_item_business_and_more'),
        ('clients', '0008_secondarycontact_client_alter_invoicegoods_business_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='InvoiceLineItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, db_index=True, max_length=150, null=True)),
                ('description', models.CharField(blank=True, db_index=True, max_length=255, null=True)),
                ('rate', models.DecimalField(blank=True, db_index=True, decimal_places=2, max_digits=9, null=True)),
                ('quantity', models.IntegerField(blank=True, db_index=True, default=10, null=True)),
                ('invoice', models.ForeignKey(db_column='invoice_id', null=True, on_delete=django.db.models.deletion.CASCADE, to='clients.invoice')),
                ('sales_taxes', models.ManyToManyField(to='business.SalesTax')),
            ],
            options={
                'verbose_name': 'InvoiceGoods',
                'verbose_name_plural': 'InvoiceGoods',
            },
        ),
        migrations.AlterField(
            model_name='data',
            name='currency',
            field=models.CharField(db_index=True, max_length=100),
        ),
        migrations.DeleteModel(
            name='InvoiceGoods',
        ),
    ]
