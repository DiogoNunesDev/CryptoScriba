from django.db import models
import uuid

class Wallet(models.Model):
    identifier = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return str(self.identifier)

