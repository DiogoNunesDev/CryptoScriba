# Generated by Django 4.2.13 on 2024-05-31 10:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('coins', '0001_initial'),
        ('wallets', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_type', models.CharField(choices=[('DEPOSIT', 'Deposit'), ('BUY', 'Buy'), ('SELL', 'Sell'), ('INTERNAL', 'Internal')], max_length=20)),
                ('amount', models.DecimalField(decimal_places=10, max_digits=20)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('coin', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='coins.coin')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('wallet_from', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wallet_from', to='wallets.wallet')),
                ('wallet_to', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wallet_to', to='wallets.wallet')),
            ],
        ),
    ]
