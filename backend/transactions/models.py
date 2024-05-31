from django.db import models
from users.models import CustomUser
from wallets.models import Wallet
from coins.models import Coin  # Assuming there's a Coin model in the coins app

TRANSACTION_TYPES = [
    ('DEPOSIT', 'Deposit'),
    ('BUY', 'Buy'),
    ('SELL', 'Sell'),
    ('INTERNAL', 'Internal'),
]

class Transaction(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=20, decimal_places=10)
    coin = models.ForeignKey(Coin, null=True, blank=True, on_delete=models.CASCADE)
    wallet_from = models.ForeignKey(Wallet, null=True, blank=True, related_name='wallet_from', on_delete=models.CASCADE)
    wallet_to = models.ForeignKey(Wallet, null=True, blank=True, related_name='wallet_to', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.transaction_type} - {self.amount}'

