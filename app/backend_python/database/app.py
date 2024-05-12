from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .settings import *

SQLALCHEMY_DB_URL = f"mysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_SERVER}:{MYSQL_PORT}/{MYSQL_DATABASE}"

engine = create_engine(SQLALCHEMY_DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def validate_database():
    if not database_exists(engine.url):  # Checks for the first time
        create_database(engine.url)  # Create new DB
        print(
            f"Database created: {MYSQL_DATABASE}"
        )  # Verifies if database is there or not.
    else:
        print(f"Database already exists: {MYSQL_DATABASE}")


if __name__ == "__main__":
    validate_database()
