from sqlalchemy import INTEGER, VARCHAR, FLOAT, Column
from ....app import Base


class Products(Base):
    __tablename__ = "products"
    id = Column(INTEGER, primary_key=True, index=True)
    name = Column(VARCHAR(length=255))
    description = Column(VARCHAR(length=255))
    amount = Column(FLOAT)
