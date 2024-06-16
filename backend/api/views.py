from rest_framework.response import Response
from rest_framework.views import APIView
import os
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.conf import settings
from cryptography.fernet import Fernet
from logs.utils import log_database_backup

class ApiRootView(APIView):
  def get(self, request):
    return Response({
      'coins': request.build_absolute_uri('coins/'),
      'users': request.build_absolute_uri('users/'),
      'wallets': request.build_absolute_uri('wallets/'),
      'transactions': request.build_absolute_uri('transactions/'),
      'logs': request.build_absolute_uri('logs/'),
    })
    
class DatabaseBackupView(APIView):
  permission_classes = [IsAuthenticated, IsAdminUser]

  def get(self, request, *args, **kwargs):
    # Generate a key and save it to a file
    key = Fernet.generate_key()
    with open(os.path.join(settings.BASE_DIR, 'backup_key.key'), 'wb') as key_file:
      key_file.write(key)

    fernet = Fernet(key)

    db_path = os.path.join(settings.BASE_DIR, 'db.sqlite3')

    with open(db_path, 'rb') as file:
      original_data = file.read()

    #Encrypting the data
    encrypted_data = fernet.encrypt(original_data)

    #Saving the encrypted data to a backup file
    backup_path = os.path.join(settings.BASE_DIR, 'db_backup.enc')
    with open(backup_path, 'wb') as backup_file:
      backup_file.write(encrypted_data)

    log_database_backup(request.user)
    return Response({"message": "Database backup created and encrypted successfully!"})