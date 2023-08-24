from django.db import models
from accounts.models import Business
# from clients.models import InvoiceGoods
# from sales.models import Tax

class SalesTax(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    rate = models.DecimalField(db_index=True, max_digits=6, decimal_places=3)
    name = models.CharField(db_index=True, null=True, max_length=20)
    number = models.CharField(db_index=True, null=True, max_length=30)

    class Meta:
        verbose_name = 'SalesTax'
        verbose_name_plural = 'SalesTaxes'

class Item(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    # invoice_goods = models.ForeignKey(InvoiceGoods, db_index=True, db_column='invoice_goods_id', on_delete=models.CASCADE)
    name = models.CharField(db_index=True, max_length=150)
    description = models.CharField(db_index=True, null=True, max_length=255)
    rate = models.DecimalField(db_index=True, null=True, max_digits=9, decimal_places=2)
    current_stock = models.IntegerField(db_index=True, null=True, default=10)
    # sales_taxes = models.ForeignKey(Tax, db_index=True, on_delete=models.CASCADE)
    sales_taxes = models.ManyToManyField(SalesTax)
    # sales_taxes = models.ManyToManyField(SalesTax, related_name="sales_taxes")

    class Meta:
        verbose_name = 'Item'
        verbose_name_plural = 'Items'

class Service(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    name = models.CharField(db_index=True, max_length=150)
    description = models.CharField(db_index=True, null=True, max_length=255)
    rate = models.DecimalField(db_index=True, null=True, max_digits=9, decimal_places=2)
    billable = models.BooleanField(db_index=True, default=True)
    always_add_to_projects = models.BooleanField(db_index=True, default=False)
    sales_taxes = models.ManyToManyField(SalesTax)
    # sales_taxes = models.ManyToManyField(SalesTax, related_name="sales_taxes")

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
