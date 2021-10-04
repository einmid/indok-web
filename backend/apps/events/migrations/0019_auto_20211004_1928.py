# Generated by Django 3.2.5 on 2021-10-04 17:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0008_alter_product_id'),
        ('events', '0018_auto_20210909_1813'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='signup',
            name='id',
        ),
        migrations.AddField(
            model_name='event',
            name='product',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='ecommerce.product'),
        ),
        migrations.AddField(
            model_name='signup',
            name='order',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='ecommerce.order'),
            preserve_default=False,
        ),
    ]