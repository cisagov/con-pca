#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.conf import settings

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    try:
        from django.core.management import execute_from_command_line
        # from django.conf import settings

        if settings.DEBUG:
           if os.environ.get('RUN_MAIN') or os.environ.get('WERKZEUG_RUN_MAIN'):
               import ptvsd
               ptvsd.enable_attach(address = ('0.0.0.0', 5678))
               print("NOT Attached remote debugger")
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
