from sqlalchemy import BOOLEAN, INTEGER, VARCHAR, Column
from app import Base


class Users(Base):
    __tablename__ = "users"
    id = Column(INTEGER, primary_key=True, index=True)
    username = Column(VARCHAR(length=255), unique=True, index=True)
    first_name = Column(VARCHAR(length=255))
    last_name = Column(VARCHAR(length=255))
    password = Column(VARCHAR(length=255))
    is_active = Column(BOOLEAN, default=True)
