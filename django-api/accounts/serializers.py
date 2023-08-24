from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import (
  get_user_model,
  authenticate,
)
from .models import Business
from notifications.models import Email as EmailNotifications
from business.models import SalesTax, Item, Service
# from clients.models import Data as Client
# from clients.models import SecondaryContact as Contact
# from clients.models import Invoice
from clients.models import (
  Data as Client,
  SecondaryContact as Contact,
  Invoice,
  InvoiceLineItem,
)
from expenses.models import Vendor
from django.conf import settings
from django.db import transaction
from pprint import pprint
# from django.contrib.auth.models import User

# User._meta.get_field('email')._unique = True
# User._meta.get_field('email').blank = False
# User._meta.get_field('email').null = False


User = get_user_model()
# print("User get_user_model = ", User)
# print("\n\nBusiness in BusinessSerializer is = ", Business, "\n")

# from django.contrib.sites.models import Site

# current_site = Site.objects.get_current()

# print("current_site.domain is = ", current_site.domain)

# User Serializer
# class UserSerializer(serializers.ModelSerializer):
class UserSerializer(UserCreateSerializer):
  # token = serializers.SerializerMethodField(method_name='get_token')
  # token = serializers.SerializerMethodField()
  # print("\n\ntoken in UserSerializer = ", token)
  # class Meta:
  class Meta(UserCreateSerializer.Meta):
    model = User
    # fields = ('id', 'username', 'email', 'first_name')
    # fields = ('id', 'username', 'email')
    fields = '__all__'
    # fields = ('id', 'email', 'role', 'time_zone', 'token')

  # def get_token(self, user):
  #   refresh = RefreshToken.for_user(user)
  #   return {
  #     'refresh': str(refresh),
  #     'access': str(refresh.access_token),
  #   }

# Business Serializer
class BusinessSerializer(serializers.ModelSerializer):
  owner_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source="owner")
  theme_logo = serializers.SerializerMethodField()
  
  class Meta:
    model = Business
    # fields = '__all__'
    exclude = ['owner']
    # extra_fields = ['owner_id']

  def get_theme_logo(self, obj):
    request = self.context.get('request')
    # print(" : " + str(request.META['HTTP_HOST']))
    theme_logo = obj.get_image_url()
    theme_logo_path = request.scheme + "://" + request.get_host() + settings.MEDIA_URL + str(theme_logo)
    return request.build_absolute_uri(theme_logo_path)

# Email Notifications Serializer
class EmailNotificationsSerializer(serializers.ModelSerializer):
  # user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source="user")
  business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source="business")

  class Meta:
    model = EmailNotifications
    # fields = '__all__'
    # exclude = ['user']
    exclude = ['business']

# Sales Tax Serializer
class SalesTaxSerializer(serializers.ModelSerializer):
  business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source="business")

  class Meta:
    model = SalesTax
    # fields = '__all__'
    exclude = ['business']

# Item Serializer
class ItemSerializer(serializers.ModelSerializer):
  business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source="business")
  # sales_taxes_data = serializers.PrimaryKeyRelatedField(queryset=SalesTax.objects.all(), many=True, source="sales_taxes")
  sales_taxes = SalesTaxSerializer(many=True, read_only=True)

  class Meta:
    model = Item
    # extra_fields = ['sales_taxes_data']
    exclude = ['business']

# Service Serializer
class ServiceSerializer(serializers.ModelSerializer):
  business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source="business")
  sales_taxes = SalesTaxSerializer(many=True, read_only=True)

  class Meta:
    model = Service
    # extra_fields = ['sales_taxes']
    exclude = ['business']

# Client Serializer
class ClientSerializer(serializers.ModelSerializer):
  business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source="business")

  class Meta:
    model = Client
    exclude = ['business']

# Contact Serializer
class ContactSerializer(serializers.ModelSerializer):
  business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source="business")
  client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source="client")

  class Meta:
    model = Contact
    exclude = ['business', 'client']

# Invoice Line Item Serializer
class InvoiceLineItemSerializer(serializers.ModelSerializer):
  invoice_id = serializers.PrimaryKeyRelatedField(queryset=Invoice.objects.all(), source="invoice")
  sales_taxes = SalesTaxSerializer(many=True, read_only=True)

  class Meta:
    model = InvoiceLineItem
    exclude = ['invoice']

