# Generated by Django 4.2.13 on 2024-05-31 10:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ActivityLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(choices=[('USER_REGISTRATION', 'User Registration'), ('USER_LOGIN', 'User Login'), ('USER_LOGOUT', 'User Logout'), ('PASSWORD_CHANGE', 'Password Change'), ('TRANSACTION_CREATION', 'Transaction Creation'), ('WALLET_CREATION', 'Wallet Creation'), ('WALLET_UPDATE', 'Wallet Update'), ('WALLET_DELETION', 'Wallet Deletion'), ('COIN_ADDITION', 'Coin Addition'), ('COIN_UPDATE', 'Coin Update'), ('COIN_DELETION', 'Coin Deletion'), ('ADMIN_LOGIN', 'Admin Login'), ('ADMIN_LOGOUT', 'Admin Logout'), ('USER_ACCOUNT_DELETION', 'User Account Deletion'), ('FAILED_LOGIN_ATTEMPT', 'Failed Login Attempt'), ('DATABASE_BACKUP', 'Database Backup')], max_length=50)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('details', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
