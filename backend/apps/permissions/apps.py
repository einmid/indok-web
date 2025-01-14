from django.apps import AppConfig


class PermissionsConfig(AppConfig):
    name = "apps.permissions"

    def ready(self) -> None:
        import apps.permissions.signals  # noqa

        return super().ready()
