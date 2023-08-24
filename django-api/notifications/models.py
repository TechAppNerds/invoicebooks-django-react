from django.db import models
from accounts.models import User, Business


class Email(models.Model):
    # business = models.ForeignKey(Business, db_column='business_id', on_delete=models.CASCADE)
    business = models.OneToOneField(Business, db_column='business_id', on_delete=models.CASCADE)
    recurring_invoice_sent = models.BooleanField(default=True)
    comment_added_on_invoice = models.BooleanField(default=True)
    online_payment_received = models.BooleanField(default=True)
    comment_added_on_estimate_or_proposal = models.BooleanField(default=True)
    estimate_or_proposal_accepted = models.BooleanField(default=True)
    comment_added_on_project = models.BooleanField(default=True)
    post_made_on_project = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'EmailNotification'
        verbose_name_plural = 'EmailNotifications'
