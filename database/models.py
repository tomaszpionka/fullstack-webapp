import importlib
import os
import importlib.util
import sys

sys.dont_write_bytecode = True

current_dir = os.path.abspath(os.path.dirname(__file__))
target_dir = os.path.join(current_dir, "schemas", "app_db")


def schema_traversing():
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
