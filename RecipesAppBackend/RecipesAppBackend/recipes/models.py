from django.db import models


class Categories(models.Model):
    category = models.TextField(unique=True)


class Dish(models.Model):
    name = models.TextField()
    description = models.TextField()
    ingredients = models.TextField()
    сooking_by_steps = models.TextField()

    category = models.ForeignKey(
        to=Categories,
        on_delete=models.CASCADE
    )

class Media(models.Model):
    blob = models.BinaryField(null=True, blank=True, editable=True)
    mime_type = models.TextField()

    dish = models.ForeignKey(
        to=Dish,
        on_delete=models.CASCADE
    )