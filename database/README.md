# Database migrations

## Database setup

1. Login to your VPS.
2. Ensure you have the [.env](/database/.env) file with credentials.
3. Go to [docker-compose.yml](/database/docker-compose.yml) file directory.
4. Run command to create the container with mysql:
```
docker compose up -d
```
5. Go to your local machine [app.py](/database/app.py) directory and to verify database existence run:
```
python app.py
```
6. When you finished development of [schemas](/database/schemas), run command:
```
python -m alembic revision --autogenerate -m "modified x table"
```
7. Check the new revision script in [versions](/database/mysql-migration/versions) and if the commands are correct run:
```
python -m alembic upgrade head
```