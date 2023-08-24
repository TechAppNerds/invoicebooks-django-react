from django.views.generic import View
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail, send_mass_mail

class SendFormEmail(View):

    def get(self, request):

        # Get the form data
        name = request.GET.get('name', None)
        email = request.GET.get('email', None)
        message = request.GET.get('message', None)

        # Send Email
        send_mail(
            'Subject - Django Email Testing',
            'Hello ' + name + ',\n' + message,
            'sender@example.com', # Admin
            [
                email,
            ]
        )

        # Redirect to same page after form submit
        messages.success(request, ('Email sent successfully.'))
        return redirect('home')

class MultiSendFormEmail(View):
    
    def get(self, request):
        first_message = ('Subject here', 'Here is the message', 'from@example.com', ['first@example.com', 'other@example.com'])
        second_message = ('Another Subject', 'Here is another message', 'from@example.com', ['second@test.com'])
        send_mass_mail((first_message, second_message), fail_silently=False)