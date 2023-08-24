from django.db import models
from accounts.models import Business
from clients.models import Invoice, Data
from business.models import SalesTax

class InvoicePayments(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    invoice = models.ForeignKey(Invoice, db_index=True, db_column='invoice_id', on_delete=models.CASCADE)
    payment_date = models.CharField(db_index=True, max_length=20)
    payment_type = models.CharField(db_index=True, max_length=50)
    amount = models.DecimalField(db_index=True, max_digits=15, decimal_places=2)
    notes = models.CharField(db_index=True, blank=True, null=True, max_length=255)

    class Meta:
        verbose_name = 'InvoicePayments'
        verbose_name_plural = 'InvoicePayments'

class CheckoutLink(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    name = models.CharField(db_index=True, max_length=150)
    description = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    terms_conditions = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    price = models.DecimalField(db_index=True, max_digits=15, decimal_places=2)
    sales_taxes = models.ManyToManyField(SalesTax)
    online_payments = models.BooleanField(db_index=True, default=True)
    collect_shipping_address = models.BooleanField(db_index=True, default=False)
    currency = models.CharField(db_index=True, max_length=100)
    notifications = models.BooleanField(db_index=True, default=True)

    class Meta:
        verbose_name = 'CheckoutLink'
        verbose_name_plural = 'CheckoutLinks'

class OtherIncome(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    client = models.ForeignKey(Data, db_index=True, db_column='client_id', on_delete=models.CASCADE)
    source = models.CharField(db_index=True, max_length=150)
    income_category = models.CharField(db_index=True, max_length=50)
    date = models.CharField(db_index=True, max_length=20)
    payment_type = models.CharField(db_index=True, max_length=50)
    sales_taxes = models.ManyToManyField(SalesTax)
    grand_total = models.DecimalField(db_index=True, max_digits=15, decimal_places=2)
    currency_code = models.CharField(db_index=True, max_length=5)
    description = models.CharField(db_index=True, blank=True, null=True, max_length=255)

    class Meta:
        verbose_name = 'OtherIncome'
        verbose_name_plural = 'OtherIncome'
