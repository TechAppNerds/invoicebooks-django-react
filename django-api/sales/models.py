from django.db import models
from accounts.models import Business

# class Tax(models.Model):
#     business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
#     rate = models.DecimalField(db_index=True, max_digits=6, decimal_places=3)
#     name = models.CharField(db_index=True, null=True, max_length=20)
#     number = models.CharField(db_index=True, null=True, max_length=30)

#     class Meta:
#         verbose_name = 'SalesTax'
#         verbose_name_plural = 'SalesTaxes'
