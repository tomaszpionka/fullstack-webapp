from sqlalchemy.types import Boolean, Integer, VARCHAR
from sqlalchemy.sql import expression
from sqlalchemy import Column
from app import Base


class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(VARCHAR(length=255), unique=True, index=True)
    first_name = Column(VARCHAR(length=255))
    last_name = Column(VARCHAR(length=255))
    password = Column(VARCHAR(length=255))
    is_active = Column(Boolean, nullable=False, server_default=expression.true())
