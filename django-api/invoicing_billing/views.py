# from django.http import FileResponse

# def download(request, id):
#     file_obj = open('media/eeg_files/Ethics_assignment.odt', 'rb')
#     return FileResponse(file_obj)

# from rest_framework import viewsets, permissions  # added permissions

# from .serializers import TodoSerializer
# # from todos.models import Todo  # remove


# class TodoViewSet(viewsets.ModelViewSet):
#     # queryset = Todo.objects.all()  # remove
#     serializer_class = TodoSerializer
#     permission_classes = [permissions.IsAuthenticated]  # added

#     def get_queryset(self):  # added
#         return self.request.user.todos.all()

#     def perform_create(self, serializer):  # added
#         serializer.save(owner=self.request.user)

from django.shortcuts import redirect
from django.conf import settings

def base_url_view(request):
    return redirect(settings.SERVER_URL)
