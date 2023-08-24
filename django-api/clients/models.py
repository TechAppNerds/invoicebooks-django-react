from django.db import models
from accounts.models import Business
from business.models import SalesTax
# from sales.models import Tax

class Data(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    first_name = models.CharField(db_index=True, null=True, max_length=150)
    last_name = models.CharField(db_index=True, null=True, max_length=150)
    company_name = models.CharField(db_index=True, null=True, max_length=255)
    email = models.EmailField(db_index=True, unique=True, default=None, null=True, blank=True, max_length=255)
    phone_number = models.CharField(db_index=True, null=True, max_length=30)
    business_phone = models.CharField(db_index=True, null=True, max_length=30)
    mobile_phone = models.CharField(db_index=True, null=True, max_length=30)
    country = models.CharField(db_index=True, null=True, max_length=50)
    address_1 = models.CharField(db_index=True, null=True, max_length=255)
    address_2 = models.CharField(db_index=True, null=True, max_length=255)
    city = models.CharField(db_index=True, null=True, max_length=255)
    state = models.CharField(db_index=True, null=True, max_length=255)
    zip_code = models.CharField(db_index=True, null=True, max_length=20)
    tax_name = models.CharField(db_index=True, null=True, max_length=10)
    tax_number = models.CharField(db_index=True, null=True, max_length=21)
    send_payment_reminders = models.BooleanField(db_index=True, default=False)
    charge_late_fees = models.BooleanField(db_index=True, default=False)
    percentage_invoice_value = models.BooleanField(db_index=True, default=False)
    percentage_outstanding_balance = models.BooleanField(db_index=True, default=False)
    flat_fee = models.BooleanField(db_index=True, default=False)
    late_fee_amount = models.IntegerField(db_index=True, blank=True, null=True, default=10)
    number_days = models.IntegerField(db_index=True, blank=True, null=True, default=30)
    currency = models.CharField(db_index=True, max_length=100)
    language = models.CharField(db_index=True, default="English", max_length=50)
    invoice_attachments = models.BooleanField(db_index=True, default=False)
    relationship_note = models.CharField(db_index=True, blank=True, null=True, max_length=255)

    class Meta:
        verbose_name = 'Client'
        verbose_name_plural = 'Clients'

class PaymentReminder(models.Model):
    client = models.ForeignKey(Data, db_index=True, db_column='client_id', on_delete=models.CASCADE)
    number_days = models.IntegerField(db_index=True, default=5)
    due_date = models.CharField(db_index=True, default="after", max_length=10)
    personal_message = models.CharField(db_index=True, blank=True, null=True, max_length=255)

    class Meta:
        verbose_name = 'ClientsPaymentReminder'
        verbose_name_plural = 'ClientsPaymentReminders'

class SecondaryContact(models.Model):
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    client = models.ForeignKey(Data, db_index=True, db_column='client_id', on_delete=models.CASCADE)
    first_name = models.CharField(db_index=True, blank=True, null=True, max_length=150)
    last_name = models.CharField(db_index=True, blank=True, null=True, max_length=150)
    email = models.EmailField(db_index=True, unique=True, default=None, max_length=255)
    phone_number_1 = models.CharField(db_index=True, blank=True, null=True, max_length=30)
    phone_number_2 = models.CharField(db_index=True, blank=True, null=True, max_length=30)

    class Meta:
        verbose_name = 'ClientsSecondaryContact'
        verbose_name_plural = 'ClientsSecondaryContacts'

def theme_upload_path(instance, filename):
    return "/".join(["invoices", f"{str(instance.id).rjust(7, '0')}", "logo", filename])

class Invoice(models.Model):
    client = models.ForeignKey(Data, db_index=True, db_column='client_id', on_delete=models.CASCADE)
    # billed_to = models.ForeignKey(Data, db_index=True, db_column='billed_to', on_delete=models.CASCADE)
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    # client_company = models.CharField(db_index=True, null=True, max_length=255)
    issued_date = models.CharField(db_index=True, max_length=20)
    due_date = models.CharField(db_index=True, max_length=20)
    number = models.CharField(db_index=True, max_length=10)
    reference = models.CharField(db_index=True, blank=True, null=True, max_length=25)
    status = models.CharField(db_index=True, default="Draft", max_length=20)
    amount = models.DecimalField(db_index=True, max_digits=15, decimal_places=2)
    discount = models.DecimalField(db_index=True, blank=True, null=True, max_digits=3, decimal_places=2)
    deposit = models.CharField(db_index=True, blank=True, null=True, max_length=20)
    notes = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    terms = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    online_payments = models.BooleanField(db_index=True, default=False)
    theme_color = models.CharField(db_index=True, default='#4f697a', max_length=10)
    theme_font = models.CharField(db_index=True, default='Modern (Helvetica)', max_length=20)
    theme_logo = models.ImageField(db_index=True, blank=True, null=True, upload_to=theme_upload_path, max_length=255)
    currency = models.CharField(db_index=True, default="USD — US Dollar", max_length=100)
    language = models.CharField(db_index=True, default="English", max_length=50)
    recurring = models.BooleanField(db_index=True, default=False)

    class Meta:
        verbose_name = 'ClientsInvoice'
        verbose_name_plural = 'ClientsInvoices'

# class InvoiceGoods(models.Model):
class InvoiceLineItem(models.Model):
    invoice = models.ForeignKey(Invoice, db_index=True, null=True, db_column='invoice_id', related_name='invoice_line_items', on_delete=models.CASCADE)
    name = models.CharField(db_index=True, blank=True, null=True, max_length=150)
    description = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    rate = models.DecimalField(db_index=True, blank=True, null=True, max_digits=15, decimal_places=2)
    quantity = models.IntegerField(db_index=True, blank=True, null=True, default=10)
    sales_taxes = models.ManyToManyField(SalesTax)
    # sales_taxes = models.ManyToManyField(SalesTax, related_name="sales_taxes")

    class Meta:
        verbose_name = 'InvoiceLineItem'
        verbose_name_plural = 'InvoiceLineItems'

class Retainer(models.Model):
    # billed_to = models.ForeignKey(Data, db_index=True, db_column='billed_to', on_delete=models.CASCADE)
    client = models.ForeignKey(Data, db_index=True, db_column='client_id', on_delete=models.CASCADE)
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    start_date = models.CharField(db_index=True, max_length=20)
    period = models.CharField(db_index=True, max_length=10)
    fees_per_period = models.DecimalField(db_index=True, max_digits=15, decimal_places=2)
    hours_per_period = models.DecimalField(db_index=True, max_digits=9, decimal_places=2)
    rate = models.DecimalField(db_index=True, max_digits=15, decimal_places=2)
    issued_date = models.CharField(db_index=True, max_length=20)
    number_invoices = models.CharField(db_index=True, max_length=30)
    invoice_delivery = models.CharField(db_index=True, max_length=60)
    reference = models.CharField(db_index=True, blank=True, null=True, max_length=25)
    description = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    discount = models.DecimalField(db_index=True, blank=True, null=True, max_digits=3, decimal_places=2)
    notes = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    terms = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    sales_taxes = models.ManyToManyField(SalesTax)

    class Meta:
        verbose_name = 'Retainer'
        verbose_name_plural = 'Retainers'

class Estimate(models.Model):
    client = models.ForeignKey(Data, db_index=True, db_column='client_id', on_delete=models.CASCADE)
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    date = models.CharField(db_index=True, max_length=20)
    number = models.CharField(db_index=True, max_length=10)
    reference = models.CharField(db_index=True, blank=True, null=True, max_length=25)
    discount = models.DecimalField(db_index=True, blank=True, null=True, max_digits=3, decimal_places=2)
    notes = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    terms = models.CharField(db_index=True, blank=True, null=True, max_length=255)

    class Meta:
        verbose_name = 'Estimate'
        verbose_name_plural = 'Estimates'

class Proposal(models.Model):
    client = models.ForeignKey(Data, db_index=True, db_column='client_id', on_delete=models.CASCADE)
    business = models.ForeignKey(Business, db_index=True, db_column='business_id', on_delete=models.CASCADE)
    date = models.CharField(db_index=True, max_length=20)
    number = models.CharField(db_index=True, max_length=10)
    reference = models.CharField(db_index=True, blank=True, null=True, max_length=25)
    discount = models.DecimalField(db_index=True, blank=True, null=True, max_digits=3, decimal_places=2)
    notes = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    terms = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    esignature = models.BooleanField(db_index=True, default=False)

    class Meta:
        verbose_name = 'Proposal'
        verbose_name_plural = 'Proposals'

class EstimateProposalLineItem(models.Model):
    # is_estimate = models.BooleanField(db_index=True, default=True)
    estimate_proposal_number = models.CharField(db_index=True, max_length=20)
    name = models.CharField(db_index=True, blank=True, null=True, max_length=150)
    description = models.CharField(db_index=True, blank=True, null=True, max_length=255)
    rate = models.DecimalField(db_index=True, blank=True, null=True, max_digits=15, decimal_places=2)
    quantity = models.IntegerField(db_index=True, blank=True, null=True, default=10)
    sales_taxes = models.ManyToManyField(SalesTax)

    class Meta:
        verbose_name = 'EstimateProposalLineItem'
        verbose_name_plural = 'EstimateProposalLineItems'

# Details of invoice goods
# class InvoiceDetail(models.Model):
#     invoice = models.ForeignKey(Invoice, db_index=True, db_column='invoice_id', on_delete=models.CASCADE)
#     invoice_goods = models.ForeignKey(InvoiceGoods, db_index=True, on_delete=models.CASCADE)
#     sales_taxes = models.ForeignKey(Tax, db_index=True, on_delete=models.CASCADE)

#     class Meta:
#         verbose_name = 'ClientsInvoiceDetail'
#         verbose_name_plural = 'ClientsInvoiceDetails'
