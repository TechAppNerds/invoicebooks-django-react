from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.response import Response
# from knox.models import AuthToken
from .serializers import (
  UserSerializer,
  BusinessSerializer,
  EmailNotificationsSerializer,
  SalesTaxSerializer,
  ItemSerializer,
  # InvoiceLineItemSerializer,
  ServiceSerializer,
  ClientSerializer,
  ContactSerializer,
  InvoiceSerializer,
  VendorSerializer,
  RegisterSerializer,
  LoginSerializer,
  # PasswordResetSerializer,
  ForgotPasswordSerializer,
  # ResetPasswordSerializer,
)
from .models import User, Business
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
from pprint import pprint
import json
import copy
# import uuid
import os
from pathlib import Path
from django.contrib.sessions.models import Session
# from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from django.contrib.auth import authenticate
# from django.views.generic import View
from django.shortcuts import render, redirect
from django.template import loader
from django.template.loader import render_to_string
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib import messages
from django.core.mail import send_mail, send_mass_mail, EmailMultiAlternatives
from django.http import HttpResponse

# def BaseUrl(request):
#   return redirect(settings.SERVER_URL)

# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context(), partial=True).data,
      "business": [],
      # "token": AuthToken.objects.create(user)[1]
    })

# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    # request.data["owner"]=request.data["owner_id"]
    # print("\n\nrequest data = ", request.data["owner_id"])
    print("\n\nLoginAPI request data = ", request.data)
    serializer = self.get_serializer(data=request.data)
    print("\n\nLoginAPI serializer = ", serializer)
    serializer.is_valid(raise_exception=True)
    user, business = serializer.validated_data
    # print("\n\nLoginAPI business owner_id is = ", business["owner_id"])
    # print("\n\nLoginAPI business owner_id type = ", type(business["owner_id"]))
    # business["owner"] = int(business["owner_id"])
    # print("\n\nLoginAPI user = ", user)
    # print("\n\nLoginAPI business = ", business)
    print("\n\nLoginAPI user = ")
    pprint(user, indent=2)
    print("\n\nLoginAPI business = ")
    pprint(business, indent=2)

    # _, token = AuthToken.objects.create(user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      # "business": BusinessSerializer(business, context=self.get_serializer_context(), many=True).data,
      "business": business,
      # "token": token
    })

# Logout API
class LogoutAPI(generics.GenericAPIView):
  # permission_classes = (permissions.IsAuthenticated,)
  permission_classes = (permissions.AllowAny,)

  def post(self, request, *args, **kwargs):
    print("\n\n")
    pprint(request.data, indent=2)
    # try:
    refresh_token = request.data["refresh"]
    token = RefreshToken(refresh_token)
    token.blacklist()
    return Response({"message": "logged out successfully"}, status=status.HTTP_205_RESET_CONTENT)
    # except Exception:
    #   return Response(status=status.HTTP_400_BAD_REQUEST)

# Get User API
class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user

# Clean Upload API
# class CleanUploadAPI(generics.RetrieveAPIView):
#   permission_classes = (permissions.IsAuthenticated,)

#   def delete(self, request, id, *args, **kwargs):
#     user = User.objects.get(pk=id)
#     # print("\n\n")
#     # pprint(user, indent=2)
#     dir_prev = str(user.profile_photo.path)
#     dir = Path(dir_prev).parent
#     print("\n\n")
#     pprint(dir, indent=2)
#     # dir = str(user.profile_photo.path)
#     # image = str(user.profile_photo.path)
#     # print("\n\n")
#     # pprint(image, indent=2)
#     # print("\n\n")
#     # pprint(os.path.exists(image), indent=2)
#     # if os.path.exists(image):
#     #   os.remove(image)
#     #   return Response(status=status.HTTP_200_OK)
#     # else:
#     #   return Response({"message": "file doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
    
#     for file in os.listdir(dir):
#       os.remove(os.path.join(dir, file))
    
#     return Response(status=status.HTTP_200_OK)

