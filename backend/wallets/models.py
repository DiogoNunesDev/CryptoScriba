from django.db import models
import uuid

class Wallet(models.Model):
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    user = models.OneToOneField('users.CustomUser', on_delete=models.CASCADE, related_name='user')

    def __str__(self):
        return str(self.identifier)
