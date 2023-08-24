from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from .api import (
  # BaseUrl,
  RegisterAPI,
  LoginAPI,
  LogoutAPI,
  UserAPI,
  # CleanUploadAPI,
  AccountAPI,
  BusinessAccountAPI,
  LogoThemeAccountAPI,
  EmailNotificationsAccountAPI,
  IsActiveAPI,
  UserExistsAPI,
  UserAccessAPI,
  # LoginUserDataAPI,
  GenerateTokenAPI,
  ProfileSurveyAPI,
  BusinessSurveyAPI,
  UsersBusinessAPI,
  UsersNotificationAPI,
  BusinessSalexTaxAPI,
  BusinessItemsAPI,
  # BusinessItemsSalesTaxAPI,
  BusinessServicesAPI,
  ClientsAPI,
  ContactsAPI,
  InvoicesAPI,
  # InvoiceLineItemsAPI,
  VendorsAPI,
  # BusinessServicesSalesTaxAPI,
  # PasswordResetAPI,
  # PasswordResetEmailAPI,
  ForgotPasswordAPI,
  # ResetPasswordAPI,
  # SendPasswordResetEmailAPI,
  # SendFormEmailAPI,
  # MultiSendFormEmailAPI,
)
# from knox import views as knox_views

urlpatterns = [
  # path('', BaseUrl),
  # path('api/auth', include('knox.urls')),
  path('api/auth/', include('djoser.urls')),
  path('api/auth/', include('djoser.urls.jwt')),
  path('api/auth/', include('djoser.social.urls')),

  path('api/auth/register', RegisterAPI.as_view()),
  path('api/auth/login', LoginAPI.as_view()),
  path('api/auth/logout', LogoutAPI.as_view()),
  path('api/auth/user', UserAPI.as_view()),
  path('api/auth/profile-survey/<int:id>', ProfileSurveyAPI.as_view()),
  path('api/auth/get-business-survey/<int:user_id>', BusinessSurveyAPI.as_view()),
  path('api/auth/create-business-survey', BusinessSurveyAPI.as_view()),
  path('api/auth/update-business-survey/<int:id>', BusinessSurveyAPI.as_view()),
  
  # path('api/auth/clean-upload/<int:id>', CleanUploadAPI.as_view()),
  path('api/auth/update-account/<int:id>', AccountAPI.as_view()),
  path('api/auth/update-business-account/<int:id>', BusinessAccountAPI.as_view()),
  path('api/auth/update-logo-theme-account/<int:id>', LogoThemeAccountAPI.as_view()),
  path('api/auth/update-email-notifications-account/<int:id>', EmailNotificationsAccountAPI.as_view()),

  path('api/auth/is-active', IsActiveAPI.as_view()),
  path('api/auth/user-exists', UserExistsAPI.as_view()),
  path('api/auth/user-access', UserAccessAPI.as_view()),
  path('api/auth/users-business/<int:id>', UsersBusinessAPI.as_view()),
  path('api/auth/users-notification', UsersNotificationAPI.as_view()),
  path('api/auth/users-notification/<int:id>', UsersNotificationAPI.as_view()),
  path('api/auth/business-items', BusinessItemsAPI.as_view()),
  path('api/auth/business-items/<int:id>', BusinessItemsAPI.as_view()),
  path('api/auth/business-services', BusinessServicesAPI.as_view()),
  path('api/auth/business-services/<int:id>', BusinessServicesAPI.as_view()),
  path('api/auth/clients', ClientsAPI.as_view()),
  path('api/auth/clients/<int:id>', ClientsAPI.as_view()),
  path('api/auth/contacts', ContactsAPI.as_view()),
  path('api/auth/contacts/<int:id>', ContactsAPI.as_view()),
  path('api/auth/invoices', InvoicesAPI.as_view()),
  path('api/auth/invoices/<int:id>', InvoicesAPI.as_view()),
  # path('api/auth/invoice-line-items', InvoiceLineItemsAPI.as_view()),
  # path('api/auth/invoice-line-items/<int:id>', InvoiceLineItemsAPI.as_view()),
  path('api/auth/vendors', VendorsAPI.as_view()),
  path('api/auth/vendors/<int:id>', VendorsAPI.as_view()),

  # path('api/auth/business-items-sales-tax/<int:id>', BusinessItemsSalesTaxAPI.as_view()),
  # path('api/auth/business-services-sales-tax/<int:id>', BusinessServicesSalesTaxAPI.as_view()),

  path('api/auth/business-sales-tax', BusinessSalexTaxAPI.as_view()),
  path('api/auth/business-sales-tax/<int:id>', BusinessSalexTaxAPI.as_view()),
  # path('api/auth/login-user-data', LoginUserDataAPI.as_view()),
  path('api/auth/generate-token', GenerateTokenAPI.as_view()),

  # re_path(r'^api/auth/password-reset/', include('django_rest_passwordreset.urls', namespace='password-reset')),
  # path('api/auth/password-reset/<int:token>', PasswordResetAPI.as_view()),
  # path('api/auth/password-reset-email', PasswordResetEmailAPI.as_view()),
  path('api/auth/forgot-password', ForgotPasswordAPI.as_view()),
  # path('api/auth/reset-password', ResetPasswordAPI.as_view()),

  

  # path('api/auth/email-reset-password', PasswordResetAPI.as_view()),
  # path('api/auth/email-reset-password', EmailResetPasswordAPI.as_view()),
  # path('api/auth/email-reset-password-sent', SendEmailResetPasswordAPI.as_view()),

  
  # path('api/auth/send-form-email', SendFormEmailAPI.as_view()),
  # path('api/auth/multi-send-form-email', MultiSendFormEmailAPI.as_view()),

  # re_path(r'^api/auth/password-reset', include('django_rest_passwordreset.urls', namespace='password-reset')),


  # path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]

# if settings.DEBUG:
#     urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# print ('urls.py MEDIA_URL: %s' % (settings.MEDIA_URL))
# print ('urls.py MEDIA_ROOT: %s' % (settings.MEDIA_ROOT))