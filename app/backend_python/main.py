from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

import crud as crud
from database.app import SessionLocal

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/products/")
async def products_get(skip: int = 0, limit: int = 5, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products


@app.get("/")
async def root():
    return {"message": "Hello World"}
