from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context
import sys

sys.dont_write_bytecode = True
# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from utils import schema_traversing, get_credentials, validate_database
from app import Base

database = getattr(config.cmd_opts, "name")
schema = context.get_x_argument(as_dictionary=True).get("schema")

schema_traversing(database, schema)
target_metadata = Base.metadata

MYSQL_USER, MYSQL_PASSWORD, MYSQL_SERVER, MYSQL_PORT = get_credentials()

section = config.get_section(config.config_ini_section)
url = section["sqlalchemy.url"].format(
    MYSQL_USER, MYSQL_PASSWORD, MYSQL_SERVER, MYSQL_PORT, schema
)

engine = create_engine(url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """

    section["sqlalchemy.url"] = url
    connectable = engine_from_config(
        section,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    if not validate_database(url):
        quit()

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
