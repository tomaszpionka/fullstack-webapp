import importlib.util
import os
import sys
from dotenv import load_dotenv
from sqlalchemy_utils import database_exists, create_database

sys.dont_write_bytecode = True
current_dir = os.path.abspath(os.path.dirname(__file__))


def get_credentials(database):
    target_dir = os.path.join(current_dir, "models", database)
    dotenv_path = os.path.join(target_dir, ".env")
    load_dotenv(dotenv_path)

    MYSQL_USER = os.environ.get("MYSQL_USER")
    MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
    MYSQL_SERVER = os.environ.get("MYSQL_SERVER")
    MYSQL_PORT = os.environ.get("MYSQL_PORT")

    return MYSQL_USER, MYSQL_PASSWORD, MYSQL_SERVER, MYSQL_PORT


def schema_traversing(database, schema):
    target_dir = os.path.join(current_dir, "models", database, schema)
    schemas = list()
    for root, dirs, files in os.walk(target_dir):
        path = root.split(os.sep)
        print((len(path) - 1) * "---", os.path.basename(root))
        for file in files:
            if not file.startswith("__"):
                print(len(path) * "---", file)
                schema_name = file.split(".")[0]

                spec = importlib.util.spec_from_file_location(
                    f"migration_{schema_name}", os.path.join(target_dir, file)
                )
                module = importlib.util.module_from_spec(spec)
                # sys.modules[spec.name] = module
                spec.loader.exec_module(module)
                my_class = getattr(module, schema_name.capitalize())
                schemas.append(my_class.metadata)
    return schemas


def validate_database(engine):
    if not database_exists(engine.url):  # Checks for the first time
        create_database(engine.url)  # Create new DB
        print(f"Database created: ")  # Verifies if database is there or not.
    else:
        print(f"Database already exists: ")