# Invoice Serializer
class InvoiceSerializer(serializers.ModelSerializer):
  # billed_to = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source="client")
  client_id = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source="client")
  business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source="business")
  invoice_line_items = InvoiceLineItemSerializer(many=True, read_only=True)
  # invoice_line_items = InvoiceLineItemSerializer(many=True)

  @transaction.atomic
  def create(self, validated_data):
    invoice_line_items_data = self.initial_data.get('invoice_line_items')

    instance = super().create(validated_data)
    if invoice_line_items_data:
      InvoiceLineItem.objects.bulk_create([
        InvoiceLineItem(
          name=invoice_line_item['name'],
          description=invoice_line_item['description'],
          rate=invoice_line_item['rate'],
          quantity=invoice_line_item['quantity'],
          invoice_id=instance.id
        ) for invoice_line_item in invoice_line_items_data
      ])
    
    instance.save()
    return instance
  
  @transaction.atomic
  def update(self, instance, validated_data):
    invoice_line_items_data = self.initial_data.get('invoice_line_items')
    print("\n\n")
    pprint(instance, indent=2)
    print("\n\n")
    pprint(validated_data, indent=2)
    print("\n\n")
    pprint(invoice_line_items_data, indent=2)
    print("\n\n")
    pprint(instance.invoice_line_items, indent=2)
    if invoice_line_items_data:
      instance.invoice_line_items.clear()
      for invoice_line_item in invoice_line_items_data:
        invoice_line_item_id = invoice_line_item.get("id")
        if invoice_line_item_id:
          invoice_line_item_obj = InvoiceLineItem.objects.get(id=invoice_line_item_id)
          invoice_line_item_obj.name = invoice_line_item.get("name")
          invoice_line_item_obj.description = invoice_line_item.get("description")
          invoice_line_item_obj.rate = invoice_line_item.get("rate")
          invoice_line_item_obj.quantity = invoice_line_item.get("quantity")
          invoice_line_item_obj.save()
          instance.invoice_line_items.add(invoice_line_item_obj)
        else:
          InvoiceLineItem.objects.create(
            name=invoice_line_item.get("name"),
            description=invoice_line_item.get("description"),
            rate=invoice_line_item.get("rate"),
            quantity=invoice_line_item.get("quantity"),
            invoice_id=instance.id
          )

    instance = super().update(instance, validated_data)
    instance.save()
    return instance
  
  class Meta:
    model = Invoice
    exclude = ['client', 'business']

# Vendor Serializer
class VendorSerializer(serializers.ModelSerializer):
  business_id = serializers.PrimaryKeyRelatedField(queryset=Business.objects.all(), source="business")
  sales_taxes = SalesTaxSerializer(many=True, read_only=True)

  class Meta:
    model = Vendor
    exclude = ['business']

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    # fields = ('id', 'username', 'email', 'password', 'first_name')
    # fields = ('id', 'username', 'email', 'password')
    # fields = ('id', 'email', 'password')
    fields = ('id', 'email', 'password', 'role', 'time_zone')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(
      # validated_data['username'],
      validated_data['email'],
      validated_data['password'],
      # first_name=validated_data['first_name'],
    )
    user.role = validated_data['role']
    user.time_zone = validated_data['time_zone']
    user.save()
    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  # username = serializers.CharField()
  email = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    try:
      user = User.objects.get(email=data['email'])
    except User.DoesNotExist:
      raise serializers.ValidationError('email address is not registered')

    print("\n\ndata = ",data)
    print("\n\ndata email = ",data['email'])
    print("\n\ndata password = ",data['password'])
    print("\n\nuser after check = ",user.email)
    print("\n\nuser after check = ",user.password)
    
    # user = authenticate(**data)
    # user = authenticate(username=user.username, password=data['password'])
    user = authenticate(email=data['email'], password=data['password'])
    print("\n\nuser authenticate = ",user)

    # if user and user.is_active:
    if user:
      print("\n\nobjects all = ",Business.objects.all().values())
      # print("arr filter 1 = ",Business.objects.filter(owner=user.id).values())
      print("\n\nobjects fake filter = ",Business.objects.filter(owner=user.id).values())
      print("\n\nobjects filter = ",Business.objects.filter(owner_id=user.id).values())
      business = Business.objects.filter(owner_id=user.id).values()

      print("\n\nuser in serializer = ", user)
      
      print("\n\nbusiness in serializer = ",business)
      # business["owner_id"] = int(business["owner_id"])
      # business = Business.objects.filter(owner=user.id).values()
      # print("\n\nbusiness in LoginSerializer = ", business)
      # return user
      return user, business
    
    raise serializers.ValidationError("wrong password")
    # raise serializers.ValidationError("Incorrect Credentials")

# Forgot Password Serializer
class ForgotPasswordSerializer(serializers.Serializer):
  email = serializers.CharField()
  
  # def validate(self, data):
  #   if User.objects.filter(email=data["email"]).exists():
  #     user = User.objects.get(email=data["email"])

  #     if user and user.is_active:
  #       return user

  #   raise serializers.ValidationError("this email address is not registered")

# Reset Password Serializer
# class ResetPasswordSerializer(serializers.Serializer):
#   password = serializers.CharField()
#   confirm_password = serializers.CharField()

  # def validate(self, data):


# Password Reset Serializer
# class PasswordResetSerializer(serializers.Serializer):
#   email = serializers.CharField()
  
#   def validate(self, data):
#     if User.objects.filter(email=data["email"]).exists():
#       user = User.objects.get(email=data["email"])

#       if user and user.is_active:
#         return user

#     raise serializers.ValidationError("this email address is not registered")


# Change Password Serializer
# class ResetPasswordSerializer(serializers.Serializer):
#   model = User

#   """
#   Serializer for password change endpoint.
#   """
#   old_password = serializers.CharField(required=True)
#   new_password = serializers.CharField(required=True)