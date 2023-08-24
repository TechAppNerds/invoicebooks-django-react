from django.db import models
from accounts.models import Business
from business.models import SalesTax

class Data(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', related_name='%(class)s_business_id', on_delete=models.CASCADE)
    category = models.CharField(db_index=True, max_length=50)
    date = models.CharField(db_index=True, max_length=20)
    merchant = models.CharField(db_index=True, max_length=150)
    description = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    sales_taxes = models.ManyToManyField(SalesTax)
    grand_total = models.DecimalField(db_index=True, max_digits=15, decimal_places=2)
    assign_to = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    recurring = models.BooleanField(db_index=True, default=False)
    currency = models.CharField(db_index=True, max_length=100)

    class Meta:
        verbose_name = 'Expense'
        verbose_name_plural = 'Expenses'

class Bills(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    vendor = models.CharField(db_index=True, max_length=50)
    issued_date = models.CharField(db_index=True, max_length=20)
    due_date = models.CharField(db_index=True, max_length=20)
    optional = models.CharField(db_index=True, blank=True, null=True, max_length=25)
    language = models.CharField(db_index=True, max_length=50)
    currency = models.CharField(db_index=True, max_length=100)

    class Meta:
        verbose_name = 'Bill'
        verbose_name_plural = 'Bills'

class BillLineItem(models.Model):
    bill = models.ForeignKey(Bills, db_index=True, db_column='bill_id', on_delete=models.CASCADE)
    description = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    category = models.CharField(db_index=True, max_length=50)
    rate = models.DecimalField(db_index=True, blank=True, null=True, max_digits=15, decimal_places=2)
    quantity = models.IntegerField(db_index=True, blank=True, null=True, default=10)
    sales_taxes = models.ManyToManyField(SalesTax)

    class Meta:
        verbose_name = 'BillLineItem'
        verbose_name_plural = 'BillLineItems'

class Vendor(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    company_name = models.CharField(db_index=True, null=True, max_length=255)
    first_name = models.CharField(db_index=True, null=True, max_length=150)
    last_name = models.CharField(db_index=True, null=True, max_length=150)
    account_number = models.CharField(db_index=True, blank=True, null=True, max_length=25)
    email = models.EmailField(db_index=True, unique=True, default=None, null=True, blank=True, max_length=255)
    website = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    phone_number = models.CharField(db_index=True, null=True, max_length=30)
    country = models.CharField(db_index=True, null=True, max_length=50)
    address_1 = models.CharField(db_index=True, null=True, max_length=255)
    address_2 = models.CharField(db_index=True, null=True, max_length=255)
    city = models.CharField(db_index=True, null=True, max_length=255)
    state = models.CharField(db_index=True, null=True, max_length=255)
    postal_code = models.CharField(db_index=True, null=True, max_length=20)
    language = models.CharField(db_index=True, max_length=50)
    currency = models.CharField(db_index=True, max_length=100)
    sales_taxes = models.ManyToManyField(SalesTax)

    class Meta:
        verbose_name = 'Vendor'
        verbose_name_plural = 'Vendors'