# Account API
class AccountAPI(generics.RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def put(self, request, id, *args, **kwargs):
    user = User.objects.get(pk=id)
    if user.profile_photo and len(user.profile_photo) > 0:
      absolute_path = str(user.profile_photo.path)
      dir = Path(absolute_path).parent

      for file in os.listdir(dir):
        os.remove(os.path.join(dir, file))
    
    data = request.data
    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.profile_photo = "" if data.get("profile_photo") is None else data["profile_photo"]
    user.time_zone = data["time_zone"]
    user.save()
    return Response({"user": UserSerializer(user, context=self.get_serializer_context(), partial=True).data})

# Business Account API
class BusinessAccountAPI(generics.RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def put(self, request, id, *args, **kwargs):
    data = request.data
    business = Business.objects.get(pk=id)
    business.address_1 = data["address_1"]
    business.address_2 = data["address_2"]
    business.base_currency = data["base_currency"]
    business.business_phone = data["business_phone"]
    business.city = data["city"]
    business.country = data["country"]
    business.date_format = data["date_format"]
    business.mobile_phone = data["mobile_phone"]
    business.name = data["name"]
    business.standard_rate = data["standard_rate"]
    business.state = data["state"]
    business.tax_name = data["tax_name"]
    business.tax_number = data["tax_number"]
    business.time_zone = data["time_zone"]
    business.zip_code = data["zip_code"]
    business.save()
    return Response({"business": BusinessSerializer(business, context=self.get_serializer_context(), partial=True).data})

# Logo Theme Account API
class LogoThemeAccountAPI(generics.RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def put(self, request, id, *args, **kwargs):
    # user = User.objects.get(pk=id)
    
    # if user.theme_logo and len(user.theme_logo) > 0:
    #   absolute_path = str(user.theme_logo.path)
    #   dir = Path(absolute_path).parent

    #   for file in os.listdir(dir):
    #     os.remove(os.path.join(dir, file))
    
    business = Business.objects.get(pk=id)
    
    if business.theme_logo and len(business.theme_logo) > 0:
      absolute_path = str(business.theme_logo.path)
      dir = Path(absolute_path).parent

      for file in os.listdir(dir):
        os.remove(os.path.join(dir, file))
    
    data = request.data
    business.theme_color = data["theme_color"]
    business.theme_font = data["theme_font"]
    business.theme_logo = "" if data.get("theme_logo") is None else data["theme_logo"]
    business.save()
    return Response({"business": BusinessSerializer(business, context=self.get_serializer_context(), partial=True).data})
    # user.theme_color = data["theme_color"]
    # user.theme_font = data["theme_font"]
    # user.theme_logo = "" if data.get("theme_logo") is None else data["theme_logo"]
    # user.save()
    # return Response({"user": UserSerializer(user, context=self.get_serializer_context(), partial=True).data})

# Email Notifications Account API
class EmailNotificationsAccountAPI(generics.RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def put(self, request, id, *args, **kwargs):
    data = request.data
    notification = EmailNotifications.objects.get(pk=id)
    
    if "recurring_invoice_sent" in data:
      notification.recurring_invoice_sent = data["recurring_invoice_sent"]
    if "comment_added_on_invoice" in data:
      notification.comment_added_on_invoice = data["comment_added_on_invoice"]
    if "online_payment_received" in data:
      notification.online_payment_received = data["online_payment_received"]
    if "comment_added_on_estimate_or_proposal" in data:
      notification.comment_added_on_estimate_or_proposal = data["comment_added_on_estimate_or_proposal"]
    if "estimate_or_proposal_accepted" in data:
      notification.estimate_or_proposal_accepted = data["estimate_or_proposal_accepted"]
    if "comment_added_on_project" in data:
      notification.comment_added_on_project = data["comment_added_on_project"]
    if "post_made_on_project" in data:
      notification.post_made_on_project = data["post_made_on_project"]

    notification.save()

    if "all_email_notifications" not in data:
      return Response({"notification": EmailNotificationsSerializer(notification, context=self.get_serializer_context()).data})
    else:
      # user = User.objects.get(pk=notification.user_id)
      # user.all_email_notifications = data["all_email_notifications"]
      # user.save()
      business = Business.objects.get(pk=notification.business_id)
      business.all_email_notifications = data["all_email_notifications"]
      business.save()
      return Response({
        # "user": UserSerializer(user, context=self.get_serializer_context(), partial=True).data,
        "business": BusinessSerializer(business, context=self.get_serializer_context(), partial=True).data,
        "notification": EmailNotificationsSerializer(notification, context=self.get_serializer_context()).data
      })

# Login User Data API
# class LoginUserDataAPI(generics.RetrieveAPIView):
# Generate Token API
class GenerateTokenAPI(generics.RetrieveAPIView):
  # serializer_class = UserSerializer

  def post(self, request, *args, **kwargs):
    email = request.data["email"]
    try:
      user = User.objects.get(email=email)
    except User.DoesNotExist:
      return Response({"message": "email address is not registered"}, status=status.HTTP_404_NOT_FOUND)
    
    # print("\n\nuser = ", user)

    # print("\n\npassword = ", user.password)

    # print("\n\ndecrypt password = ", decrypt(user.password))

    # for sessions in Session.objects.all():
    #   try:
    #     decoded = sessions.get_decoded()
    #     print("\n\ndecoded = ", decoded)
    #     print("\n\ndecoded password = ", decoded["password"])
    #   except:
    #     # corrupted data
    #     # pass
    #     return Response({"message": "session data has been corrupted"}, status=status.HTTP_404_NOT_FOUND)
    
    # refresh = RefreshToken.for_user({"id": user.id, "email": user.email, "password": decoded["password"]})
    # user.password = decoded["password"]
    refresh = RefreshToken.for_user(user)
    
    return Response({
      "token": {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
      },
    }, status=status.HTTP_200_OK)

# from cryptography.fernet import Fernet
# import base64
# import logging
# import traceback
# from django.conf import settings

# def decrypt(password):
#     try:
#         password = base64.urlsafe_b64decode(password)
#         # cipher_pass = Fernet(settings.ENCRYPT_KEY)
#         cipher_pass = Fernet(settings.SECRET_KEY)
#         decod_pass = cipher_pass.decrypt(password).decode("ascii")     
#         return decod_pass
#     except Exception as e:
#         logging.getLogger("error_logger").error(traceback.format_exc())
#         return None

# Is Active API
class IsActiveAPI(generics.RetrieveAPIView):
  def post(self, request, *args, **kwargs):
    try:
      user = User.objects.get(email=request.data["email"])
    except User.DoesNotExist:
      return Response({"message": "email address is not registered"}, status=status.HTTP_404_NOT_FOUND)

    if user.is_active is False:
      return Response({"message": "the email address of the account has not been confirmed"}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response(status=status.HTTP_200_OK)

# User Exists API
class UserExistsAPI(generics.RetrieveAPIView):
  # serializer_class = UserSerializer

  def post(self, request, *args, **kwargs):
    email = request.data["email"]
    password = request.data["password"]
    try:
      user = User.objects.get(email=email)
    except User.DoesNotExist:
      return Response({"message": "email address is not registered"}, status=status.HTTP_404_NOT_FOUND)
    
    # duplicate_user = copy.deepcopy(user)
    # duplicate_user.is_active = True
    # duplicate_user.check_password(password)
    # print("\n\ncheck_password = ", duplicate_user.check_password(password))
    # auth_user = authenticate(email=email, password=password)
    # print("\n\n")
    # pprint(auth_user, indent=2)

    if user.check_password(password) is False:
      return Response({"message": "wrong password"}, status=status.HTTP_400_BAD_REQUEST)

    if user.is_active is False:
      Session.objects.all().delete()
      request.session["password"] = password
      return Response({"message": "the email address of the account has not been confirmed"}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response(status=status.HTTP_200_OK)

# User Access API
class UserAccessAPI(generics.RetrieveAPIView):
  # serializer_class = UserSerializer

  def post(self, request, *args, **kwargs):
    data = request.data

    if data["role"] != "Employee" or "Manager":
      user = User.objects.get(pk=data["user_id"])
      user.is_staff = True

      if data["role"] == "Business Owner" or "Contractor":
        user.is_superuser = True

      user.save()

    return Response(status=status.HTTP_200_OK)

# Users Business API
class UsersBusinessAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, id, *args, **kwargs):
    # business = Business.objects.filter(owner_id=request.data["user_id"]).values()
    # business = Business.objects.filter(owner_id=id, logged_in=True).values()
    business = Business.objects.filter(owner_id=id, logged_in=True)
    # serializer = BusinessSerializer(data=business, partial=True)
    # print("\n\nbusiness serializer is = ", serializer, "\n")
    serializer = BusinessSerializer(business, context=self.get_serializer_context(), many=True)
    # print("\n\nbusiness serializer is = ", serializer.data, "\n")
    return Response(serializer.data, status=status.HTTP_200_OK)
    # return Response(business, status=status.HTTP_200_OK)

# Users Notification API
class UsersNotificationAPI(generics.GenericAPIView):
  # permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, id, *args, **kwargs):
    # notification = EmailNotifications.objects.get(user_id=id)
    notification = EmailNotifications.objects.get(business_id=id)
    # serializer = EmailNotificationsSerializer(data=notification, partial=True)
    # print("\n\nnotification serializer is = ", serializer, "\n")
    return Response({"notification": EmailNotificationsSerializer(notification, context=self.get_serializer_context()).data})

  def post(self, request, *args, **kwargs):
    # request.data["owner"]=request.data["owner_id"]
    # {'theme_color': '#d234cb', 'theme_font': 'Classic (Garamond)'}
    data = request.data

    # if data["role"] != "Employee" or "Manager":
    #   user = User.objects.get(pk=data["user_id"])
    #   user.is_staff = True

    #   if data["role"] == "Business Owner" or "Contractor":
    #     user.is_superuser = True

    #   user.save()

    notification = EmailNotifications.objects.create(
      # recurring_invoice_sent=True,
      # comment_added_on_invoice=True,
      # online_payment_received=True,
      # comment_added_on_estimate_or_proposal=True,
      # estimate_or_proposal_accepted=True,
      # comment_added_on_project=True,
      # post_made_on_project=True,
      business_id=data["business_id"]
    )
    # return Response(status=status.HTTP_201_CREATED)
    return Response({
      "notification": EmailNotificationsSerializer(notification, context=self.get_serializer_context()).data
    }, status=status.HTTP_201_CREATED)

# Business Salex Tax API
class BusinessSalexTaxAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, id, *args, **kwargs):
    taxes = SalesTax.objects.filter(business_id=id)
    serializer = SalesTaxSerializer(taxes, context=self.get_serializer_context(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    tax = SalesTax.objects.create(**request.data)
    return Response({
      "tax": SalesTaxSerializer(tax, context=self.get_serializer_context(), partial=True).data
    }, status=status.HTTP_201_CREATED)
  
  def put(self, request, id, *args, **kwargs):
    data = request.data
    tax = SalesTax.objects.get(pk=id)
    tax.name = data["name"]
    tax.number = data["number"]
    tax.rate = data["rate"]
    tax.save()
    return Response({"tax": SalesTaxSerializer(tax, context=self.get_serializer_context(), partial=True).data})

  def delete(self, request, *args, **kwargs):
    sales_taxes = json.loads(request.body.decode("utf-8"))["sales_taxes"]
    SalesTax.objects.filter(pk__in=[tax["id"] for tax in sales_taxes]).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Business Items Sales Tax API
# class BusinessItemsSalesTaxAPI(generics.GenericAPIView):
#   permission_classes = (permissions.IsAuthenticated,)

#   def put(self, request, id, *args, **kwargs):
#     data = request.data
#     item = Item.objects.get(pk=id)
#     taxes_id = [tax["id"] for tax in data["sales_taxes"]]
#     item.sales_taxes.set(taxes_id)
#     return Response({"item": ItemSerializer(item, context=self.get_serializer_context(), partial=True).data})

# Business Services Sales Tax API
# class BusinessServicesSalesTaxAPI(generics.GenericAPIView):
#   permission_classes = (permissions.IsAuthenticated,)

#   def put(self, request, id, *args, **kwargs):
#     data = request.data
#     service = Service.objects.get(pk=id)
#     taxes_id = [tax["id"] for tax in data["sales_taxes"]]
#     service.sales_taxes.set(taxes_id)
#     return Response({"service": ServiceSerializer(service, context=self.get_serializer_context(), partial=True).data})

# Business Items API
class BusinessItemsAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, id, *args, **kwargs):
    items = Item.objects.filter(business_id=id)
    serializer = ItemSerializer(items, context=self.get_serializer_context(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    data = request.data
    item = Item.objects.create(
      name=data["name"],
      description=data["description"],
      rate=data["rate"],
      current_stock=data["current_stock"],
      business_id=data["business_id"]
    )
    item.sales_taxes.set([tax["id"] for tax in data["sales_taxes"]])
    return Response({
      "item": ItemSerializer(item, context=self.get_serializer_context(), partial=True).data
    }, status=status.HTTP_201_CREATED)

  def put(self, request, id, *args, **kwargs):
    item = Item.objects.get(pk=id)
    data = request.data
    item.name=data["name"]
    item.description=data["description"]
    item.rate=data["rate"]
    item.current_stock = data["current_stock"]
    item.sales_taxes.set([tax["id"] for tax in data["sales_taxes"]])
    item.save()
    return Response({"item": ItemSerializer(item, context=self.get_serializer_context(), partial=True).data})
  
  def delete(self, request, *args, **kwargs):
    items = json.loads(request.body.decode("utf-8"))["items"]
    Item.objects.filter(pk__in=[item["id"] for item in items]).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Business Services API
class BusinessServicesAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, id, *args, **kwargs):
    services = Service.objects.filter(business_id=id)
    serializer = ServiceSerializer(services, context=self.get_serializer_context(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    data = request.data
    service = Service.objects.create(
      name=data["name"],
      description=data["description"],
      rate=data["rate"],
      billable=data["billable"],
      always_add_to_projects=data["always_add_to_projects"],
      business_id=data["business_id"]
    )
    service.sales_taxes.set([tax["id"] for tax in data["sales_taxes"]])
    return Response({
      "service": ServiceSerializer(service, context=self.get_serializer_context(), partial=True).data
    }, status=status.HTTP_201_CREATED)

  def put(self, request, id, *args, **kwargs):
    service = Service.objects.get(pk=id)
    data = request.data
    service.name=data["name"]
    service.description=data["description"]
    service.rate=data["rate"]
    service.billable=data["billable"]
    service.always_add_to_projects=data["always_add_to_projects"]
    service.sales_taxes.set([tax["id"] for tax in data["sales_taxes"]])
    service.save()
    return Response({"service": ServiceSerializer(service, context=self.get_serializer_context(), partial=True).data})
  
  def delete(self, request, *args, **kwargs):
    services = json.loads(request.body.decode("utf-8"))["services"]
    Service.objects.filter(pk__in=[service["id"] for service in services]).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Clients API
class ClientsAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = ClientSerializer

  def get(self, request, id, *args, **kwargs):
    clients = Client.objects.filter(business_id=id)
    serializer = ClientSerializer(clients, context=self.get_serializer_context(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    client = Client.objects.create(**request.data)
    return Response({
      "client": ClientSerializer(client, context=self.get_serializer_context(), partial=True).data
    }, status=status.HTTP_201_CREATED)

  def put(self, request, id, *args, **kwargs):
    client = Client.objects.get(pk=id)
    data = request.data
    client.first_name=data["first_name"]
    client.last_name=data["last_name"]
    client.company_name=data["company_name"]
    client.email=data["email"]
    client.phone_number=data["phone_number"]
    client.business_phone=data["business_phone"]
    client.mobile_phone=data["mobile_phone"]
    client.country=data["country"]
    client.address_1=data["address_1"]
    client.address_2=data["address_2"]
    client.city=data["city"]
    client.state=data["state"]
    client.zip_code=data["zip_code"]
    client.tax_name=data["tax_name"]
    client.tax_number=data["tax_number"]
    client.send_payment_reminders=data["send_payment_reminders"]
    client.charge_late_fees=data["charge_late_fees"]
    client.percentage_invoice_value=data["percentage_invoice_value"]
    client.percentage_outstanding_balance=data["percentage_outstanding_balance"]
    client.flat_fee=data["flat_fee"]
    client.late_fee_amount=data["late_fee_amount"]
    client.number_days=data["number_days"]
    client.currency=data["currency"]
    client.invoice_attachments=data["invoice_attachments"]
    client.save()
    return Response({"client": ClientSerializer(client, context=self.get_serializer_context(), partial=True).data})
  
  def delete(self, request, *args, **kwargs):
    clients = json.loads(request.body.decode("utf-8"))["clients"]
    Client.objects.filter(pk__in=[client["id"] for client in clients]).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Contacts API
class ContactsAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  # serializer_class = ClientSerializer

  def get(self, request, id, *args, **kwargs):
    contacts = Contact.objects.filter(client_id=id)
    serializer = ContactSerializer(contacts, context=self.get_serializer_context(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    contact = Contact.objects.create(**request.data)
    return Response({
      "contact": ContactSerializer(contact, context=self.get_serializer_context(), partial=True).data
    }, status=status.HTTP_201_CREATED)

  def put(self, request, id, *args, **kwargs):
    contact = Contact.objects.get(pk=id)
    data = request.data
    contact.first_name=data["first_name"]
    contact.last_name=data["last_name"]
    contact.email=data["email"]
    contact.phone_number_1=data["phone_number_1"]
    contact.phone_number_2=data["phone_number_2"]
    contact.save()
    return Response({"contact": ContactSerializer(contact, context=self.get_serializer_context(), partial=True).data})
  
  def delete(self, request, *args, **kwargs):
    contacts = json.loads(request.body.decode("utf-8"))["contacts"]
    Contact.objects.filter(pk__in=[contact["id"] for contact in contacts]).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Invoices API
class InvoicesAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  # serializer_class = ClientSerializer

  def get(self, request, id, *args, **kwargs):
    # invoices = Invoice.objects.filter(billed_to=id)
    # invoices = Invoice.objects.filter(client_id=id)
    invoices = Invoice.objects.filter(business_id=id)
    serializer = InvoiceSerializer(invoices, context=self.get_serializer_context(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    # invoice = Invoice.objects.create(**request.data)
    data = request.data
    print("\n\n")
    pprint(data, indent=2)
    # invoice = Invoice.objects.create(
    #   issued_date=data["issued_date"],
    #   due_date=data["due_date"],
    #   reference=data["reference"],
    #   number=data["number"],
    #   amount=data["amount"],
    #   notes=data["notes"],
    #   terms=data["terms"],
    #   online_payments=True if data.get("online_payments") == "true" else False,
    #   recurring=True if data.get("recurring") == "true" else False,
    #   # theme_logo=data["theme_logo"],
    #   theme_color=data["theme_color"],
    #   theme_font=data["theme_font"],
    #   language=data["language"],
    #   currency=data["currency"],
    #   client_id=data["client_id"],
    #   business_id=data["business_id"]
    # )
    serializer = InvoiceSerializer(data=data, partial=True)
    # print("\n\n")
    # pprint(serializer, indent=2)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    # return Response({
    #   "invoice": InvoiceSerializer(invoice, context=self.get_serializer_context(), partial=True).data
    # }, status=status.HTTP_201_CREATED)

  def put(self, request, id, *args, **kwargs):
    invoice = Invoice.objects.get(pk=id)
    
    # if invoice.theme_logo and len(invoice.theme_logo) > 0:
    #   absolute_path = str(invoice.theme_logo.path)
    #   dir = Path(absolute_path).parent

    #   for file in os.listdir(dir):
    #     os.remove(os.path.join(dir, file))
    
    data = request.data
    print("\n\n")
    pprint(data, indent=2)
    # invoice.amount = data["amount"]
    # invoice.business_id = data["business_id"]
    # invoice.client_id = data["client_id"]

    # # if "deposit" in data:
    # #   notification.recurring_invoice_sent = data["recurring_invoice_sent"]

    # # invoice.deposit = data["deposit"]
    # # invoice.discount = data["discount"]
    # # invoice.deposit = "" if data.get("deposit") is None else data["deposit"]
    # # invoice.discount = "" if data.get("discount") is None else data["discount"]

    # if "deposit" in data:
    #   invoice.deposit = data["deposit"]
    # if "discount" in data:
    #   invoice.discount = data["discount"]

    # invoice.due_date = data["due_date"]
    # invoice.issued_date = data["issued_date"]
    # invoice.notes = data["notes"]
    # invoice.number = data["number"]
    # invoice.online_payments = True if data.get("online_payments") == "true" else False
    # invoice.recurring = True if data.get("recurring") == "true" else False
    # invoice.reference = data["reference"]
    # invoice.status = data["status"]
    # invoice.terms = data["terms"]
    # invoice.theme_color = data["theme_color"]
    # invoice.theme_font = data["theme_font"]
    # invoice.theme_logo = "" if data.get("theme_logo") is None else data["theme_logo"]
    # invoice.save()

    
    serializer = InvoiceSerializer(instance=invoice, data=data, partial=True)
    # print("\n\n")
    # pprint(serializer, indent=2)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)
    # return Response({"invoice": InvoiceSerializer(invoice, context=self.get_serializer_context(), partial=True).data})
  
  def delete(self, request, *args, **kwargs):
    invoices = json.loads(request.body.decode("utf-8"))["invoices"]
    Invoice.objects.filter(pk__in=[invoice["id"] for invoice in invoices]).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Invoice Line Items API
# class InvoiceLineItemsAPI(generics.GenericAPIView):
#   permission_classes = (permissions.IsAuthenticated,)

#   def get(self, request, id, *args, **kwargs):
#     invoice_line_items = InvoiceLineItem.objects.filter(invoice_id=id)
#     serializer = InvoiceLineItemSerializer(invoice_line_items, context=self.get_serializer_context(), many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

#   # def post(self, request, *args, **kwargs):
#   #   serializer = InvoiceLineItemSerializer(data=request.data, context=self.get_serializer_context(), partial=True, many=True)
#   #   serializer.is_valid(raise_exception=True)
#   #   serializer.save()
#   #   return Response(status=status.HTTP_201_CREATED)
    
#     # data = request.data
#     # invoice_line_item = InvoiceLineItem.objects.create(
#     #   name=data["name"],
#     #   description=data["description"],
#     #   rate=data["rate"],
#     #   quantity=data["quantity"],
#     #   invoice_id=data["invoice_id"]
#     # )
#     # invoice_line_item.sales_taxes.set([tax["id"] for tax in data["sales_taxes"]])
#     # return Response({
#     #   "invoice_line_item": InvoiceLineItemSerializer(invoice_line_item, context=self.get_serializer_context(), partial=True).data
#     # }, status=status.HTTP_201_CREATED)

#   def put(self, request, id, *args, **kwargs):
#     print("\n\n")
#     pprint(request.data, indent=2)
#     InvoiceLineItem.objects.filter(invoice_id=id).update(**request.data)
    
#     return Response(status=status.HTTP_200_OK)

    # invoice_line_item = InvoiceLineItem.objects.get(pk=id)
    # data = request.data
    # invoice_line_item.name=data["name"]
    # invoice_line_item.description=data["description"]
    # invoice_line_item.rate=data["rate"]
    # invoice_line_item.quantity = data["quantity"]
    # invoice_line_item.sales_taxes.set([tax["id"] for tax in data["sales_taxes"]])
    # invoice_line_item.save()
    # return Response({"invoice_line_item": InvoiceLineItemSerializer(invoice_line_item, context=self.get_serializer_context(), partial=True).data})
  
  # def delete(self, request, *args, **kwargs):
  #   invoice_line_items = json.loads(request.body.decode("utf-8"))["invoice_line_items"]
  #   InvoiceLineItem.objects.filter(pk__in=[invoice_line_item["id"] for invoice_line_item in invoice_line_items]).delete()
  #   return Response(status=status.HTTP_204_NO_CONTENT)

# Vendors API
class VendorsAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)
  serializer_class = VendorSerializer

  def get(self, request, id, *args, **kwargs):
    vendors = Vendor.objects.filter(business_id=id)
    serializer = VendorSerializer(vendors, context=self.get_serializer_context(), many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request, *args, **kwargs):
    vendor = Vendor.objects.create(**request.data)
    return Response({
      "vendor": VendorSerializer(vendor, context=self.get_serializer_context(), partial=True).data
    }, status=status.HTTP_201_CREATED)

  def put(self, request, id, *args, **kwargs):
    vendor = Vendor.objects.get(pk=id)
    data = request.data
    vendor.company_name=data["company_name"]
    vendor.first_name=data["first_name"]
    vendor.last_name=data["last_name"]
    vendor.account_number=data["account_number"]
    vendor.email=data["email"]
    vendor.website=data["website"]
    vendor.phone_number=data["phone_number"]
    vendor.country=data["country"]
    vendor.address_1=data["address_1"]
    vendor.address_2=data["address_2"]
    vendor.city=data["city"]
    vendor.state=data["state"]
    vendor.postal_code=data["postal_code"]
    vendor.language=data["language"]
    vendor.currency=data["currency"]
    vendor.save()
    return Response({"vendor": VendorSerializer(vendor, context=self.get_serializer_context(), partial=True).data})
  
  def delete(self, request, *args, **kwargs):
    vendors = json.loads(request.body.decode("utf-8"))["vendors"]
    Vendor.objects.filter(pk__in=[vendor["id"] for vendor in vendors]).delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Profile Survey API
class ProfileSurveyAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def put(self, request, id, *args, **kwargs):
    user = User.objects.get(pk=id)
    data = request.data
    user.country = data["country"]
    user.first_name = data["first_name"]
    user.last_name = data["last_name"]
    user.phone_number = data["phone_number"]
    user.save()
    return Response({"user": UserSerializer(user, context=self.get_serializer_context(), partial=True).data})
    # return Response(user, status=status.HTTP_200_OK)
    # serializer = UserSerializer(instance=user, data=request.data, partial=True)
    # serializer.is_valid()
    # # serializer.is_valid(raise_exception=True)
    # # data.errors
    # # print("\n\nerrors = ", data.errors)
    # serializer.save()
    # return Response(serializer.data, status=status.HTTP_200_OK)
    

# Business Survey API
class BusinessSurveyAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def post(self, request, *args, **kwargs):
    # request.data["owner"]=request.data["owner_id"]

    data = request.data

    if "customer_billing_tool" in data and "customer_offer_customized_type" in data and "time_completed_service" in data:
      business = Business.objects.create(
        base_currency=data["base_currency"],
        country=data["country"],
        customer_billing_tool=data["customer_billing_tool"],
        customer_offer_customized_type=data["customer_offer_customized_type"],
        describe=data["describe"],
        estimated_revenue=data["estimated_revenue"],
        industry=data["industry"],
        name=data["name"],
        owner_id=data["owner_id"],
        time_completed_service=data["time_completed_service"],
        time_zone=data["time_zone"]
      )
    else:
      temp_business = Business.objects.get(pk=data["logged_out_id"])
      temp_business.logged_in = False
      temp_business.save()
      
      business = Business.objects.create(
        name=data["name"],
        country=data["country"],
        industry=data["industry"],
        owner_id=data["owner_id"],
        time_zone=data["time_zone"]
      )
    return Response({"business": BusinessSerializer(business).data}, status=status.HTTP_201_CREATED)

    # serializer = BusinessSerializer(data=request.data, partial=True)
    # print("\n\nserializer is = ", serializer, "\n")
    # serializer.is_valid(raise_exception=True)
    # serializer.save()
    # serializer.data["owner_id"] = serializer.data["owner"]
    # return Response(serializer.data, status=status.HTTP_201_CREATED)
  
  def put(self, request, id, *args, **kwargs):
    business = Business.objects.get(pk=id)
    data = request.data
    business.base_currency=data["base_currency"]
    business.country=data["country"]
    business.customer_billing_tool=data["customer_billing_tool"]
    business.customer_offer_customized_type=data["customer_offer_customized_type"]
    business.describe=data["describe"]
    business.estimated_revenue=data["estimated_revenue"]
    business.industry=data["industry"]
    business.name=data["name"]
    business.time_completed_service=data["time_completed_service"]
    business.time_zone=data["time_zone"]
    business.save()
    return Response({"business": BusinessSerializer(business, context=self.get_serializer_context(), partial=True).data})

    # request.data["owner"]=request.data["owner_id"]
    # serializer = BusinessSerializer(instance=business, data=request.data, partial=True)
    # serializer.is_valid(raise_exception=True)
    # serializer.save()
    # return Response(serializer.data, status=status.HTTP_200_OK)

  def get(self, request, user_id, *args, **kwargs):
    # print("\n\n")
    # pprint(self, indent=2)
    # print("\n\n")
    # pprint(request.data, indent=2)
    # business = Business.objects.filter(owner_id=request.data["user_id"]).values()
    business = Business.objects.filter(owner_id=user_id).values()
    return Response(business, status=status.HTTP_200_OK)

# @receiver(reset_password_token_created)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
#   """
#   Handles password reset tokens
#   When a token is created, an e-mail needs to be sent to the user
#   :param sender: View Class that sent the signal
#   :param instance: View Instance that sent the signal
#   :param reset_password_token: Token Model Object
#   :param args:
#   :param kwargs:
#   :return:
#   """
#   # print("\n\nsender in password_reset_token_created is = ", sender)
#   # print("\n\ninstance in password_reset_token_created is = ", instance)
#   print("\n\nreset_password_token in password_reset_token_created is = ", reset_password_token)
#   # send an e-mail to the user
#   # context = {
#   #   'current_user': reset_password_token.user,
#   #   'username': reset_password_token.user.username,
#   #   'email': reset_password_token.user.email,
#   #   'reset_password_url': "{}?token={}".format(
#   #     instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
#   #     reset_password_token.key)
#   # }
#   context = {
#     "fullname": f"{reset_password_token.user.first_name} {reset_password_token.user.last_name}",
#     "email": reset_password_token.user.email,
#     "reset_password_url": "{}?token={}".format(
#       instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
#       reset_password_token.key)
#     # "reset_password_url": f"{instance.request.get_host}/authentication/password-reset/{reset_password_token.key}"
#   }

#   print("\n\n")
#   pprint(context, indent=2)
  
#   try:
#     # render email text
#     # email_html_message = render_to_string('email/user_reset_password.html', context)
#     # email_plaintext_message = render_to_string('email/user_reset_password.txt', context)
#     template = loader.get_template("forgot_password.txt")
#     email_plaintext_message = template.render(context)

#     # msg = EmailMultiAlternatives(
#     #     # title:
#     #     "Password Reset for {title}".format(title="Some website title"),
#     #     # message:
#     #     email_plaintext_message,
#     #     # from:
#     #     "noreply@somehost.local",
#     #     # to:
#     #     [reset_password_token.user.email]
#     # )
#     message = EmailMultiAlternatives(
#       "Trouble logging in? Reset your password", email_plaintext_message,
#       "InvoiceBooks",
#       ["edwin.lo.el1@gmail.com", reset_password_token.user.email]
#     )
#     message.content_subtype = "html"
#     # msg.attach_alternative(email_html_message, "text/html")
#     message.send()
#     return Response({"message": f"reset instructions have been sent to {reset_password_token.user.email}"}, status=status.HTTP_200_OK)
#   except Exception:
#     return Response({"message": f"sending reset instructions to {reset_password_token.user.email} failed"}, status=status.HTTP_424_FAILED_DEPENDENCY)

# from django.contrib.sites.shortcuts import get_current_site
# def my_sites(request):
#   current_site = get_current_site(request)
#   print("current_site  is = ", current_site  )


# from django.contrib.sites.models import Site
# from django.contrib.sites.shortcuts import get_current_site
# Forgot Password API
class ForgotPasswordAPI(generics.GenericAPIView):
  # serializer_class = PasswordResetSerializer
  serializer_class = ForgotPasswordSerializer

  def post(self, request, *args, **kwargs):
    # serializer = self.get_serializer(email=request.data['email'])
    # serializer = self.get_serializer(data=request.data)
    # serializer.is_valid(raise_exception=True)
    # user = serializer.validated_data

    # print("\n\nuser found = ", user)
    
    email_to = request.data["email"]

    try:
      user = User.objects.get(email=email_to)
    except User.DoesNotExist:
      return Response({"message": "email address is not registered"}, status=status.HTTP_404_NOT_FOUND)

    print("\n\nuser found = ", user)

    print("\n\n")
    pprint(request.data, indent=2)

    # print("\n\nthe token is = ", request.data["token"])
    print("\n\nthe token is = ", "token" in request.data)
    if "token" not in request.data:
      # token = AuthToken.objects.create(user)[1]
      token = ""
    else:
      token = request.data["token"]
      # user = authenticate(email=request.data["email"], password=user.password)

    # user = authenticate(email=data['email'], password=data['password'])

    # print("get_current_site = ", get_current_site(request).id)

    # current_site = Site.objects.get_current()
    # print("current_site.domain is = ", current_site.domain)

    try:
      subject = "Trouble logging in? Reset your password"
      # token = str(uuid.uuid4())
      
      context = {
        "full_name": f"{user.first_name} {user.last_name}",
        # "email": email_to,
        "reset_password_url": f"http://localhost:3000/authentication/password-reset?token={token}",
        "settings": settings
      }

      # render email text
      email_html_message = render_to_string("forgot_password.html", context)
      email_plaintext_message = render_to_string("forgot_password.txt", context)
      email_from = settings.EMAIL_HOST_USER

      # print("\n\ntoken = ", token)
      # print("\n\n")
      # pprint(context, indent=2)
      # print("\n\nmessage = ", message)
      # print("\n\nemail_from = ", email_from)

      recipient_list = [email_to]

      # email = EmailMultiAlternatives(
      #   "Trouble logging in? Reset your password", message,
      #   "InvoiceBooks",
      #   ["edwin.lo.el1@gmail.com", email_to]
      # )

      # Convert the html and css inside the [forgot_password.txt] to HTML template
      # email.content_subtype = "html"

      # email.send()

      # send_mail(subject, message, email_from, recipient_list, fail_silently=False)

      
      send_mail(subject, email_plaintext_message, email_from, recipient_list, fail_silently=False, html_message=email_html_message)

      return Response({"message": f"reset instructions have been sent to {email_to}"}, status=status.HTTP_200_OK)

      # return render(request, "forgot_password.html", context)
    except Exception:
      return Response({"message": f"sending reset instructions to {email_to} failed"}, status=status.HTTP_424_FAILED_DEPENDENCY)

    # serializer = UserSerializer(instance=user, data=request.data, partial=True)
    # serializer.is_valid(raise_exception=True)
    # user = serializer.validated_data


    # return Response({"message": f"found a user with username = {user.username} and email = {user.email}"}, status=status.HTTP_200_OK)
    # return Response({"message": f"found a user with email = {user.email}"}, status=status.HTTP_200_OK)

# Reset Password API
# class ResetPasswordAPI(generics.GenericAPIView):
#   permission_classes = (permissions.IsAuthenticated,)
#   serializer_class = ResetPasswordSerializer

#   def post(self, request, *args, **kwargs):
#     # serializer = ResetPasswordSerializer(data=request.data)
#     # email_to = request.data["email"]
#     print("\n\n")
#     pprint(request.data, indent=2)


# Send Password Reset Email API
class SendPasswordResetEmailAPI(generics.GenericAPIView):
  def post(self, request, *args, **kwargs):
    try:
      email_to = request.data['email']
      subject = "Trouble logging in? Reset your password"
      message = "\033[1m" + "Reset Your Password" + "\033[0m" + f"\nYour email is: {email_to}\nIf you have forgotten your password, you can securely reset it by clicking the link below.\nlink\n\nIf you did not send this password reset request, you can safely ignore this email."
      email_from = settings.EMAIL_HOST_USER
      send_mail(subject, message, email_from, [email_to], fail_silently=False)
      return Response({"message": f"an email has been sent to {email_to}"}, status=status.HTTP_200_OK)
    except Exception as ex:
      print("ex = ",ex)
      return Response({"message": f"send email to {email_to} failed"}, status=status.HTTP_424_FAILED_DEPENDENCY)
    
    # print("SendEmailResetPasswordAPI request is = ", request)
    # print("SendEmailResetPasswordAPI request data = ", request.data)

class SendFormEmailAPI(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny,)

  def allowed_methods(self, request, *args, **kwargs):
    """
    Return the list of allowed HTTP methods, uppercased.
    """
    self.http_method_names.append("post")
    return [method.upper() for method in self.http_method_names if hasattr(self, method)]

  def get(self, request, *args, **kwargs):

    # Get the form data
    # name = request.GET.get('name', None)
    email = request.GET.get('email', None)
    # message = request.GET.get('message', None)

    # Send Email
    send_mail(
        'Subject - Django Email Testing',
        # 'Hello ' + name + ',\n' + message,
        'Hello ' + 'Edwin',
        # 'sender@example.com', # Admin
        'edwin.lo.el1@gmail.com',
        [
            email,
        ]
    )

    # Redirect to same page after form submit
    messages.success(request, ('Email sent successfully.'))
    # return redirect('home')

class MultiSendFormEmailAPI(generics.GenericAPIView):
    
  def get(self, request, *args, **kwargs):
    first_message = ('Subject here', 'Here is the message', 'from@example.com', ['first@example.com', 'other@example.com'])
    second_message = ('Another Subject', 'Here is another message', 'from@example.com', ['second@test.com'])
    send_mass_mail((first_message, second_message), fail_silently=False)

# class ResetPasswordAPI(generics.GenericAPIView):
#   def post(self, request):
#     serializer = ResetPasswordSerializer(data=request.data)


# class ChangePasswordAPI(generics.UpdateAPIView):
#   """
#   An endpoint for changing password.
#   """
#   serializer_class = ChangePasswordSerializer
#   model = User
#   permission_classes = (IsAuthenticated,)

#   def get_object(self, queryset=None):
#       obj = self.request.user
#       return obj

#   def update(self, request, *args, **kwargs):
#       self.object = self.get_object()
#       serializer = self.get_serializer(data=request.data)

#       if serializer.is_valid():
#           # Check old password
#           if not self.object.check_password(serializer.data.get("old_password")):
#               return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
#           # set_password also hashes the password that the user will get
#           self.object.set_password(serializer.data.get("new_password"))
#           self.object.save()
#           response = {
#               'status': 'success',
#               'code': status.HTTP_200_OK,
#               'message': 'Password updated successfully',
#               'data': []
#           }

#           return Response(response)

#       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)