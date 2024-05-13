# Database migrations

## Database setup

1. Login to your VPS.
2. Ensure you have the [.env](/app/backend_python/database/.env) file with credentials.
3. Go to [docker-compose.yml](/app/backend_python/database/docker-compose.yml) file directory.
4. Run command to create the container with mysql:
```
docker compose up -d
```
5. Go to your local machine [database](/app/backend_python/database/) directory and create virtual environment:
```
python -m pip install virtualenv
```
```
python -m venv env
```
6. Open Windows CMD in [database](/app/backend_python/database/) directory and run:
```
env\Scripts\activate
```
```
pip install --upgrade pip
```
```
pip install -r requirements.txt 
```
6. To verify database existence run:
```
python app.py
```
6. When you finished development of [schemas](/database/schemas), run command:
```
alembic revision --autogenerate -m "modified x table"
```
7. Check the new revision script in [versions](/database/mysql-migration/versions) and if the commands are correct run:
```
alembic upgrade head
```
8. After the work is done, deactivate the virtual environment by running:
```
deactivate
```