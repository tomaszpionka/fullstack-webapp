from sqlalchemy.types import Integer, VARCHAR, Float 
from sqlalchemy import Column
from app import Base


class Products(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(VARCHAR(length=255))
    description = Column(VARCHAR(length=255))
    amount = Column(Float)
    owner_id = Column(Integer)
