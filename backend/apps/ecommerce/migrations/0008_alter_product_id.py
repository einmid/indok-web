# Generated by Django 3.2.5 on 2021-10-04 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0007_order_payment_attempt'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
