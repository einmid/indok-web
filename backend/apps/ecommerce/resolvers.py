from typing import TYPE_CHECKING
from decorators import staff_member_required, login_required
from .models import Order, Product

if TYPE_CHECKING:
    from graphene import ResolveInfo


class EcommerceResolvers:
    @login_required
    def resolve_product(self, info: "ResolveInfo", product_id: int):
        try:
            return Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return None

    @staff_member_required
    def resolve_products(self, info):
        return Product.objects.all()

    @login_required
    def resolve_order(self, info: "ResolveInfo", order_id):
        try:
            order = Order.objects.get(pk=order_id, user=info.context.user)
        except Order.DoesNotExist:
            raise ValueError("Ugyldig ordre")

        return order

    @login_required
    def resolve_user_orders(self, info):
        return Order.objects.filter(user=info.context.user)

    @staff_member_required
    def resolve_orders_by_status(self, info: "ResolveInfo", product_id, status):
        orders = Order.objects.filter(product_id=product_id, payment_status=status)
        return {"length": len(orders), "orders": orders}
