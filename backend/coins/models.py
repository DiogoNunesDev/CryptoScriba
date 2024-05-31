from django.db import models

class Coin(models.Model):
    name = models.CharField(max_length=100)
    tag = models.CharField(max_length=10, unique=True)
    buy_value = models.DecimalField(max_digits=20, decimal_places=10)
    sell_value = models.DecimalField(max_digits=20, decimal_places=10)

    def __str__(self):
        return self.name