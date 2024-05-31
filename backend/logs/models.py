from django.db import models
from django.utils import timezone
from users.models import CustomUser

class ActivityLog(models.Model):
    ACTION_CHOICES = [
        ('USER_REGISTRATION', 'User Registration'),
        ('USER_LOGIN', 'User Login'),
        ('USER_LOGOUT', 'User Logout'),
        ('PASSWORD_CHANGE', 'Password Change'),
        ('TRANSACTION_CREATION', 'Transaction Creation'),
        ('WALLET_CREATION', 'Wallet Creation'),
        ('WALLET_UPDATE', 'Wallet Update'),
        ('WALLET_DELETION', 'Wallet Deletion'),
        ('COIN_ADDITION', 'Coin Addition'),
        ('COIN_UPDATE', 'Coin Update'),
        ('COIN_DELETION', 'Coin Deletion'),
        ('ADMIN_LOGIN', 'Admin Login'),
        ('ADMIN_LOGOUT', 'Admin Logout'),
        ('USER_ACCOUNT_DELETION', 'User Account Deletion'),
        ('FAILED_LOGIN_ATTEMPT', 'Failed Login Attempt'),
        ('DATABASE_BACKUP', 'Database Backup'),
    ]

    user = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.SET_NULL)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    timestamp = models.DateTimeField(default=timezone.now)
    details = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'{self.timestamp} - {self.action}'
