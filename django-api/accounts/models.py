from django.db import models
from django.contrib.auth.models import (
    # AbstractUser,
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
# from django.utils.translation import ugettext_lazy as _
from django.utils.translation import gettext_lazy as _


# class User(AbstractUser):
#     def __str__(self):
#         return self.email

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        
        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


def profile_upload_path(instance, filename):
    return "/".join(["accounts", f"{str(instance.first_name)} {str(instance.last_name)} — {str(instance.email)}", "profile", filename])

# class User(AbstractUser):
class User(AbstractBaseUser, PermissionsMixin):
    """User model."""

    # username = None
    # email = models.EmailField(_('email address'), unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    role = models.CharField(db_index=True, max_length=15)
    first_name = models.CharField(db_index=True, max_length=150)
    last_name = models.CharField(db_index=True, max_length=150)
    profile_photo = models.ImageField(db_index=True, blank=True, null=True, upload_to=profile_upload_path)
    # profile_photo = models.CharField(db_index=True, max_length=255)
    # email = models.EmailField(_('email address'), db_index=True, unique=True, max_length=255)
    email = models.EmailField(db_index=True, unique=True, max_length=255)
    phone_number = models.CharField(db_index=True, max_length=30)
    country = models.CharField(db_index=True, max_length=50)
    time_zone = models.CharField(db_index=True, max_length=50)
    # date_joined = models.DateTimeField(auto_now_add=True)
    registration_date = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = []
    REQUIRED_FIELDS = ['role', 'time_zone']
    
    objects = UserManager()

    class Meta:
        """Define Meta class for User model."""

        # abstract = True
        verbose_name = 'User'
        verbose_name_plural = 'Users'


def theme_upload_path(instance, filename):
    user = User.objects.get(pk=instance.owner_id)
    return "/".join(["business", f"{str(user.id)}{str(instance.id)} — {str(instance.name)} — {str(user.email)}", "logo", filename])
    # return "/".join(["accounts", f"{str(instance.first_name)} {str(instance.last_name)} — {str(instance.email)}", "theme", filename])

class Business(models.Model):
    # owner_id = models.ForeignKey(User, db_column='owner_id', on_delete=models.CASCADE)
    # owner = models.ForeignKey(User, db_column='owner_id', related_name='owner_id', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, db_index=True, db_column='owner_id', on_delete=models.CASCADE)
    logged_in = models.BooleanField(db_index=True, default=True)
    name = models.CharField(db_index=True, max_length=255)
    industry = models.CharField(db_index=True, max_length=50)
    describe = models.CharField(db_index=True, max_length=50)
    base_currency = models.CharField(db_index=True, max_length=100)
    estimated_revenue = models.CharField(db_index=True, max_length=50)
    time_completed_service = models.CharField(db_index=True, max_length=50)
    customer_billing_tool = models.CharField(db_index=True, max_length=50)
    customer_offer_customized_type = models.CharField(db_index=True, max_length=30)
    business_phone = models.CharField(db_index=True, null=True, max_length=30)
    mobile_phone = models.CharField(db_index=True, null=True, max_length=30)
    country = models.CharField(db_index=True, null=True, max_length=50)
    address_1 = models.CharField(db_index=True, null=True, max_length=255)
    address_2 = models.CharField(db_index=True, null=True, max_length=255)
    city = models.CharField(db_index=True, null=True, max_length=255)
    state = models.CharField(db_index=True, null=True, max_length=255)
    zip_code = models.CharField(db_index=True, null=True, max_length=20)
    time_zone = models.CharField(db_index=True, null=True, max_length=50)
    date_format = models.CharField(db_index=True, null=True, max_length=20)
    tax_name = models.CharField(db_index=True, null=True, max_length=10)
    tax_number = models.CharField(db_index=True, null=True, max_length=21)
    standard_rate = models.DecimalField(db_index=True, null=True, max_digits=9, decimal_places=2)
    theme_color = models.CharField(db_index=True, default='#4f697a', max_length=10)
    theme_font = models.CharField(db_index=True, default='Modern (Helvetica)', max_length=20)
    theme_logo = models.ImageField(db_index=True, blank=True, null=True, upload_to=theme_upload_path)
    all_email_notifications = models.BooleanField(db_index=True, default=True)

    def get_image_url(self):
        img = self.theme_logo
        if img:
            return img
            # return img.image.url
        else:
            return None
    
    class Meta:
        # abstract = True
        verbose_name = 'Business'
        verbose_name_plural = 'Business'


# Create your CustomUserManager here.
# class CustomUserManager(BaseUserManager):
#     def _create_user(self, email, password, **extra_fields):
#         if not email:
#             raise ValueError("Email must be provided")
#         if not password:
#             raise ValueError("Password is not provided")

#         user = self.model(
#             email = self.normalize_email(email),
#             **extra_fields
#         )

#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_user(self, email, password, **extra_fields):
#         """Create and save a regular User with the given email and password."""
        
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_active', True)
#         extra_fields.setdefault('is_superuser', False)
#         return self._create_user(email, password, **extra_fields)

#     def create_superuser(self, email, password, **extra_fields):
#         """Create and save a SuperUser with the given email and password."""
        
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_active', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self._create_user(email, password, **extra_fields)


# Create your User Model here.
# class User(AbstractBaseUser, PermissionsMixin):
#     """AbstractBaseUser has password, last_login, is_active by default"""

#     email = models.EmailField(db_index=True, unique=True, max_length=254)
#     # first_name = models.CharField(max_length=240)
#     # last_name = models.CharField(max_length=255)
#     # mobile = models.CharField(max_length=50)
#     # address = models.CharField(max_length=250)

#     is_staff = models.BooleanField(default=True) # must needed, otherwise you won't be able to login to django-admin
#     is_active = models.BooleanField(default=True) # must needed, otherwise you won't be able to login to django-admin
#     is_superuser = models.BooleanField(default=False) # this field we inherit from PermissionsMixin
    
#     objects = CustomUserManager()
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

#     class Meta:
#         verbose_name = 'User'
#         verbose_name_plural = 'Users'


# class UserProfile(AbstractUser):
#     usertype = models.IntegerField(_("usertype"))


# Create your models here.

# from django.dispatch import receiver
# from django.urls import reverse
# from django_rest_passwordreset.signals import reset_password_token_created
# from django.core.mail import send_mail

# @receiver(reset_password_token_created)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

#     email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

#     send_mail(
#         # title:
#         "Password Reset for {title}".format(title="Some website title"),
#         # message:
#         email_plaintext_message,
#         # from:
#         "noreply@somehost.local",
#         # to:
#         [reset_password_token.user.email]
#     )