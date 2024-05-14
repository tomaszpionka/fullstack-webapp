from sqlalchemy.orm import Session

from database.models.mysql_docker_1.app_db.products import Products


def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Products).offset(skip).limit(limit).all()
