# Generated by Django 4.2 on 2023-11-14 11:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dish',
            old_name='category_id',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='media',
            old_name='dish_id',
            new_name='dish',
        ),
    ]