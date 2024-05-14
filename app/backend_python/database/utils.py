import importlib.util
import os
import sys
from sqlalchemy_utils import database_exists
from settings import *

sys.dont_write_bytecode = True
current_dir = os.path.abspath(os.path.dirname(__file__))


def get_credentials():
    return MYSQL_USER, MYSQL_PASSWORD, MYSQL_SERVER, MYSQL_PORT


def schema_traversing(database, schema):
    target_dir = os.path.join(current_dir, "models", database, schema)
    schemas = list()
    for root, dirs, files in os.walk(target_dir):
        path = root.split(os.sep)
        print((len(path) - 1) * "---", os.path.basename(root))
        for file in files:
            if file.endswith("py") and not file.startswith("__") and not file.endswith("pyc"):
                print(len(path) * "---", file)
                schema_name = file.split(".")[0]

                spec = importlib.util.spec_from_file_location(
                    f"models_{schema_name}", os.path.join(target_dir, file)
                )
                module = importlib.util.module_from_spec(spec)
                # sys.modules[spec.name] = module
                spec.loader.exec_module(module)
                my_class = getattr(module, schema_name.capitalize())
                schemas.append(my_class.metadata)
    return schemas


def validate_database(sa_url) -> bool:
    if not database_exists(sa_url):  # Checks for the first time
        # create_database(sa_url)  # Create new DB
        print(f"Database doesn't exist!")  # Verifies if database is there or not.
        return False
    else:
        print(f"Database already exists")
        return True
