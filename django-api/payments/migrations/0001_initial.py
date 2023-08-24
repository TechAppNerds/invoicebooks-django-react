# Generated by Django 4.0.1 on 2023-06-12 01:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('business', '0004_alter_item_business'),
        ('clients', '0010_alter_invoicelineitem_options_invoice_deposit_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='OtherIncome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source', models.CharField(db_index=True, max_length=150)),
                ('income_category', models.CharField(db_index=True, max_length=50)),
                ('date', models.CharField(db_index=True, max_length=20)),
                ('payment_type', models.CharField(db_index=True, max_length=50)),
                ('grand_total', models.DecimalField(db_index=True, decimal_places=2, max_digits=15)),
                ('currency_code', models.CharField(db_index=True, max_length=5)),
                ('description', models.CharField(blank=True, db_index=True, max_length=255, null=True)),
                ('client', models.ForeignKey(db_column='client_id', on_delete=django.db.models.deletion.CASCADE, to='clients.data')),
                ('sales_taxes', models.ManyToManyField(to='business.SalesTax')),
            ],
            options={
                'verbose_name': 'OtherIncome',
                'verbose_name_plural': 'OtherIncome',
            },
        ),
        migrations.CreateModel(
            name='InvoicePayments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_date', models.CharField(db_index=True, max_length=20)),
                ('payment_type', models.CharField(db_index=True, max_length=50)),
                ('amount', models.DecimalField(db_index=True, decimal_places=2, max_digits=15)),
                ('notes', models.CharField(blank=True, db_index=True, max_length=255, null=True)),
                ('invoice', models.ForeignKey(db_column='invoice_id', on_delete=django.db.models.deletion.CASCADE, to='clients.invoice')),
            ],
            options={
                'verbose_name': 'InvoicePayments',
                'verbose_name_plural': 'InvoicePayments',
            },
        ),
        migrations.CreateModel(
            name='CheckoutLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=150)),
                ('description', models.CharField(blank=True, db_index=True, max_length=255, null=True)),
                ('terms_conditions', models.CharField(blank=True, db_index=True, max_length=255, null=True)),
                ('price', models.DecimalField(db_index=True, decimal_places=2, max_digits=15)),
                ('online_payments', models.BooleanField(db_index=True, default=True)),
                ('collect_shipping_address', models.BooleanField(db_index=True, default=False)),
                ('currency', models.CharField(db_index=True, max_length=100)),
                ('notifications', models.BooleanField(db_index=True, default=True)),
                ('sales_taxes', models.ManyToManyField(to='business.SalesTax')),
            ],
            options={
                'verbose_name': 'CheckoutLink',
                'verbose_name_plural': 'CheckoutLinks',
            },
        ),
    ]
