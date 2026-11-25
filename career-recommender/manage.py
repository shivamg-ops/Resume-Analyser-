#!/usr/bin/env python
import os
import sys
from pathlib import Path

# Forward execution to backend/manage.py
if __name__ == "__main__":
    current_dir = Path(__file__).resolve().parent
    backend_dir = current_dir / "backend"
    sys.path.insert(0, str(backend_dir))
    sys.path.insert(0, str(current_dir))
    os.chdir(backend_dir)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

