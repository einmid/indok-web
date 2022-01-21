# Generated by Django 3.2.10 on 2022-01-20 15:54

import apps.ecommerce.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("organizations", "0033_merge_0031_auto_20210909_1813_0032_auto_20210824_1457"),
        ("contenttypes", "0002_remove_content_type_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="VippsAccessToken",
            fields=[
                ("token", models.CharField(max_length=2048, primary_key=True, serialize=False)),
                ("expires_on", models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("price", models.DecimalField(decimal_places=2, max_digits=11)),
                ("description", models.TextField()),
                ("total_quantity", models.PositiveIntegerField()),
                ("current_quantity", models.PositiveIntegerField(null=True)),
                ("max_buyable_quantity", models.PositiveIntegerField(default=1)),
                ("object_id", models.PositiveIntegerField(null=True)),
                (
                    "content_type",
                    models.ForeignKey(
                        null=True, on_delete=django.db.models.deletion.CASCADE, to="contenttypes.contenttype"
                    ),
                ),
                (
                    "organization",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="products",
                        to="organizations.organization",
                    ),
                ),
            ],
            options={
                "unique_together": {("content_type", "object_id")},
            },
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                ("id", models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ("quantity", models.PositiveIntegerField(default=1)),
                ("total_price", models.DecimalField(decimal_places=2, max_digits=11)),
                (
                    "payment_status",
                    models.CharField(
                        choices=[
                            ("INITIATED", "initiated"),
                            ("RESERVED", "reserved"),
                            ("CAPTURED", "captured"),
                            ("CANCELLED", "cancelled"),
                            ("REFUNDED", "refunded"),
                            ("FAILED", "failed"),
                            ("REJECTED", "rejected"),
                        ],
                        default="INITIATED",
                        max_length=255,
                    ),
                ),
                ("timestamp", models.DateTimeField(auto_now_add=True)),
                ("auth_token", models.CharField(default=apps.ecommerce.models.get_auth_token, max_length=32)),
                ("payment_attempt", models.PositiveIntegerField(default=1)),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="orders", to="ecommerce.product"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="orders", to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
        ),
    ]