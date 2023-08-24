from django.db import models
from accounts.models import Business

class Contact(models.Model):
    business = models.ForeignKey(Business, db_column='business_id', on_delete=models.CASCADE)
    first_name = models.CharField(db_index=True, max_length=150)
    last_name = models.CharField(db_index=True, max_length=150)
    email = models.EmailField(db_index=True, unique=True, max_length=255)
    phone_number_1 = models.CharField(db_index=True, max_length=30)
    phone_number_2 = models.CharField(db_index=True, max_length=30)

    class Meta:
        # abstract = True
        verbose_name = 'SecondaryContacts'
        verbose_name_plural = 'SecondaryContacts'
